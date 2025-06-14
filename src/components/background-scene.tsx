"use client"

import { useEffect, useState } from "react"

interface BackgroundSceneProps {
  currentTime: Date
}

export function BackgroundScene({ currentTime }: BackgroundSceneProps) {
  const [birds, setBirds] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([])

  const getTimeOfDay = (date: Date) => {
    const hour = date.getHours()
    if (hour >= 6 && hour < 12) return "morning"
    if (hour >= 12 && hour < 18) return "afternoon"
    if (hour >= 18 && hour < 22) return "evening"
    return "night"
  }

  const timeOfDay = getTimeOfDay(currentTime)

  // Animate birds
  useEffect(() => {
    const createBird = () => ({
      id: Math.random(),
      x: -50,
      y: Math.random() * 200 + 50,
      speed: Math.random() * 2 + 1,
    })

    const interval = setInterval(() => {
      setBirds((prev) => {
        // Remove birds that have flown off screen
        const activeBirds = prev.filter((bird) => bird.x < window.innerWidth + 50)

        // Add new bird occasionally
        if (Math.random() < 0.3 && activeBirds.length < 3) {
          activeBirds.push(createBird())
        }

        // Move all birds
        return activeBirds.map((bird) => ({
          ...bird,
          x: bird.x + bird.speed,
        }))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getSceneStyles = () => {
    switch (timeOfDay) {
      case "morning":
        return {
          sky: "from-blue-200 via-blue-100 to-yellow-100",
          ground: "from-green-200 to-green-300",
          light: "opacity-30",
        }
      case "afternoon":
        return {
          sky: "from-blue-300 via-blue-200 to-blue-100",
          ground: "from-green-300 to-green-400",
          light: "opacity-40",
        }
      case "evening":
        return {
          sky: "from-orange-200 via-pink-200 to-purple-200",
          ground: "from-green-400 to-green-500",
          light: "opacity-50",
        }
      case "night":
        return {
          sky: "from-indigo-900 via-purple-900 to-blue-900",
          ground: "from-green-800 to-green-900",
          light: "opacity-20",
        }
    }
  }

  const sceneStyles = getSceneStyles()

  return (
    <div className="relative w-full h-96 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-stone-200">
      {/* Marble Window Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl">
        {/* Window Opening */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-inner">
          {/* Sky */}
          <div className={`absolute inset-0 bg-gradient-to-b ${sceneStyles.sky}`}>
            {/* Sun/Moon */}
            <div
              className={`absolute top-8 right-8 w-12 h-12 rounded-full ${
                timeOfDay === "night"
                  ? "bg-yellow-100 shadow-lg shadow-yellow-200/50"
                  : "bg-yellow-300 shadow-lg shadow-yellow-400/50"
              } ${sceneStyles.light}`}
            />

            {/* Stars (night only) */}
            {timeOfDay === "night" && (
              <>
                <div className="absolute top-12 left-16 w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute top-20 left-32 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
                <div className="absolute top-16 right-24 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
                <div className="absolute top-24 right-16 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
              </>
            )}

            {/* Clouds */}
            <div className="absolute top-16 left-8 w-16 h-8 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute top-12 right-20 w-12 h-6 bg-white/20 rounded-full animate-pulse delay-500" />
          </div>

          {/* Ground */}
          <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${sceneStyles.ground}`}>
            {/* Grass texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute bottom-0 left-4 w-1 h-4 bg-green-600 rounded-full" />
              <div className="absolute bottom-0 left-8 w-1 h-3 bg-green-600 rounded-full" />
              <div className="absolute bottom-0 left-12 w-1 h-5 bg-green-600 rounded-full" />
              <div className="absolute bottom-0 right-8 w-1 h-4 bg-green-600 rounded-full" />
              <div className="absolute bottom-0 right-12 w-1 h-3 bg-green-600 rounded-full" />
            </div>
          </div>

          {/* Distant Mountains */}
          <div className="absolute bottom-16 left-0 right-0 h-16">
            <div className="absolute bottom-0 left-0 w-32 h-12 bg-green-400/40 rounded-t-full" />
            <div className="absolute bottom-0 right-0 w-24 h-8 bg-green-400/30 rounded-t-full" />
          </div>

          {/* Flying Birds */}
          {birds.map((bird) => (
            <div
              key={bird.id}
              className="absolute w-3 h-2 text-gray-600 transition-all duration-100 ease-linear"
              style={{
                left: `${bird.x}px`,
                top: `${bird.y}px`,
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L11.87 13.41C12.25 13.79 12.87 13.79 13.25 13.41L18.83 7.83L21.5 10.5L23 9H21Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Window Frame Details */}
        <div className="absolute inset-0 border-4 border-stone-300 rounded-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-stone-300 rounded-full transform -translate-y-1/2" />
        <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-stone-300 rounded-full transform -translate-x-1/2" />
      </div>
    </div>
  )
}
