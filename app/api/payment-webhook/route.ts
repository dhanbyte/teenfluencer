import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, campaignId, amount } = body;
    
    if (!userId || !campaignId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Payment processed automatically',
      userId,
      campaignId,
      commission: Math.round(amount * 0.1)
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}