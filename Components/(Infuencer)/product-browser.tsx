'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Copy, Video, ExternalLink, Eye, TrendingUp, DollarSign, Users } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  commission: number
  brand: string
}

interface InfluencerStats {
  uniqueId: string
  clicks: number
  conversions: number
  earnings: number
  signups: number
}

export default function ProductBrowser({ influencerId }: { influencerId: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<InfluencerStats>({
    uniqueId: influencerId,
    clicks: 0,
    conversions: 0,
    earnings: 0,
    signups: 0
  })
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch products from API
    fetchProducts()
    fetchInfluencerStats()
  }, [influencerId])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/products', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : data.products || [])
      } else {
        throw new Error(`Failed to fetch products: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products. Please try again.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchInfluencerStats = async () => {
    try {
      const response = await fetch(`/api/influencer/stats/${influencerId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const generateUniqueLink = (productId: string) => {
    return `${window.location.origin}/product/${productId}?ref=${influencerId}&utm_source=influencer&utm_medium=${influencerId}`
  }

  const copyToClipboard = async (link: string, productId: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedLink(productId)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const recordVideoClick = async (productId: string) => {
    try {
      await fetch('/api/influencer/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId,
          productId,
          action: 'video_request'
        })
      })
    } catch (error) {
      console.error('Error tracking video click:', error)
    }
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Stats Overview - Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <style jsx>{`
          @keyframes animate-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-in {
            animation: animate-in 0.6s ease-out;
          }
        `}</style>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.clicks}</div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.conversions}</div>
                <div className="text-sm text-gray-600">Conversions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{stats.earnings}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.signups}</div>
                <div className="text-sm text-gray-600">Signups</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📎</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h3>
          <p className="text-gray-500">Admin hasn't added any products yet. Check back later!</p>
        </div>
      )}
      
      {/* Products Grid - Responsive */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
          const uniqueLink = generateUniqueLink(product.id)
          const expectedEarning = (product.price * product.commission) / 100

          return (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 magnetic group"
              style={{
                animationDelay: `${index * 0.1}s`,
                '--stagger': index
              } as React.CSSProperties}
            >
              <div className="aspect-square sm:aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <Badge className="absolute top-2 right-2 bg-green-500 text-xs">
                  {product.commission}%
                </Badge>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-sm sm:text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg sm:text-xl font-bold text-green-600">₹{product.price}</span>
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="text-xs sm:text-sm mb-2">
                  <span className="text-gray-500">Brand: </span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-purple-600 mb-3">
                  Earn ₹{expectedEarning} per sale
                </div>

                {/* Compact Link */}
                <div className="mb-3">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={uniqueLink}
                      readOnly
                      className="flex-1 px-2 py-1 text-xs border rounded bg-gray-50"
                    />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(uniqueLink, product.id)}
                      className={`px-2 py-1 text-xs transition-all duration-300 ${
                        copiedLink === product.id 
                          ? 'bg-green-500 text-white glow-effect scale-110' 
                          : 'hover:glow-effect'
                      }`}
                    >
                      {copiedLink === product.id ? (
                        <span className="animate-bounce">✓</span>
                      ) : (
                        <Copy size={12} className="group-hover:rotate-12 transition-transform" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Compact Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => recordVideoClick(product.id)}
                    className="text-xs py-1"
                  >
                    <Video size={12} className="mr-1" />
                    Video
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(uniqueLink, '_blank')}
                    className="text-xs py-1"
                  >
                    <ExternalLink size={12} className="mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          )
          })}
        </div>
      )}
    </div>
  )
}