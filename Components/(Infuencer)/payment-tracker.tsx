"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface PaymentRecord {
  id: string;
  userId: string;
  campaignId: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed';
  date: string;
}

export function PaymentTracker() {
  const { user } = useUser();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    const savedPayments = localStorage.getItem('paymentRecords');
    if (savedPayments) {
      const allPayments = JSON.parse(savedPayments);
      const userPayments = allPayments.filter((p: PaymentRecord) => p.userId === user?.id);
      setPayments(userPayments);
    }
  }, [user]);

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.commission, 0);

  const pendingEarnings = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.commission, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Tracker</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalEarnings}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">₹{pendingEarnings}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        {payments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No transactions yet</p>
        ) : (
          payments.slice(0, 5).map((payment) => (
            <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Campaign #{payment.campaignId}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{payment.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{payment.commission}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  payment.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}