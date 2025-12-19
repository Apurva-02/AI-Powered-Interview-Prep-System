"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PreInterviewSetup,
  type InterviewSetupData,
} from "@/components/pre-interview-setup";

import {
  Maximize2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  AlertCircle,
} from "lucide-react";

export default function InterviewPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  const [mediaAvailable, setMediaAvailable] = useState(true);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [interviewData, setInterviewData] =
    useState<InterviewSetupData | null>(null);

  const questions = [
    "Tell me about yourself and your professional background.",
    "What are your key strengths and how do they apply to this role?",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "Where do you see yourself in 5 years?",
    "Why are you interested in this position and our company?",
  ];

  // ------------------------------------------------------------
  // 📸 Send frame → FastAPI → Next.js → MongoDB
  // ------------------------------------------------------------
  const sendFrameToPython = async () => {
    if (!videoRef.current || !sessionId) return;

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.8)
    );
    if (!blob) return;

    let pyRes: Response;
    try {
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      pyRes = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!pyRes.ok) {
        console.error("❌ Python API error:", pyRes.status);
        return;
      }
    } catch (err) {
      console.error("❌ Python server unreachable:", err);
      return;
    }

    const metrics = await pyRes.json();

    await fetch("/api/emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        batch: [
          {
            ts: Date.now() / 1000,
            label: metrics.label,
            confidence: metrics.confidence,
          },
        ],
      }),
    });

    console.log("📡 Emotion:", metrics.label, metrics.confidence);
  };

  // ------------------------------------------------------------
  // 🔁 Emotion capture loop (every 3s)
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isInterviewActive || !sessionId) return;

    intervalRef.current = setInterval(sendFrameToPython, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInterviewActive, sessionId]);

  // ------------------------------------------------------------
  // 🎥 Camera & Mic setup
  // ------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!mounted) return;

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setMediaAvailable(true);
        setMediaError(null);
        setIsMicOn(stream.getAudioTracks().some((t) => t.enabled));
      } catch (err: any) {
        console.error("🎥 Media error:", err);
        setMediaAvailable(false);
        setMediaError(
          err?.name === "NotAllowedError"
            ? "Camera/Microphone permission denied"
            : "Camera/Microphone not available"
        );
      }
    }

    if (isVideoOn) startMedia();

    return () => {
      mounted = false;
    };
  }, [isVideoOn]);

  useEffect(() => {
    const s = streamRef.current;
    if (!s) return;
    s.getAudioTracks().forEach((t) => (t.enabled = isMicOn));
  }, [isMicOn]);

  // ------------------------------------------------------------
  // 🎬 Start Interview
  // ------------------------------------------------------------
  const handleSetupComplete = async (data: InterviewSetupData) => {
    try {
      setInterviewData(data);

      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setup: data }),
      });

      if (!res.ok) throw new Error("Session creation failed");

      const json = await res.json();
      setSessionId(json.sessionId);
      setShowSetup(false);
      setIsInterviewActive(true);

      console.log("🎉 Session started:", json.sessionId);
    } catch (err) {
      console.error("❌ Interview start failed:", err);
      alert("Could not start interview session");
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setShowSetup(true);
    setCurrentQuestion(0);
    setInterviewData(null);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const s = streamRef.current;
    if (s) s.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion((q) => q + 1);
  };

  const MediaUnavailableNotice = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <div>
        <p className="font-semibold text-amber-900">Demo Mode</p>
        <p className="text-sm">
          {mediaError || "Camera/Mic unavailable"}
        </p>
      </div>
    </div>
  );

  // ------------------------------------------------------------
  // 🟦 Setup screen
  // ------------------------------------------------------------
  if (showSetup) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <PreInterviewSetup
            onComplete={handleSetupComplete}
            onCancel={() => window.history.back()}
          />
        </main>
        <Footer />
      </>
    );
  }

  // ------------------------------------------------------------
  // 🟪 Interview UI
  // ------------------------------------------------------------
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {!mediaAvailable && <MediaUnavailableNotice />}

          <Card>
            <div className="relative bg-black aspect-video rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black p-4">
                <p className="text-white text-lg font-semibold">
                  {questions[currentQuestion]}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={() => setIsMicOn((s) => !s)} variant="outline">
              {isMicOn ? <Mic /> : <MicOff />}
              {isMicOn ? "Mute" : "Unmute"}
            </Button>

            <Button onClick={() => setIsVideoOn((s) => !s)} variant="outline">
              {isVideoOn ? <Video /> : <VideoOff />}
              {isVideoOn ? "Stop Video" : "Start Video"}
            </Button>

            <Button variant="destructive" onClick={endInterview}>
              <Phone className="h-5 w-5 mr-2" />
              End Interview
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next Question
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}