interface Activity {
  action: string;
  influencers?: { name?: string };
  products?: { name?: string };
  commission?: string | number;
  timestamp: string | number | Date;
}
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, DollarSign, TrendingUp, Eye, LogOut } from 'lucide-react';
import { ReferralManagement } from '@/Components/(admin)/referral-management';
import { ProductManagement } from '@/Components/(admin)/product-management';

interface User {
  id: string;
  name: string;
  email: string;
  earnings: number;
  followers: number;
  campaigns: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEarnings: 0,
    totalProducts: 0,
    activeCampaigns: 0,
    recentActivity: [] as Activity[]
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') !== 'true') {
      router.push('/admin/login');
      return;
    }

    fetchUsers();
    fetchAnalytics();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/influencers');
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoggedIn');
    }
    router.push('/admin/login');
  };

  const { totalUsers, totalEarnings, totalProducts, activeCampaigns, recentActivity } = analytics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Admin Dashboard</h1>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Total Users</p>
                  <p className="text-4xl font-bold text-white">{totalUsers}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Total Earnings</p>
                  <p className="text-4xl font-bold text-white">₹{totalEarnings.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Active Campaigns</p>
                  <p className="text-4xl font-bold text-white">{activeCampaigns}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
            <div className="border-b border-white/20">
              <nav className="flex space-x-8 px-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-6 px-2 border-b-2 font-semibold text-base transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-400'
                  }`}
                >
                  Users Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-6 px-2 border-b-2 font-semibold text-base transition-all duration-200 ${
                    activeTab === 'products'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-400'
                  }`}
                >
                  Product Management
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`py-6 px-2 border-b-2 font-semibold text-base transition-all duration-200 ${
                    activeTab === 'referrals'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-400'
                  }`}
                >
                  Referral Management
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-6 px-2 border-b-2 font-semibold text-base transition-all duration-200 ${
                    activeTab === 'analytics'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-400'
                  }`}
                >
                  Analytics
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">User Data & Earnings</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase">User</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase">Earnings</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase">Followers</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase">Campaigns</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-base font-medium text-white">{user.name}</div>
                                <div className="text-sm text-gray-400">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-base text-green-400 font-semibold">
                              ₹{user.earnings.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-base text-white">
                              {user.followers.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-base text-white">
                              {user.campaigns}
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors duration-200">
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <ProductManagement />
              )}

              {activeTab === 'referrals' && (
                <ReferralManagement />
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">{totalProducts}</div>
                        <div className="text-gray-300 text-sm">Total Products</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">{totalUsers}</div>
                        <div className="text-gray-300 text-sm">Total Influencers</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">₹{totalEarnings.toLocaleString()}</div>
                        <div className="text-gray-300 text-sm">Total Earnings</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">{activeCampaigns}</div>
                        <div className="text-gray-300 text-sm">Active Campaigns</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-white mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      {recentActivity.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No recent activity</p>
                        </div>
                      ) : (
                        recentActivity.map((activity, index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                            <div>
                              <div className="text-white font-medium">{activity.action}</div>
                              <div className="text-gray-400 text-sm">
                                {(activity.influencers && 'name' in activity.influencers ? activity.influencers.name : '') ||
                                 (activity.products && 'name' in activity.products ? activity.products.name : '') ||
                                 activity.commission}
                              </div>
                            </div>
                            <div className="text-gray-400 text-sm">
                              {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : ''}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}