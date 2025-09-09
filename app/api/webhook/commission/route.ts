import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { influencerId, productId, orderId, orderAmount, commission, timestamp } = await request.json()
    
    console.log('Webhook received:', { influencerId, productId, orderId, orderAmount, commission })
    
    // Record the tracking data
    db.addTracking({
      influencer_id: influencerId,
      product_id: productId,
      action: 'conversion',
      order_amount: orderAmount,
      order_id: orderId,
      commission: commission
    })
    
    // Update influencer earnings
    const currentEarnings = db.getEarnings(influencerId)
    
    const updatedEarnings = {
      influencer_id: influencerId,
      total_clicks: currentEarnings?.total_clicks || 0,
      total_conversions: (currentEarnings?.total_conversions || 0) + 1,
      total_earnings: (currentEarnings?.total_earnings || 0) + commission,
      total_signups: currentEarnings?.total_signups || 0,
      updated_at: new Date().toISOString()
    }
    
    db.updateEarnings(updatedEarnings)
    
    console.log('Earnings updated:', updatedEarnings)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}