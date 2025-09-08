"use client";
import { useState } from 'react';

export function ManualPaymentEntry() {
  const [paymentData, setPaymentData] = useState({
    userId: '',
    campaignId: '',
    amount: '',
    razorpayId: ''
  });

  const addManualPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaigns = JSON.parse(localStorage.getItem('adminCampaigns') || '[]');
    const campaign = campaigns.find((c: any) => c.id === paymentData.campaignId);
    
    if (campaign) {
      const amount = parseFloat(paymentData.amount);
      const commission = Math.round(amount * (campaign.commissionRate / 100));
      
      // Create payment record
      const paymentRecord = {
        id: paymentData.razorpayId || Date.now().toString(),
        userId: paymentData.userId,
        campaignId: paymentData.campaignId,
        amount: amount,
        commission: commission,
        status: 'completed',
        date: new Date().toLocaleDateString(),
        razorpayId: paymentData.razorpayId
      };
      
      // Save payment
      const existingPayments = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
      localStorage.setItem('paymentRecords', JSON.stringify([...existingPayments, paymentRecord]));
      
      // Update user referrals
      const userReferrals = JSON.parse(localStorage.getItem('userReferrals') || '[]');
      const updatedReferrals = userReferrals.map((ref: any) => {
        if (ref.campaignId === paymentData.campaignId && ref.userId === paymentData.userId) {
          return {
            ...ref,
            sales: ref.sales + 1,
            earnings: ref.earnings + commission
          };
        }
        return ref;
      });
      localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals));
      
      // Update campaign stats
      const updatedCampaigns = campaigns.map((c: any) => {
        if (c.id === paymentData.campaignId) {
          return {
            ...c,
            totalSales: (c.totalSales || 0) + amount,
            referrals: (c.referrals || 0) + 1
          };
        }
        return c;
      });
      localStorage.setItem('adminCampaigns', JSON.stringify(updatedCampaigns));
      
      alert(`Payment added! User earned ₹${commission}`);
      setPaymentData({ userId: '', campaignId: '', amount: '', razorpayId: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Add Manual Payment</h3>
      <form onSubmit={addManualPayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">User ID</label>
          <input
            type="text"
            placeholder="user_2oVGVgVOuOsMfcMQrGGmmrqaJWP"
            className="w-full px-3 py-2 border rounded-lg"
            value={paymentData.userId}
            onChange={(e) => setPaymentData(prev => ({ ...prev, userId: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Campaign ID</label>
          <input
            type="text"
            placeholder="1"
            className="w-full px-3 py-2 border rounded-lg"
            value={paymentData.campaignId}
            onChange={(e) => setPaymentData(prev => ({ ...prev, campaignId: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            placeholder="1000"
            className="w-full px-3 py-2 border rounded-lg"
            value={paymentData.amount}
            onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Razorpay Payment ID (Optional)</label>
          <input
            type="text"
            placeholder="pay_xxxxxxxxxxxxx"
            className="w-full px-3 py-2 border rounded-lg"
            value={paymentData.razorpayId}
            onChange={(e) => setPaymentData(prev => ({ ...prev, razorpayId: e.target.value }))}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add Payment & Credit User
        </button>
      </form>
    </div>
  );
}