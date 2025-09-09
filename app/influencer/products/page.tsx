'use client'

import ProductBrowser from '@/Components/(Infuencer)/product-browser'
import { useUser } from '@clerk/nextjs'

// Products page for influencers
export default function ProductsPage() {
  const { user } = useUser()
  const influencerId = user?.id || 'demo-influencer'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
        <p className="text-gray-600">Find products to promote and earn 8% commission</p>
      </div>
      
      <ProductBrowser influencerId={influencerId} />
    </div>
  )
}