import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Influencer {
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

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  shopwave_id: string
  commission_rate: number
  created_at: string
}

export interface InfluencerTracking {
  id: string
  influencer_id: string
  product_id: string
  action: 'click' | 'conversion' | 'signup'
  order_amount?: number
  order_id?: string
  commission?: number
  timestamp: string
}

export interface InfluencerEarnings {
  id: string
  influencer_id: string
  total_clicks: number
  total_conversions: number
  total_earnings: number
  total_signups: number
  updated_at: string
}