"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function UserTrackingStats() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalClicks: 0,
    conversions: 0,
    totalEarnings: 0,
    loading: true
  });

  useEffect(() => {
    if (!user) return;
    
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?influencer_id=${user?.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setStats({
          totalClicks: data.totalClicks,
          conversions: data.conversions,
          totalEarnings: data.totalEarnings,
          loading: false
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const simulateClick = async () => {
    if (!user) return;
    
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencer_id: user.id,
          action: 'click'
        })
      });
      
      fetchAnalytics();
    } catch (error) {
      console.error('Failed to update click:', error);
    }
  };

  const simulateConversion = async () => {
    if (!user) return;
    
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencer_id: user.id,
          action: 'conversion',
          amount: 50
        })
      });
      
      fetchAnalytics();
    } catch (error) {
      console.error('Failed to update conversion:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">My Tracking Stats</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">Total Clicks</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.loading ? '...' : stats.totalClicks}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Conversions</h3>
          <p className="text-2xl font-bold text-green-600">{stats.loading ? '...' : stats.conversions}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-purple-800 dark:text-purple-400">Total Earnings</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.loading ? '...' : `₹${stats.totalEarnings}`}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Test Actions</h3>
        <div className="flex gap-3">
          <button
            onClick={simulateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            +1 Click
          </button>
          <button
            onClick={simulateConversion}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
          >
            +1 Conversion
          </button>
        </div>
      </div>
    </div>
  );
}