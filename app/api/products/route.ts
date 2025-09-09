import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch products from Shopwave
    const response = await fetch(`${process.env.SHOPWAVE_API_URL}/products`)
    const data = await response.json()
    
    // Transform products for influencer use
  const products = data.data?.map((product: Record<string, unknown>) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price?.original || product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      commission: 8 // 8% commission
    })) || []
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}