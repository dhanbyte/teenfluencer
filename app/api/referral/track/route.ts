import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { referral_code, action, order_amount, order_id } = await request.json()
    
    if (!referral_code || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Find influencer by referral code
    const { data: influencer, error: influencerError } = await supabase
      .from('influencers')
      .select('id, unique_code')
      .eq('unique_code', referral_code)
      .single()
    
    if (influencerError || !influencer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }
    
    // Calculate commission
    let commission = 0
    if (action === 'conversion' && order_amount) {
      commission = Math.round(order_amount * 0.05) // 5% commission
    } else if (action === 'click') {
      commission = 1 // ₹1 per click
    }
    
    // Log tracking event
    await supabase
      .from('influencer_tracking')
      .insert({
        influencer_id: influencer.id,
        action,
        order_amount,
        order_id,
        commission,
        timestamp: new Date().toISOString()
      })
    
    // Update earnings
    const { data: current, error: fetchError } = await supabase
      .from('influencer_earnings')
      .select('*')
      .eq('influencer_id', influencer.id)
      .single()
    
    const updateData = {
      total_earnings: (current?.total_earnings || 0) + commission,
      updated_at: new Date().toISOString()
    }
    
    if (action === 'click') {
      updateData.total_clicks = (current?.total_clicks || 0) + 1
    } else if (action === 'conversion') {
      updateData.total_conversions = (current?.total_conversions || 0) + 1
    }
    
    await supabase
      .from('influencer_earnings')
      .upsert({
        influencer_id: influencer.id,
        ...current,
        ...updateData
      })
    
    return NextResponse.json({ success: true, commission })
  } catch (error) {
    console.error('Referral tracking error:', error)
    return NextResponse.json({ error: 'Failed to track referral' }, { status: 500 })
  }
}