'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { DollarSign, TrendingUp, Eye, Users, Calendar, Copy } from 'lucide-react'
import { db } from '@/lib/database'

// Earnings dashboard for influencers
export default function EarningsPage() {
  const { user } = useUser()
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalSignups: 0
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    if (user) {
      // Fetch real data from API
      fetch(`/api/influencer/stats/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setStats({
            totalEarnings: data.earnings || 0,
            totalClicks: data.clicks || 0,
            totalConversions: data.conversions || 0,
            totalSignups: data.signups || 0
          })
        })
        .catch(console.error)
      
      // Fetch activity data
      fetch(`/api/influencer/activity/${user.id}`)
        .then(res => res.json())
        .then(data => setRecentActivity(data.slice(0, 10)))
        .catch(() => setRecentActivity([]))
    }
  }, [user])

  const copyReferralLink = () => {
    const link = `https://shopwave.dhanbyte.me/product/wireless-headphones?ref=${user?.id || 'INF001'}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied!')
  }

  const handleWithdrawal = async () => {
    if (!user || stats.totalEarnings < 100) {
      alert('Minimum withdrawal amount is ₹100')
      return
    }
    
    const amount = prompt('Enter withdrawal amount:')
    if (amount && Number(amount) <= stats.totalEarnings) {
      try {
        await fetch('/api/withdrawal/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            influencerId: user.id,
            amount: Number(amount),
            influencerName: user.fullName,
            email: user.emailAddresses[0]?.emailAddress
          })
        })
        alert('Withdrawal request submitted successfully!')
      } catch (error) {
        alert('Failed to submit withdrawal request')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Earnings Dashboard</h1>
        <p className="text-gray-600">Track your influencer performance and earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <DollarSign className="h-12 w-12 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Eye className="h-12 w-12 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold">{stats.totalClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-12 w-12 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">{stats.totalConversions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-12 w-12 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Signups</p>
                <p className="text-2xl font-bold">{stats.totalSignups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button 
              onClick={copyReferralLink}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Copy size={16} />
              Copy Sample Link
            </button>
            <a 
              href="/influencer/products" 
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Browse Products
            </a>
            {stats.totalEarnings > 0 && (
              <button 
                onClick={() => handleWithdrawal()}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <DollarSign size={16} />
                Request Withdrawal
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity: Record<string, unknown>) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{activity.action === 'click' ? 'Product Click' : 'Conversion'}</p>
                      <p className="text-sm text-gray-600">Product ID: {activity.product_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.action === 'conversion' ? 'default' : 'secondary'}>
                      {activity.action}
                    </Badge>
                    {activity.commission && (
                      <p className="text-sm text-green-600 font-medium">+₹{activity.commission}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No activity yet. Start sharing your referral links!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}