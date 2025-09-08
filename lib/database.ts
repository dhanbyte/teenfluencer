// Simple in-memory database for demo
// Replace with actual database in production

interface Influencer {
  id: string
  name: string
  email: string
  unique_code: string
  social_handles: {
    youtube?: string
    instagram?: string
    twitter?: string
  }
  created_at: string
  status: 'active' | 'inactive'
}

interface InfluencerEarnings {
  influencer_id: string
  total_clicks: number
  total_conversions: number
  total_earnings: number
  total_signups: number
  updated_at: string
}

interface InfluencerTracking {
  id: string
  influencer_id: string
  product_id: string
  action: 'click' | 'conversion' | 'signup'
  order_amount?: number
  order_id?: string
  commission?: number
  timestamp: string
}

// In-memory storage
let influencers: Influencer[] = [
  {
    id: 'inf_1',
    name: 'Demo Influencer',
    email: 'demo@example.com',
    unique_code: 'INF001',
    social_handles: {
      youtube: '@demochannel',
      instagram: '@demoinfluencer'
    },
    created_at: new Date().toISOString(),
    status: 'active'
  }
]

let earnings: InfluencerEarnings[] = [
  {
    influencer_id: 'inf_1',
    total_clicks: 45,
    total_conversions: 8,
    total_earnings: 2400,
    total_signups: 12,
    updated_at: new Date().toISOString()
  }
]

let tracking: InfluencerTracking[] = []
let withdrawalRequests: any[] = []
let products: any[] = [
  {
    id: 'prod_1',
    name: 'Wireless Headphones',
    description: 'Premium quality wireless headphones with noise cancellation',
    price: 2999,
    image: '/api/placeholder/300/200',
    category: 'Electronics',
    commission: 8,
    brand: 'TechBrand',
    created_at: new Date().toISOString()
  }
]

export const db = {
  withdrawalRequests,
  products,
  getProducts: () => products,
  addProduct: (product: any) => {
    products.push(product)
    return product
  },
  // Influencers
  getInfluencers: () => influencers,
  getInfluencer: (id: string) => influencers.find(i => i.id === id),
  createInfluencer: (data: Omit<Influencer, 'id' | 'created_at'>) => {
    const newInfluencer: Influencer = {
      ...data,
      id: `inf_${Date.now()}`,
      created_at: new Date().toISOString()
    }
    influencers.push(newInfluencer)
    return newInfluencer
  },
  updateInfluencer: (id: string, data: Partial<Influencer>) => {
    const index = influencers.findIndex(i => i.id === id)
    if (index !== -1) {
      influencers[index] = { ...influencers[index], ...data }
      return influencers[index]
    }
    return null
  },
  deleteInfluencer: (id: string) => {
    const index = influencers.findIndex(i => i.id === id)
    if (index !== -1) {
      influencers.splice(index, 1)
      return true
    }
    return false
  },

  // Earnings
  getEarnings: (influencerId: string) => earnings.find(e => e.influencer_id === influencerId),
  updateEarnings: (data: InfluencerEarnings) => {
    const index = earnings.findIndex(e => e.influencer_id === data.influencer_id)
    if (index !== -1) {
      earnings[index] = { ...data, updated_at: new Date().toISOString() }
    } else {
      earnings.push({ ...data, updated_at: new Date().toISOString() })
    }
    return earnings.find(e => e.influencer_id === data.influencer_id)
  },

  // Tracking
  addTracking: (data: Omit<InfluencerTracking, 'id'>) => {
    const newTracking: InfluencerTracking = {
      ...data,
      id: `track_${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    tracking.push(newTracking)
    return newTracking
  },
  getTracking: (influencerId: string) => tracking.filter(t => t.influencer_id === influencerId)
}