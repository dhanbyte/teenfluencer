import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(products || [])
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    
    // Generate referral URL
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const referralUrl = `https://shopwave.social/product/${slug}?ref=`
    
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        referral_url: referralUrl,
        status: 'active',
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Add product error:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    
    const { data: product, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}