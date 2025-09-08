import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    // Create influencer_earnings table
    const { error: earningsError } = await supabase
      .from('influencer_earnings')
      .select('id')
      .limit(1)
    
    if (earningsError?.code === '42P01') {
      // Table doesn't exist, create it via SQL
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE influencer_earnings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            influencer_id TEXT NOT NULL UNIQUE,
            total_clicks INTEGER DEFAULT 0,
            total_conversions INTEGER DEFAULT 0,
            total_earnings DECIMAL(10,2) DEFAULT 0,
            total_signups INTEGER DEFAULT 0,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })
    }
    
    // Insert sample data
    const { error: insertError } = await supabase
      .from('influencer_earnings')
      .upsert({
        influencer_id: 'sample_user',
        total_clicks: 1250,
        total_conversions: 85,
        total_earnings: 2500.00
      })
    
    return NextResponse.json({ success: true, message: 'Database setup complete' })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 })
  }
}