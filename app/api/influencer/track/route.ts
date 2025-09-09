import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { influencerId, productId, action } = body
    
    // Validate required fields
    if (!influencerId || !productId || !action) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        required: ['influencerId', 'productId', 'action']
      }, { status: 400 })
    }
    
    // Validate action type
    const validActions = ['click', 'conversion', 'signup', 'video_request']
    if (!validActions.includes(action)) {
      return NextResponse.json({ 
        error: 'Invalid action type',
        validActions
      }, { status: 400 })
    }
    
    // Record tracking data with timestamp
    const trackingData = {
      influencer_id: influencerId,
      product_id: productId,
      action: action,
      timestamp: new Date().toISOString(),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown'
    }
    
    db.addTracking(trackingData)
    
    // Update earnings based on action
    const currentEarnings = db.getEarnings(influencerId)
    const updatedEarnings = {
      influencer_id: influencerId,
      total_clicks: currentEarnings?.total_clicks || 0,
      total_conversions: currentEarnings?.total_conversions || 0,
      total_earnings: currentEarnings?.total_earnings || 0,
      total_signups: currentEarnings?.total_signups || 0,
      updated_at: new Date().toISOString()
    }
    
    switch (action) {
      case 'click':
        updatedEarnings.total_clicks += 1
        break
      case 'signup':
        updatedEarnings.total_signups += 1
        break
      case 'conversion':
        updatedEarnings.total_conversions += 1
        break
    }
    
    db.updateEarnings(updatedEarnings)
    
    return NextResponse.json({ 
      success: true,
      message: `${action} tracked successfully`,
      data: {
        influencerId,
        productId,
        action,
        timestamp: trackingData.timestamp
      }
    })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ 
      error: 'Failed to track action',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}