'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Badge } from '@/Components/ui/badge'
import { Users, TrendingUp, DollarSign, Eye, Edit, Trash2 } from 'lucide-react'
import { db } from '@/lib/database'

interface InfluencerData {
  id: string
  name: string
  email: string
  unique_code: string
  social_handles: {
    youtube?: string
    instagram?: string
    twitter?: string
  }
  status: 'active' | 'inactive'
  created_at: string
  earnings?: {
    total_clicks: number
    total_conversions: number
    total_earnings: number
    total_signups: number
  }
}

export default function InfluencerManagement() {
  const [influencers, setInfluencers] = useState<InfluencerData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingInfluencer, setEditingInfluencer] = useState<InfluencerData | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    youtube: '',
    instagram: '',
    twitter: ''
  })

  useEffect(() => {
    fetchInfluencers()
  }, [])

  const fetchInfluencers = async () => {
    try {
      setLoading(true)
      
      // Fetch influencers from simple database
      const influencersData = db.getInfluencers()

      // Fetch earnings for each influencer
      const influencersWithEarnings = influencersData.map((influencer) => {
        const earnings = db.getEarnings(influencer.id)
        return {
          ...influencer,
          earnings: earnings || {
            total_clicks: 0,
            total_conversions: 0,
            total_earnings: 0,
            total_signups: 0
          }
        }
      })

      setInfluencers(influencersWithEarnings)
    } catch (error) {
      console.error('Error fetching influencers:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateUniqueCode = () => {
    return 'INF' + Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const influencerData = {
        name: formData.name,
        email: formData.email,
        unique_code: editingInfluencer?.unique_code || generateUniqueCode(),
        social_handles: {
          youtube: formData.youtube || undefined,
          instagram: formData.instagram || undefined,
          twitter: formData.twitter || undefined
        },
        status: 'active' as const
      }

      if (editingInfluencer) {
        // Update existing influencer
        db.updateInfluencer(editingInfluencer.id, influencerData)
      } else {
        // Create new influencer
        db.createInfluencer(influencerData)
      }

      fetchInfluencers()
      resetForm()
    } catch (error) {
      console.error('Error saving influencer:', error)
    }
  }

  const handleEdit = (influencer: InfluencerData) => {
    setEditingInfluencer(influencer)
    setFormData({
      name: influencer.name,
      email: influencer.email,
      youtube: influencer.social_handles.youtube || '',
      instagram: influencer.social_handles.instagram || '',
      twitter: influencer.social_handles.twitter || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (influencerId: string) => {
    if (!confirm('Are you sure you want to delete this influencer?')) return

    try {
      db.deleteInfluencer(influencerId)
      fetchInfluencers()
    } catch (error) {
      console.error('Error deleting influencer:', error)
    }
  }

  const toggleStatus = async (influencer: InfluencerData) => {
    try {
      const newStatus = influencer.status === 'active' ? 'inactive' : 'active'
      db.updateInfluencer(influencer.id, { status: newStatus })
      fetchInfluencers()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      youtube: '',
      instagram: '',
      twitter: ''
    })
    setEditingInfluencer(null)
    setShowForm(false)
  }

  const totalStats = influencers.reduce((acc, inf) => ({
    totalInfluencers: acc.totalInfluencers + 1,
    totalEarnings: acc.totalEarnings + (inf.earnings?.total_earnings || 0),
    totalClicks: acc.totalClicks + (inf.earnings?.total_clicks || 0),
    totalConversions: acc.totalConversions + (inf.earnings?.total_conversions || 0)
  }), { totalInfluencers: 0, totalEarnings: 0, totalClicks: 0, totalConversions: 0 })

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{totalStats.totalInfluencers}</div>
                <div className="text-sm text-gray-600">Total Influencers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">₹{totalStats.totalEarnings}</div>
                <div className="text-sm text-gray-600">Total Payouts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{totalStats.totalClicks}</div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{totalStats.totalConversions}</div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Influencer Management</h2>
        <Button onClick={() => setShowForm(true)}>
          Add New Influencer
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingInfluencer ? 'Edit Influencer' : 'Add New Influencer'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube Channel</label>
                  <Input
                    value={formData.youtube}
                    onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
                    placeholder="@channel_name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram Handle</label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter Handle</label>
                  <Input
                    value={formData.twitter}
                    onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                    placeholder="@username"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingInfluencer ? 'Update' : 'Add'} Influencer
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Influencers List */}
      <div className="grid grid-cols-1 gap-4">
        {influencers.map((influencer) => (
          <Card key={influencer.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{influencer.name}</h3>
                    <Badge 
                      variant={influencer.status === 'active' ? 'default' : 'secondary'}
                    >
                      {influencer.status}
                    </Badge>
                    <Badge variant="outline">
                      {influencer.unique_code}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{influencer.email}</p>
                  
                  <div className="flex gap-4 text-sm text-gray-500 mb-3">
                    {influencer.social_handles.youtube && (
                      <span>YouTube: {influencer.social_handles.youtube}</span>
                    )}
                    {influencer.social_handles.instagram && (
                      <span>Instagram: {influencer.social_handles.instagram}</span>
                    )}
                    {influencer.social_handles.twitter && (
                      <span>Twitter: {influencer.social_handles.twitter}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{influencer.earnings?.total_clicks || 0}</div>
                      <div className="text-gray-500">Clicks</div>
                    </div>
                    <div>
                      <div className="font-medium">{influencer.earnings?.total_conversions || 0}</div>
                      <div className="text-gray-500">Sales</div>
                    </div>
                    <div>
                      <div className="font-medium">₹{influencer.earnings?.total_earnings || 0}</div>
                      <div className="text-gray-500">Earnings</div>
                    </div>
                    <div>
                      <div className="font-medium">{influencer.earnings?.total_signups || 0}</div>
                      <div className="text-gray-500">Signups</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(influencer)}
                  >
                    {influencer.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(influencer)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(influencer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {influencers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No influencers found</p>
            <Button onClick={() => setShowForm(true)}>
              Add Your First Influencer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}