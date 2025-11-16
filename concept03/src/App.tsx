import React, { useState } from 'react';
import PaywallModal from './components/PaywallModal';
import { UserCircleIcon, PlusIcon } from '@heroicons/react/24/solid'; // Using solid icons for now

const App: React.FC = () => {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Agents'); // 'Agents', 'Orchestra', 'Outputs'

  const handleOrchestraTabClick = () => {
    if (!isPro) {
      setShowPaywall(true);
    } else {
      setActiveTab('Orchestra');
    }
  };

  const handleCreateNewAgent = () => {
    if (!isPro) {
      setShowPaywall(true);
    } else {
      alert('에이전트 메이커 UI 열림 (Pro)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Main Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-purple-400">AI 노블 메이커</h1>
          <span className="text-xl text-gray-300">My First Novel</span>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="pro-toggle" className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-300">Simulate Pro User</span>
            <input
              type="checkbox"
              id="pro-toggle"
              className="sr-only peer"
              checked={isPro}
              onChange={() => setIsPro(!isPro)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-gray-800 p-2 shadow-sm">
        <div className="flex border-b border-gray-700">
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === 'Agents' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('Agents')}
          >
            Agents
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium relative ${
              activeTab === 'Orchestra' && isPro ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-gray-200'
            } ${!isPro ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleOrchestraTabClick}
            disabled={!isPro && activeTab !== 'Orchestra'} // Disable only if not pro and not currently active tab
          >
            Orchestra
            {!isPro && (
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full absolute -top-1 right-0 transform translate-x-1/2 -translate-y-1/2">
                PRO
              </span>
            )}
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === 'Outputs' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('Outputs')}
          >
            Outputs
          </button>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="p-6">
        {activeTab === 'Agents' && (
          <div>
            <button
              className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-medium mb-6 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              onClick={handleCreateNewAgent}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              <span>+ 새 에이전트 생성</span>
            </button>
            {/* Agent Card */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">세계관 설정 도우미</h3>
              <p className="text-gray-400">당신의 소설 세계관을 구축하는 데 도움을 줍니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'Orchestra' && isPro && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="flex space-x-4 mb-4">
              <button
                className="px-4 py-2 bg-gray-700 text-gray-500 rounded-md cursor-not-allowed"
                disabled
              >
                워크플로우 저장
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-gray-500 rounded-md cursor-not-allowed"
                disabled
              >
                워크플로우 실행
              </button>
            </div>
            <p className="text-gray-400 text-lg">Orchestra Canvas (React Flow Placeholder)</p>
          </div>
        )}

        {activeTab === 'Outputs' && (
          <div className="text-gray-400 text-lg">
            Outputs Tab Content (Coming Soon)
          </div>
        )}
      </main>

      <PaywallModal show={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default App;