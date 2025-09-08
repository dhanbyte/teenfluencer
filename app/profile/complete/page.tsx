"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Youtube, CreditCard, ArrowRight, Sparkles } from 'lucide-react';

export default function CompleteProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    instagram: '',
    youtube: '',
    upiId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to database
    console.log('Profile data:', formData);
    
    setIsLoading(false);
    router.push('/influencer');
  };

  const handleSkip = () => {
    router.push('/influencer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Add your details to start earning with referrals</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Social Media Handles
              </h3>
              
              {/* Instagram */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Username
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-500" />
                  <input
                    type="text"
                    placeholder="@your_username"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-purple-300"
                  />
                </div>
              </div>

              {/* YouTube */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Channel
                </label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="text"
                    placeholder="@your_channel"
                    value={formData.youtube}
                    onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-purple-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Payment Details
              </h3>
              
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    placeholder="yourname@paytm"
                    value={formData.upiId}
                    onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-purple-300"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Save Profile
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-gray-600 py-3 px-6 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Skip for Now
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-fade-in-delay">
          <p className="text-sm text-gray-500">
            Complete your profile to unlock all features
          </p>
        </div>
      </div>
    </div>
  );
}