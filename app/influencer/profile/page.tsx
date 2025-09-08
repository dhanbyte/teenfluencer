"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { User, Instagram, Youtube, CreditCard } from "lucide-react"
import { db } from "@/lib/database"

// Profile completion page for influencers
export default function ProfilePage() {
  const router = useRouter()
  const { user } = useUser()
  const [formData, setFormData] = useState({
    instagram: '',
    youtube: '',
    upiId: ''
  })

  const handleSave = () => {
    if (!user) return
    
    // Create or update influencer profile
    const influencerData = {
      name: user.fullName || 'Influencer',
      email: user.emailAddresses[0]?.emailAddress || '',
      unique_code: `INF${user.id.slice(-6).toUpperCase()}`,
      social_handles: {
        instagram: formData.instagram,
        youtube: formData.youtube
      },
      upi_id: formData.upiId,
      status: 'active' as const
    }
    
    const existing = db.getInfluencer(user.id)
    if (existing) {
      db.updateInfluencer(user.id, influencerData)
    } else {
      db.createInfluencer(influencerData)
    }
    
    alert('Profile saved successfully!')
    router.push('/influencer')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Profile</h1>
        
        <div className="space-y-6">
          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Social Media Handles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram Username</label>
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <Input
                    placeholder="@your_username"
                    value={formData.instagram}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">YouTube Channel</label>
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <Input
                    placeholder="@your_channel"
                    value={formData.youtube}
                    onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium mb-2">UPI ID</label>
                <Input
                  placeholder="yourname@paytm"
                  value={formData.upiId}
                  onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1">
              Save Profile
            </Button>
            <Button variant="outline" onClick={() => router.push('/influencer')} className="flex-1">
              Skip for Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}