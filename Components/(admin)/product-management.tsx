"use client";
import { useState, useEffect } from 'react';
import { Plus, Upload, Video, Link, Trash2, Edit, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  video?: string;
  referralUrl: string;
  commission: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    image: '',
    video: '',
    commission: '8'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Wireless Headphones Pro',
          description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
          price: 2999,
          category: 'Electronics',
          brand: 'TechBrand',
          image: '/api/placeholder/300/200',
          video: 'https://example.com/video1.mp4',
          referralUrl: 'https://shopwave.social/product/wireless-headphones-pro?ref=',
          commission: 8,
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Advanced fitness tracking with heart rate monitor and GPS',
          price: 4999,
          category: 'Wearables',
          brand: 'FitTech',
          image: '/api/placeholder/300/200',
          video: 'https://example.com/video2.mp4',
          referralUrl: 'https://shopwave.social/product/smart-fitness-watch?ref=',
          commission: 8,
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const generateReferralUrl = (productName: string) => {
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `https://shopwave.social/product/${slug}?ref=`;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),
      category: newProduct.category,
      brand: newProduct.brand,
      image: newProduct.image || '/api/placeholder/300/200',
      video: newProduct.video,
      referralUrl: generateReferralUrl(newProduct.name),
      commission: Number(newProduct.commission),
      status: 'active',
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [productData, ...prev]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      image: '',
      video: '',
      commission: '8'
    });
    setShowAddForm(false);
    setLoading(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleProductStatus = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Add New Product</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Brand</label>
              <input
                type="text"
                value={newProduct.brand}
                onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter brand name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Price (₹)</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Wearables">Wearables</option>
                <option value="Home">Home & Living</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200"
                >
                  <Upload className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Video URL (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newProduct.video}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, video: e.target.value }))}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter video URL"
                />
                <button
                  type="button"
                  className="bg-purple-500 text-white px-4 py-3 rounded-xl hover:bg-purple-600 transition-colors duration-200"
                >
                  <Video className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter product description"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Commission (%)</label>
              <input
                type="number"
                value={newProduct.commission}
                onChange={(e) => setNewProduct(prev => ({ ...prev, commission: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="8"
                min="1"
                max="50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Auto-Generated URL</label>
              <div className="px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
                {newProduct.name ? generateReferralUrl(newProduct.name) : 'Enter product name to generate URL'}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-300 text-lg">No products added yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gray-700 rounded-xl overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  {product.video && (
                    <div className="bg-purple-500 text-white p-2 rounded-lg">
                      <Video className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    product.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {product.status}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.brand} • {product.category}</p>
                </div>

                <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-green-400">₹{product.price.toLocaleString()}</div>
                  <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm font-semibold">
                    {product.commission}% Commission
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Link className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Referral URL</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono break-all">
                    {product.referralUrl}[INFLUENCER_CODE]
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => toggleProductStatus(product.id)}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      product.status === 'active'
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {product.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}