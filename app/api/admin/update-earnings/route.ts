import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { influencer_id, amount } = await request.json()
    
    if (!influencer_id || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Get current earnings
    const { data: current, error: fetchError } = await supabase
      .from('influencer_earnings')
      .select('*')
      .eq('influencer_id', influencer_id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Update earnings
    const { error: updateError } = await supabase
      .from('influencer_earnings')
      .update({
        total_earnings: (current.total_earnings || 0) + amount,
        updated_at: new Date().toISOString()
      })
      .eq('influencer_id', influencer_id)
    
    if (updateError) throw updateError
    
    // Log the transaction
    await supabase
      .from('influencer_tracking')
      .insert({
        influencer_id,
        action: 'admin_bonus',
        commission: amount,
        timestamp: new Date().toISOString()
      })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update earnings error:', error)
    return NextResponse.json({ error: 'Failed to update earnings' }, { status: 500 })
  }
}