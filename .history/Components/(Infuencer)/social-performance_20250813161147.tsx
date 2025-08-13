"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, Users, Play } from "lucide-react"

const platforms = [
  {
    id: 1,
    name: "Instagram",
    followers: "800,000",
    views: "350,000",
    icon: "📸",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    growth: "++",
  },
  {
    id: 2,
    name: "YouTube",
    followers: "350,000",
    views: "20,000",
    icon: "📺",
    color: "bg-red-500",
    growth: "++",
  },
]

export function SocialPerformance() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Card
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Social Performance Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => (
          <div
            key={platform.id}
            className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {platform.icon}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{platform.name}</h3>
              </div>
              <span className="text-green-500 font-semibold text-sm">{platform.growth}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{platform.followers}</p>
                <p className="text-xs text-gray-500">{platform.name === "Instagram" ? "Followers" : "Subscribers"}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {platform.name === "Instagram" ? (
                    <Eye className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{platform.views}</p>
                <p className="text-xs text-gray-500">{platform.name === "Instagram" ? "Views" : "Views*"}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
