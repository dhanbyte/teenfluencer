'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Badge } from '@/Components/ui/badge'
import { Plus, Edit, Trash2, Upload, Eye } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  commission: number
  brand: string
  status: 'active' | 'inactive'
  createdAt: string
}

interface ProductForm {
  name: string
  description: string
  price: number
  image: string
  category: string
  commission: number
  brand: string
}

export default function ProductManager({ brandId }: { brandId: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    commission: 8, // Default 8% commission
    brand: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [brandId])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/brand/products/${brandId}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct 
        ? `/api/brand/products/${editingProduct.id}`
        : '/api/brand/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, brandId })
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      commission: product.commission,
      brand: product.brand
    })
    setShowForm(true)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/brand/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      commission: 8,
      brand: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Here you would typically upload to a cloud service
    // For now, we'll use a placeholder
    const imageUrl = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name</label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Commission (%)</label>
                  <Input
                    type="number"
                    value={formData.commission}
                    onChange={(e) => setFormData(prev => ({ ...prev, commission: Number(e.target.value) }))}
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-2 right-2 ${
                  product.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                {product.status}
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="text-sm">
                <span className="text-gray-500">Commission: </span>
                <span className="font-medium text-purple-600">{product.commission}%</span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
              
              {/* Product Stats */}
              <div className="text-xs text-gray-500 pt-3 border-t mt-3">
                <div className="flex justify-between">
                  <span>Views: 0</span>
                  <span>Clicks: 0</span>
                  <span>Sales: 0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No products added yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus size={16} className="mr-2" />
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}