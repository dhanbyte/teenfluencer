import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    // Fetch referral data from ShopWave
    const shopwaveResponse = await fetch(`${process.env.SHOPWAVE_API_URL}/referrals/analytics`, {
      headers: {
        'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!shopwaveResponse.ok) {
      throw new Error('Failed to fetch ShopWave data')
    }
    
    const shopwaveData = await shopwaveResponse.json()
    
    // Update influencer earnings based on ShopWave data
    for (const referral of shopwaveData.referrals || []) {
      const { referral_code, clicks, conversions, total_amount, orders } = referral
      
      // Find influencer by code
      const { data: influencer } = await supabase
        .from('influencers')
        .select('id')
        .eq('unique_code', referral_code)
        .single()
      
      if (influencer) {
        // Calculate commission (5% of total sales)
        const commission = Math.round(total_amount * 0.05)
        
        // Update earnings
        await supabase
          .from('influencer_earnings')
          .upsert({
            influencer_id: influencer.id,
            total_clicks: clicks,
            total_conversions: conversions,
            total_earnings: commission,
            updated_at: new Date().toISOString()
          })
        
        // Log individual orders
        for (const order of orders || []) {
          await supabase
            .from('influencer_tracking')
            .insert({
              influencer_id: influencer.id,
              action: 'conversion',
              order_amount: order.amount,
              order_id: order.id,
              commission: Math.round(order.amount * 0.05),
              timestamp: order.created_at
            })
        }
      }
    }
    
    return NextResponse.json({ success: true, synced: shopwaveData.referrals?.length || 0 })
  } catch (error) {
    console.error('ShopWave sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}