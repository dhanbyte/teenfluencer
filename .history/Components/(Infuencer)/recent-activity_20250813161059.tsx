"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, IndianRupee, Instagram } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "application",
    title: "Applied for 'Nike Summer Collab'",
    time: "3 days ago",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "payment",
    title: "₹2,500 credited",
    time: "1 day ago",
    icon: IndianRupee,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "social",
    title: "Instagram connected",
    time: "5 hours ago",
    icon: Instagram,
    color: "text-purple-600",
  },
]

export function RecentActivity() {
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
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
