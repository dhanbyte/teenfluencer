import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('influencers')
      .select('*', { count: 'exact', head: true })
    
    // Get total earnings
    const { data: earnings } = await supabase
      .from('influencer_earnings')
      .select('total_earnings')
    
    const totalEarnings = earnings?.reduce((sum, e) => sum + (e.total_earnings || 0), 0) || 0
    
    // Get total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    
    // Get active campaigns (products with status active)
    const { count: activeCampaigns } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    
    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('influencer_tracking')
      .select('*, influencers(name), products(name)')
      .order('timestamp', { ascending: false })
      .limit(10)
    
    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalEarnings,
      totalProducts: totalProducts || 0,
      activeCampaigns: activeCampaigns || 0,
      recentActivity: recentActivity || []
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}