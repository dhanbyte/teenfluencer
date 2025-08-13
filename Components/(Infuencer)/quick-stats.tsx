"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle, IndianRupee, Users } from "lucide-react"

const stats = [
  {
    id: 1,
    title: "Applied Campaigns",
    value: "5",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    subtitle: "This month",
  },
  {
    id: 2,
    title: "Approved Campaigns",
    value: "2",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    subtitle: "Active now",
  },
  {
    id: 3,
    title: "Pending Payments",
    value: "₹4,500",
    icon: IndianRupee,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    subtitle: "To be received",
  },
  {
    id: 4,
    title: "Total Followers",
    value: "1.2M",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    subtitle: "Across platforms",
  },
]

export function QuickStats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Card
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
