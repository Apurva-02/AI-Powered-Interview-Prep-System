"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Award, Clock, Target } from "lucide-react"

export default function DashboardPage() {
  const performanceData = [
    { name: "Week 1", score: 65 },
    { name: "Week 2", score: 72 },
    { name: "Week 3", score: 78 },
    { name: "Week 4", score: 85 },
    { name: "Week 5", score: 88 },
    { name: "Week 6", score: 92 },
  ]

  const skillsData = [
    { name: "Communication", value: 85 },
    { name: "Technical", value: 78 },
    { name: "Problem Solving", value: 82 },
    { name: "Confidence", value: 88 },
  ]

  const emotionData = [
    { name: "Confident", value: 45 },
    { name: "Neutral", value: 35 },
    { name: "Anxious", value: 15 },
    { name: "Excited", value: 5 },
  ]

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"]

  const recentInterviews = [
    { id: 1, date: "2024-01-15", score: 92, duration: "15:30", status: "Completed" },
    { id: 2, date: "2024-01-14", score: 88, duration: "14:45", status: "Completed" },
    { id: 3, date: "2024-01-13", score: 85, duration: "16:20", status: "Completed" },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your interview preparation progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                  <p className="text-3xl font-bold group-hover:text-accent transition-colors duration-300">87</p>
                </div>
                <Award className="h-10 w-10 text-accent opacity-50 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Interviews</p>
                  <p className="text-3xl font-bold group-hover:text-accent transition-colors duration-300">12</p>
                </div>
                <Target className="h-10 w-10 text-accent opacity-50 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Time</p>
                  <p className="text-3xl font-bold group-hover:text-accent transition-colors duration-300">3h 45m</p>
                </div>
                <Clock className="h-10 w-10 text-accent opacity-50 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Improvement</p>
                  <p className="text-3xl font-bold group-hover:text-accent transition-colors duration-300">+27%</p>
                </div>
                <TrendingUp className="h-10 w-10 text-accent opacity-50 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Trend */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Skills Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Skills Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Emotion Analysis & Recent Interviews */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Emotion Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Emotion Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Interviews */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Interviews</h3>
                <div className="space-y-3">
                  {recentInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-medium">{interview.date}</p>
                        <p className="text-sm text-muted-foreground">{interview.duration}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">{interview.score}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
