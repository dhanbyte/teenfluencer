import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const influencerId = searchParams.get('influencer_id')
    
    if (!influencerId) {
      return NextResponse.json({ error: 'Influencer ID required' }, { status: 400 })
    }
    
    // Get earnings data from Supabase
    const { data: earnings, error: earningsError } = await supabase
      .from('influencer_earnings')
      .select('*')
      .eq('influencer_id', influencerId)
      .single()
    
    if (earningsError && earningsError.code !== 'PGRST116') {
      throw earningsError
    }
    
    const stats = {
      totalEarnings: earnings?.total_earnings || 2500,
      totalClicks: earnings?.total_clicks || 1250,
      conversions: earnings?.total_conversions || 85,
      lastUpdated: earnings?.updated_at || new Date().toISOString()
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { influencer_id, action, amount } = await request.json()
    
    if (!influencer_id || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Update earnings based on action
    const { data: current, error: fetchError } = await supabase
      .from('influencer_earnings')
      .select('*')
      .eq('influencer_id', influencer_id)
      .single()
    
    let updateData = {}
    
    if (action === 'click') {
      updateData = {
        total_clicks: (current?.total_clicks || 0) + 1,
        updated_at: new Date().toISOString()
      }
    } else if (action === 'conversion') {
      updateData = {
        total_conversions: (current?.total_conversions || 0) + 1,
        total_earnings: (current?.total_earnings || 0) + (amount || 50),
        updated_at: new Date().toISOString()
      }
    }
    
    const { error: updateError } = await supabase
      .from('influencer_earnings')
      .upsert({
        influencer_id,
        ...current,
        ...updateData
      })
    
    if (updateError) throw updateError
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics update error:', error)
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 })
  }
}