import React from 'react';

interface PaywallModalProps {
  show: boolean;
  onClose: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-white">
        <h2 className="text-2xl font-bold mb-4">Pro 플랜으로 업그레이드</h2>
        <p className="mb-6 text-gray-300">
          AI 작가팀을 구성하고 '오케스트라 캔버스'로 자동 집필을 경험하세요!
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Pro 플랜 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
