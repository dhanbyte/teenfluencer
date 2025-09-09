'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Instagram, Youtube, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    youtube: '',
    followers: ''
  })
  const [submitted, setSubmitted] = useState(false)
  interface ApplicationData {
    name: string;
    email: string;
    instagram?: string;
    youtube?: string;
    followers: string;
  }
  const [existingApplication, setExistingApplication] = useState<ApplicationData | null>(null)

  useEffect(() => {
    const savedApplication = localStorage.getItem('influencerApplication')
    if (savedApplication) {
      setExistingApplication(JSON.parse(savedApplication))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const applicationData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }
    localStorage.setItem('influencerApplication', JSON.stringify(applicationData))
    setSubmitted(true)
  }

  if (submitted || existingApplication) {
    const appData = existingApplication || formData
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-600">
                We&apos;ll review your application and get back to you within 24 hours.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Application Details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">{appData.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-900">{appData.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Instagram:</span>
                  <p className="text-gray-900">{appData.instagram || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">YouTube:</span>
                  <p className="text-gray-900">{appData.youtube || 'Not provided'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Followers:</span>
                  <p className="text-gray-900">{appData.followers}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <p className="text-yellow-600 font-medium">Under Review</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/" className="btn-primary inline-block">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Apply to Become an Influencer
            </h1>
            <p className="text-xl text-gray-600">
              Join TeenFluencer and start earning 8% commission on every sale
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Username
                  </label>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <Input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="@your_username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube Channel
                  </label>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <Input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
                      placeholder="@your_channel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Followers *
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <Input
                      type="number"
                      required
                      value={formData.followers}
                      onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                      placeholder="1000"
                      min="100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 100 followers required
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">What you&apos;ll get:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 8% commission on every sale</li>
                    <li>• Real-time analytics dashboard</li>
                    <li>• Premium products to promote</li>
                    <li>• Instant payouts via UPI</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full btn-primary">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}