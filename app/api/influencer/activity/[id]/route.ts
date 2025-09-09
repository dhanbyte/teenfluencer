import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const influencerId = params.id
    const tracking = db.getTracking(influencerId)
    return NextResponse.json(tracking)
  } catch (error) {
    console.error('Error fetching activity:', error)
    return NextResponse.json([], { status: 500 })
  }
}