import React, { useState } from 'react';
import PaywallModal from './PaywallModal'; // Assuming PaywallModal is in the same directory

function ManageSubscription() {
  const [isProUser, setIsProUser] = useState(false); // Simulate user tier: set to true for Pro, false for Free
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const handleUpgradeClick = () => {
    alert('Redirecting to Stripe payment page for upgrade...');
    // In a real app, this would redirect to Stripe checkout
  };

  const handleManageSubscriptionClick = () => {
    alert('Redirecting to Stripe Customer Portal to manage subscription...');
    // In a real app, this would redirect to Stripe Customer Portal
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Subscription</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            {!isProUser ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Current Plan: Free</h2>
                <p className="mt-2 text-gray-600">
                  Unlock the full potential of AI Novel Maker with our Pro Plan!
                </p>
                <ul className="mt-4 text-gray-700 list-disc list-inside">
                  <li>Unlimited Agents</li>
                  <li>Orchestra Canvas (build complex workflows)</li>
                  <li>Higher Token Limits</li>
                  <li>Priority Support</li>
                </ul>
                <button
                  onClick={handleUpgradeClick}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upgrade to Pro
                </button>
                <button
                  onClick={() => setShowPaywallModal(true)}
                  className="mt-6 ml-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Pro Features (Modal)
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Current Plan: Pro</h2>
                <p className="mt-2 text-green-600 font-medium">
                  You are currently enjoying all the benefits of the Pro Plan.
                </p>
                <button
                  onClick={handleManageSubscriptionClick}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Manage Subscription
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showPaywallModal && <PaywallModal onClose={() => setShowPaywallModal(false)} />}
    </div>
  );
}

export default ManageSubscription;
