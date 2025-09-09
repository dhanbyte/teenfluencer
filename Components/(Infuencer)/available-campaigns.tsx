"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Campaign {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  productLink: string;
  commissionRate: number;
  referrals: number;
  totalSales: number;
}

interface UserReferral {
  campaignId: string;
  userId: string;
  referralLink: string;
  clicks: number;
  sales: number;
  earnings: number;
}

export function AvailableCampaigns() {
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [userReferrals, setUserReferrals] = useState<UserReferral[]>([]);

  useEffect(() => {
    const savedCampaigns = localStorage.getItem('adminCampaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }

    const savedReferrals = localStorage.getItem('userReferrals');
    if (savedReferrals) {
      setUserReferrals(JSON.parse(savedReferrals));
    }
  }, []);

  const generateReferralLink = (campaignId: string) => {
    if (!user) return '';
    const userId = user.id;
    return `https://yoursite.com/product?ref=${userId}&campaign=${campaignId}`;
  };

  // Simulate purchase completion
  const simulatePurchase = (campaignId: string, amount: number = 1000) => {
    if (!user) return;
    const userId = user.id;
    
    // Redirect to payment success URL (simulates real payment gateway redirect)
    const successUrl = `${window.location.origin}/influencer?ref=${userId}&campaign=${campaignId}&payment=success&amount=${amount}`;
    window.location.href = successUrl;
  };

  const joinCampaign = (campaign: Campaign) => {
    if (!user) return;
    
    const userId = user.id;
    const referralLink = generateReferralLink(campaign.id);
    
    const newReferral: UserReferral = {
      campaignId: campaign.id,
      userId: userId,
      referralLink: referralLink,
      clicks: 0,
      sales: 0,
      earnings: 0
    };

    const updatedReferrals = [...userReferrals, newReferral];
    setUserReferrals(updatedReferrals);
    localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals));
  };

  const isJoined = (campaignId: string) => {
    return userReferrals.some(ref => ref.campaignId === campaignId && ref.userId === user?.id);
  };

  const getUserReferral = (campaignId: string) => {
    return userReferrals.find(ref => ref.campaignId === campaignId && ref.userId === user?.id);
  };

  const copyReferralLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Referral link copied!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Available Campaigns</h2>
      
      {campaigns.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No campaigns available</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const userRef = getUserReferral(campaign.id);
            const joined = isJoined(campaign.id);
            
            return (
              <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {campaign.commissionRate}% Commission
                  </span>
                </div>

                {campaign.videoUrl && (
                  <div className="mb-3">
                    <a 
                      href={campaign.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      📹 Watch Campaign Video
                    </a>
                  </div>
                )}

                {joined ? (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Referral Link:</span>
                      <button
                        onClick={() => copyReferralLink(userRef!.referralLink)}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Copy Link
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 break-all">{userRef!.referralLink}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Clicks</p>
                        <p className="text-blue-600">{userRef!.clicks}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Sales</p>
                        <p className="text-green-600">{userRef!.sales}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Earnings</p>
                        <p className="text-purple-600">₹{userRef!.earnings}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => simulatePurchase(campaign.id)}
                      className="w-full bg-green-600 text-white py-1 px-2 rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      Test Purchase (₹1000)
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => joinCampaign(campaign)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Join Campaign
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}