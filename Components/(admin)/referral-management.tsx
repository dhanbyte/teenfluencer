"use client";
import { useState, useEffect } from 'react';

export function ReferralManagement() {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await fetch('/api/admin/influencers');
      const data = await response.json();
      setInfluencers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch influencers:', error);
      setInfluencers([]);
    } finally {
      setLoading(false);
    }
  };

  const syncShopWaveData = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/shopwave/sync', { method: 'POST' });
      const result = await response.json();
      
      if (response.ok) {
        setLastSync(new Date().toLocaleString());
        fetchInfluencers(); // Refresh data
        alert(`Synced ${result.synced} referrals from ShopWave`);
      } else {
        alert('Sync failed: ' + result.error);
      }
    } catch (error) {
      alert('Sync failed: ' + error.message);
    } finally {
      setSyncing(false);
    }
  };

  const updateEarnings = async (influencerId: string, amount: number) => {
    try {
      await fetch('/api/admin/update-earnings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencer_id: influencerId, amount })
      });
      fetchInfluencers();
    } catch (error) {
      console.error('Failed to update earnings:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Referral Management</h2>
        <div className="flex gap-3">
          <button
            onClick={syncShopWaveData}
            disabled={syncing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {syncing ? 'Syncing...' : 'Sync ShopWave Data'}
          </button>
          {lastSync && (
            <span className="text-sm text-gray-500 self-center">
              Last sync: {lastSync}
            </span>
          )}
        </div>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Influencer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referral Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Links Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(influencers || []).map((influencer: any) => (
                <tr key={influencer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                      <div className="text-sm text-gray-500">{influencer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                      {influencer.unique_code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {influencer.links_created || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {influencer.total_clicks || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {influencer.total_conversions || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-green-600">
                      ₹{influencer.total_earnings || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateEarnings(influencer.influencer_id, 50)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                      >
                        +₹50
                      </button>
                      <button
                        onClick={() => updateEarnings(influencer.influencer_id, 100)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        +₹100
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {influencers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No influencers found. Sync ShopWave data first.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}