"use client"

import { useState, useEffect } from "react"
import { Button } from "@/Components/ui/badge";
import { Sparkles, Star } from "lucide-react"

export function WelcomeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [sparkleAnimation, setSparkleAnimation] = useState(false)

  useEffect(() => {
    // Initial animation
    setIsVisible(true)

    // Repeating sparkle animation every 5 seconds
    const interval = setInterval(() => {
      setSparkleAnimation(true)
      setTimeout(() => setSparkleAnimation(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white shadow-xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div
          className={`absolute top-4 right-1/4 transition-all duration-500 ${sparkleAnimation ? "scale-125 rotate-180" : "scale-100 rotate-0"}`}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </div>
        <div
          className={`absolute bottom-6 left-1/3 transition-all duration-700 ${sparkleAnimation ? "scale-110 rotate-45" : "scale-100 rotate-0"}`}
        >
          <Star className="w-4 h-4 text-pink-300" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome, <span className="text-yellow-300 animate-pulse">Dhananjay</span>
            </h1>
          </div>
          <div className={`transition-all duration-1000 delay-500 ${sparkleAnimation ? "animate-spin" : ""}`}>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        <p
          className={`text-purple-100 text-lg mb-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Ready to find your next brand partnership?
        </p>

        <Button
          className={`bg-white text-purple-600 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "900ms" }}
        >
          Complete your profile
        </Button>
      </div>
    </div>
  )
}
