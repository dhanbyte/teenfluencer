"use client";
import { useEffect } from 'react';

// Simulate payment detection system
export function PaymentWebhook() {
  useEffect(() => {
    // Listen for payment events (in real app, this would be a webhook)
    const handlePayment = (paymentData: any) => {
      const { userId, campaignId, amount } = paymentData;
      
      // Get campaign details
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
        
        // Save payment record
        const existingPayments = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
        const updatedPayments = [...existingPayments, paymentRecord];
        localStorage.setItem('paymentRecords', JSON.stringify(updatedPayments));
        
        // Update user referrals
        const userReferrals = JSON.parse(localStorage.getItem('userReferrals') || '[]');
        const updatedReferrals = userReferrals.map((ref: any) => {
          if (ref.campaignId === campaignId && ref.userId === userId) {
            return {
              ...ref,
              sales: ref.sales + 1,
              earnings: ref.earnings + commission
            };
          }
          return ref;
        });
        localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals));
        
        console.log(`Payment processed: User ${userId} earned ₹${commission}`);
      }
    };
    
    // Simulate automatic payment detection
    window.addEventListener('paymentCompleted', handlePayment);
    
    return () => {
      window.removeEventListener('paymentCompleted', handlePayment);
    };
  }, []);
  
  return null;
}