"use client";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const score = params.get("score") || "NA";

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Interview Completed 🎉</h1>
      <p className="mt-4 text-lg">Your Confidence Score:</p>

      <h2 className="text-5xl font-bold mt-2 text-blue-600">{score}/100</h2>

      <p className="mt-6 text-gray-600">
        Thank you for completing the interview! You will receive feedback shortly.
      </p>
    </div>
  );
}
