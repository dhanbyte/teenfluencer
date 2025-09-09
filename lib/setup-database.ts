import { supabase } from './supabase'

export async function setupDatabase() {
  try {
    // Create influencer_earnings table
    await supabase.rpc('create_earnings_table', {})
    
    // Create influencer_tracking table  
    await supabase.rpc('create_tracking_table', {})
    
    console.log('Database setup complete')
    return { success: true }
  } catch (error) {
    console.error('Database setup failed:', error)
    return { success: false, error }
  }
}