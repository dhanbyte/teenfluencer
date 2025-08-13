"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee, TrendingUp, Calendar } from "lucide-react"

const earnings = [
  {
    period: "55 month",
    amount: "₹8,500",
    icon: Calendar,
  },
  {
    period: "Last month",
    amount: "₹2,200",
    icon: TrendingUp,
  },
]

export function EarningsOverview() {
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
          <IndianRupee className="w-5 h-5" />
          Earnings Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {earnings.map((earning, index) => {
          const Icon = earning.icon
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <Icon className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{earning.period}</span>
              </div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">{earning.amount}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
