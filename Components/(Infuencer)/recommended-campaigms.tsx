"use client"

import { useState, useEffect } from "react"
import { ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

const campaigns = [
  {
    id: 1,
    brand: "Nike",
    title: "Nike Summer Collab",
    amount: "₹20,000",
    logo: "🏃‍♂️",
    status: "new",
    color: "bg-orange-500",
  },
  {
    id: 2,
    brand: "Apple",
    title: "Apple Gadget Review",
    amount: "₹15,000",
    logo: "🍎",
    status: "approved",
    color: "bg-gray-800",
  },
]

export function RecommendedCampaigns() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Card
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Recommended Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign.id}
            className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${campaign.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {campaign.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{campaign.brand}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.title}</p>
                </div>
              </div>
              {campaign.status === "approved" && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800 dark:text-white">{campaign.amount}</span>
              <Button
                size="sm"
                className={`${campaign.status === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white transition-all duration-300 hover:scale-105`}
              >
                {campaign.status === "approved" ? "View Details" : "Apply Now"}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
