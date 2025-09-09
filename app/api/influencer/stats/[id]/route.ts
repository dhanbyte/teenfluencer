import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const influencerId = params.id
    
    if (!influencerId) {
      return NextResponse.json({ error: 'Influencer ID required' }, { status: 400 })
    }
    
    // Get influencer earnings from database
    const earnings = db.getEarnings(influencerId)
    
    const stats = earnings ? {
      uniqueId: influencerId,
      clicks: earnings.total_clicks || 0,
      conversions: earnings.total_conversions || 0,
      earnings: earnings.total_earnings || 0,
      signups: earnings.total_signups || 0,
      lastUpdated: earnings.updated_at
    } : {
      uniqueId: influencerId,
      clicks: 0,
      conversions: 0,
      earnings: 0,
      signups: 0,
      lastUpdated: new Date().toISOString()
    }
    
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching influencer stats:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch stats',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}