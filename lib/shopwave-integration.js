// Add this to ShopWave checkout page to track referrals

// Track referral click
function trackReferralClick(referralCode) {
  fetch('https://teenfluencer-domain.com/api/referral/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referral_code: referralCode,
      action: 'click'
    })
  }).catch(console.error);
}

// Track successful order
function trackReferralConversion(referralCode, orderAmount, orderId) {
  fetch('https://teenfluencer-domain.com/api/referral/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referral_code: referralCode,
      action: 'conversion',
      order_amount: orderAmount,
      order_id: orderId
    })
  }).catch(console.error);
}

// Auto-track when referral code is detected
document.addEventListener('DOMContentLoaded', function() {
  const referralCode = localStorage.getItem('referralCode');
  if (referralCode) {
    trackReferralClick(referralCode);
  }
});

// Track on successful checkout
window.addEventListener('orderComplete', function(event) {
  const referralCode = localStorage.getItem('referralCode');
  if (referralCode && event.detail) {
    trackReferralConversion(
      referralCode, 
      event.detail.amount, 
      event.detail.orderId
    );
  }
});