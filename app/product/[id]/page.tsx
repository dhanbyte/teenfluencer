'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { ShoppingCart, Star, Shield, Truck } from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const productId = params.id as string
  const referralCode = searchParams.get('ref')
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
    if (referralCode) {
      trackClick()
    }
  }, [productId, referralCode])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products`)
      const products = await response.json()
      const foundProduct = products.find((p: any) => p.id === productId)
      setProduct(foundProduct)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackClick = async () => {
    try {
      await fetch('/api/influencer/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId: referralCode,
          productId: productId,
          action: 'click'
        })
      })
    } catch (error) {
      console.error('Error tracking click:', error)
    }
  }

  const handlePurchase = async () => {
    if (referralCode) {
      await fetch('/api/influencer/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId: referralCode,
          productId: productId,
          action: 'conversion'
        })
      })
    }
    alert('Purchase successful! 🎉')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-2">{product.category}</Badge>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                <Badge variant="outline" className="text-sm">
                  Brand: {product.brand}
                </Badge>
              </div>

              {referralCode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    🎉 You're supporting an influencer! They'll earn {product.commission}% commission from your purchase.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700">Premium Quality Product</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Free Delivery</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - ₹{product.price}
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  Secure payment • 30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}