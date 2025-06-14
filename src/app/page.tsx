"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { BackgroundScene } from "@/components/background-scene"
import { WriterSpace } from "@/components/writerspace"

export interface GrowthEntry {
  day: number
  action: string
  timeOfDay: string
  timestamp: Date
}

export interface GameState {
  currentDay: number
}

export default function BonsaiZenPage() {
  const [gameState, setGameState] = useState<GameState>({
    currentDay: 1,
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [journalOpen, setJournalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getTimeOfDay = (date: Date) => {
    const hour = date.getHours()
    if (hour >= 6 && hour < 12) return "morning"
    if (hour >= 12 && hour < 18) return "afternoon"
    if (hour >= 18 && hour < 22) return "evening"
    return "night"
  }

  const addGrowthEntry = (action: string) => {
    const timeOfDay = getTimeOfDay(currentTime)
    const newEntry: GrowthEntry = {
      day: gameState.currentDay,
      action,
      timeOfDay,
      timestamp: new Date(),
    }

    // You can store or use this entry if needed later
    console.log("New growth entry:", newEntry)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center overflow-hidden h-full fixed inset-0 pt-16">
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="relative w-full max-w-2xl">
              <BackgroundScene currentTime={currentTime} />
              {/* Add your bonsai plant here if needed */}
            </div>
          </div>

          {/* WriterSpace Sidebar */}
          <WriterSpace
            isOpen={journalOpen}
            onToggle={() => setJournalOpen(!journalOpen)}
          />
        </div>
      </main>

      {/* Footer */}
       <footer className="w-full text-center py-6 border-t border-gray-200 text-sm text-gray-500 bg-white z-50 relative">
      <p>&copy; {new Date().getFullYear()} Witter App. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="/about" className="hover:underline">About Us</a>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/contact" className="hover:underline">Contact Us</a>
        <a href="/terms" className="hover:underline">Terms & Conditions</a>
      </div>
    </footer>
    </div>
  )
}
