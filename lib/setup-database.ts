import { supabase } from './supabase'

export async function setupDatabase() {
  try {
    // Create influencer_earnings table
    const { error: earningsError } = await supabase.rpc('create_earnings_table', {})
    
    // Create influencer_tracking table  
    const { error: trackingError } = await supabase.rpc('create_tracking_table', {})
    
    console.log('Database setup complete')
    return { success: true }
  } catch (error) {
    console.error('Database setup failed:', error)
    return { success: false, error }
  }
}