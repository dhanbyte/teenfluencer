'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { DollarSign, Users, TrendingUp, ArrowRight, Star, Target, User } from 'lucide-react'
import Link from 'next/link'

// Simple card components
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`card ${className}`}>{children}</div>
)
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-3">{children}</div>
)
const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)
const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

function QuickStats({ userId }: { userId: string }) {
  const [stats, setStats] = useState({ totalEarnings: 2500, totalClicks: 1250, totalConversions: 85 })
  
  useEffect(() => {
    // Ensure stats are set
    const newStats = { 
      totalEarnings: 2500, 
      totalClicks: 1250, 
      totalConversions: 85 
    }
    console.log('Setting stats:', newStats)
    setStats(newStats)
  }, [userId])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-green-100 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold">₹{stats.totalEarnings}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Total Clicks</p>
            <p className="text-3xl font-bold">{stats.totalClicks}</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-purple-100 text-sm">Conversions</p>
            <p className="text-3xl font-bold">{stats.totalConversions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InfluencerDashboard() {
  const { user } = useUser()
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className={`mb-8 animate-fade-in`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome back, {user.firstName}!</h1>
              <p className="text-gray-600 text-lg">Here's your influencer dashboard overview</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 animate-slide-up">
          <QuickStats userId={user.id} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-4">
                <Link href="/influencer/products" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-between hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Browse Products
                  <ArrowRight size={20} />
                </Link>
                <Link href="/influencer/earnings" className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold flex items-center justify-between hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  View Earnings
                  <ArrowRight size={20} />
                </Link>
                <Link href="/profile/complete" className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold flex items-center justify-between hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  Complete Profile
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-delay">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Getting Started</h3>
              </div>
              <div className="space-y-6">
                {[
                  { icon: '✓', text: 'Account created', color: 'green', completed: true },
                  { icon: '2', text: 'Complete your profile', color: 'blue', completed: false },
                  { icon: '3', text: 'Share your first product', color: 'gray', completed: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : step.color === 'blue' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="text-sm font-bold">{step.icon}</span>
                    </div>
                    <span className={`text-base ${
                      step.completed ? 'text-green-600 font-semibold' : 'text-gray-700'
                    }`}>{step.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/profile/complete" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 mt-8">
                Complete Profile Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}