"use client";
import { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayIntegration() {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const processRazorpayPayment = (userId: string, campaignId: string, amount: number) => {
    const options = {
      key: 'rzp_test_your_key_here', // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'TeenFluencer',
      description: `Campaign Purchase - ${campaignId}`,
      handler: function (response: any) {
        // Payment successful
        handlePaymentSuccess(response, userId, campaignId, amount);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        referral_user_id: userId,
        campaign_id: campaignId
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = (response: any, userId: string, campaignId: string, amount: number) => {
    // Get campaign details
    const campaigns = JSON.parse(localStorage.getItem('adminCampaigns') || '[]');
    const campaign = campaigns.find((c: any) => c.id === campaignId);
    
    if (campaign) {
      const commission = Math.round(amount * (campaign.commissionRate / 100));
      
      // Create payment record
      const paymentRecord = {
        id: response.razorpay_payment_id,
        userId: userId,
        campaignId: campaignId,
        amount: amount,
        commission: commission,
        status: 'completed',
        date: new Date().toLocaleDateString(),
        razorpayId: response.razorpay_payment_id
      };
      
      // Save payment record
      const existingPayments = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
      localStorage.setItem('paymentRecords', JSON.stringify([...existingPayments, paymentRecord]));
      
      // Update user referrals
      const userReferrals = JSON.parse(localStorage.getItem('userReferrals') || '[]');
      const updatedReferrals = userReferrals.map((ref: any) => {
        if (ref.campaignId === campaignId && ref.userId === userId) {
          return {
            ...ref,
            sales: ref.sales + 1,
            earnings: ref.earnings + commission,
            clicks: ref.clicks + 1
          };
        }
        return ref;
      });
      localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals));
      
      // Update campaign stats
      const updatedCampaigns = campaigns.map((c: any) => {
        if (c.id === campaignId) {
          return {
            ...c,
            totalSales: (c.totalSales || 0) + amount,
            referrals: (c.referrals || 0) + 1
          };
        }
        return c;
      });
      localStorage.setItem('adminCampaigns', JSON.stringify(updatedCampaigns));
      
      alert(`Payment successful! User earned ₹${commission}`);
      window.location.reload();
    }
  };

  // Expose function globally for use in other components
  useEffect(() => {
    (window as any).processRazorpayPayment = processRazorpayPayment;
  }, []);

  return null;
}