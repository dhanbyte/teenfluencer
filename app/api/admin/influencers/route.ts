import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get all influencers with earnings
    const { data: influencers, error } = await supabase
      .from('influencers')
      .select(`
        *,
        influencer_earnings(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Get tracking data for each influencer
    const enrichedInfluencers = await Promise.all(
      (influencers || []).map(async (influencer) => {
        // Count unique links/products promoted
        const { data: trackingData } = await supabase
          .from('influencer_tracking')
          .select('product_id')
          .eq('influencer_id', influencer.id)
          .not('product_id', 'is', null)
        
        const uniqueLinks = new Set(trackingData?.map(t => t.product_id) || []).size
        
        return {
          ...influencer,
          ...influencer.influencer_earnings?.[0],
          links_created: uniqueLinks,
          influencer_id: influencer.id
        }
      })
    )
    
    return NextResponse.json(enrichedInfluencers)
  } catch (error) {
    console.error('Admin influencers API error:', error)
    return NextResponse.json({ error: 'Failed to fetch influencers' }, { status: 500 })
  }
}