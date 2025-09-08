"use client";
import { useEffect } from 'react';

export function AutoPaymentSystem() {
  useEffect(() => {
    // Auto-detect payments from URL parameters
    const detectPayment = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      const campaign = urlParams.get('campaign');
      const payment = urlParams.get('payment');
      const amount = urlParams.get('amount');
      
      if (ref && campaign && payment === 'success' && amount) {
        processAutoPayment(ref, campaign, parseFloat(amount));
      }
    };
    
    const processAutoPayment = (userId: string, campaignId: string, amount: number) => {
      const campaigns = JSON.parse(localStorage.getItem('adminCampaigns') || '[]');
      const campaign = campaigns.find((c: any) => c.id === campaignId);
      
      if (campaign) {
        const commission = Math.round(amount * (campaign.commissionRate / 100));
        
        // Create payment record
        const paymentRecord = {
          id: Date.now().toString(),
          userId: userId,
          campaignId: campaignId,
          amount: amount,
          commission: commission,
          status: 'completed',
          date: new Date().toLocaleDateString()
        };
        
        // Save payment
        const existingPayments = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
        localStorage.setItem('paymentRecords', JSON.stringify([...existingPayments, paymentRecord]));
        
        // Update user earnings
        const userReferrals = JSON.parse(localStorage.getItem('userReferrals') || '[]');
        const updatedReferrals = userReferrals.map((ref: any) => {
          if (ref.campaignId === campaignId && ref.userId === userId) {
            return { ...ref, sales: ref.sales + 1, earnings: ref.earnings + commission };
          }
          return ref;
        });
        localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals));
        
        // Show success message
        alert(`Payment successful! User ${userId} earned ₹${commission}`);
      }
    };
    
    detectPayment();
  }, []);
  
  return null;
}