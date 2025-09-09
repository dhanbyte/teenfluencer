import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { influencerId, amount, influencerName, email } = await request.json()
    
    // Add withdrawal request to database
    const withdrawalRequest = {
      id: `wd_${Date.now()}`,
      influencer_id: influencerId,
      influencer_name: influencerName,
      email: email,
      amount: amount,
      status: 'pending',
      requested_at: new Date().toISOString()
    }
    
    // Store in database (you can extend db.ts to handle withdrawals)
    if (!db.withdrawalRequests) {
      db.withdrawalRequests = []
    }
    db.withdrawalRequests.push(withdrawalRequest)
    
    return NextResponse.json({ success: true, message: 'Withdrawal request submitted' })
  } catch (error) {
    console.error('Withdrawal request error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Return all withdrawal requests for admin
    const requests = db.withdrawalRequests || []
    return NextResponse.json(requests)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}