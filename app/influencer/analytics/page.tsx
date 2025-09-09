'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react'
import { db } from '@/lib/database'

// Analytics dashboard for influencers
export default function AnalyticsPage() {
  const { user } = useUser()
  const [analytics, setAnalytics] = useState({
    clickRate: 0,
    conversionRate: 0,
    avgEarningsPerClick: 0,
    topProducts: []
  })

  useEffect(() => {
    if (user) {
      // Fetch stats
      fetch(`/api/influencer/stats/${user.id}`)
        .then(res => res.json())
        .then(data => {
          const clickRate = data.clicks > 0 ? (data.clicks / 100) * 100 : 0
          const conversionRate = data.clicks > 0 ? (data.conversions / data.clicks) * 100 : 0
          const avgEarningsPerClick = data.clicks > 0 ? data.earnings / data.clicks : 0
          
          setAnalytics(prev => ({
            ...prev,
            clickRate,
            conversionRate,
            avgEarningsPerClick
          }))
        })
        .catch(console.error)
      
      // Fetch activity
      fetch(`/api/influencer/activity/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setAnalytics(prev => ({
            ...prev,
            topProducts: data.slice(0, 5)
          }))
        })
        .catch(console.error)
    }
  }, [user])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Detailed insights into your performance</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="h-12 w-12 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">{analytics.clickRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-12 w-12 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-12 w-12 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Earnings/Click</p>
                <p className="text-2xl font-bold">₹{analytics.avgEarningsPerClick.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Products */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-4">
              {analytics.topProducts.map((product: Record<string, unknown>, index: number) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">Product ID: {product.product_id}</p>
                      <p className="text-sm text-gray-600">{product.action} - {new Date(product.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge variant={product.action === 'conversion' ? 'default' : 'secondary'}>
                    {product.action}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No data available yet. Start promoting products!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Performance chart coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}