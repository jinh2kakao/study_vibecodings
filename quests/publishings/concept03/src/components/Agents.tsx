import React, { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  systemPrompt: string;
  llmModel: string;
}

function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showAgentMakerModal, setShowAgentMakerModal] = useState(false);
  const [showTestRunModal, setShowTestRunModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isProUser, setIsProUser] = useState(false); // Simulate user tier
  const MAX_FREE_AGENTS = 1; // Defined in functional definition

  useEffect(() => {
    // Simulate fetching agents from an API
    console.log('Fetching agents from GET /api/agents...');
    setTimeout(() => {
      setAgents([
        { id: 'agent1', name: 'Storyteller', systemPrompt: 'You are a creative storyteller.', llmModel: 'GPT-4' },
        { id: 'agent2', name: 'Character Designer', systemPrompt: 'You design vivid characters.', llmModel: 'Claude 3' },
      ]);
      // Simulate user tier after fetching agents
      // For testing, set to true to see Pro features, false for Free features
      setIsProUser(false);
    }, 500);
  }, []);

  const handleCreateNewAgentClick = () => {
    if (!isProUser && agents.length >= MAX_FREE_AGENTS) {
      // Simulate showing Pro upgrade modal
      alert('Free users are limited to 1 agent. Please upgrade to Pro to create more.');
      // In a real app, this would trigger the Paywall Modal (4.1)
    } else {
      setShowAgentMakerModal(true);
    }
  };

  const handleSaveAgent = (newAgent: Agent) => {
    console.log('Saving new agent:', newAgent);
    // Simulate POST /api/agents
    setTimeout(() => {
      setAgents([...agents, newAgent]);
      setShowAgentMakerModal(false);
    }, 500);
  };

  const handleTestRunClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowTestRunModal(true);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Agents Library</h2>
        <button
          onClick={handleCreateNewAgentClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          + New Agent
        </button>
      </div>
      <p className="mt-2 text-gray-600">List of AI agents for this project.</p>

      {agents.length === 0 ? (
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-400 text-lg mt-4">
          No agents yet. Click "+ New Agent" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
              <p className="text-sm text-gray-600 truncate">{agent.systemPrompt}</p>
              <p className="text-xs text-gray-500 mt-1">Model: {agent.llmModel}</p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleTestRunClick(agent)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Test Run
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agent Maker Modal (3.1.2) */}
      {showAgentMakerModal && (
        <AgentMakerModal onClose={() => setShowAgentMakerModal(false)} onSave={handleSaveAgent} />
      )}

      {/* Test Run Modal (3.1.3) */}
      {showTestRunModal && selectedAgent && (
        <TestRunModal
          agent={selectedAgent}
          onClose={() => setShowTestRunModal(false)}
          isProUser={isProUser} // Pass user tier for simulated paywall
        />
      )}
    </div>
  );
}

// Placeholder for Agent Maker Modal
interface AgentMakerModalProps {
  onClose: () => void;
  onSave: (agent: Agent) => void;
}

function AgentMakerModal({ onClose, onSave }: AgentMakerModalProps) {
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [llmModel, setLlmModel] = useState('GPT-4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: Date.now().toString(), name, systemPrompt, llmModel });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Create New Agent
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        id="agent-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="system-prompt" className="block text-sm font-medium text-gray-700">
                        System Prompt
                      </label>
                      <textarea
                        id="system-prompt"
                        rows={3}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="llm-model" className="block text-sm font-medium text-gray-700">
                        LLM Model
                      </label>
                      <select
                        id="llm-model"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={llmModel}
                        onChange={(e) => setLlmModel(e.target.value)}
                      >
                        <option>GPT-4</option>
                        <option>Claude 3</option>
                        <option>Gemini Pro</option>
                      </select>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      >
                        Save Agent
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Test Run Modal Component
interface TestRunModalProps {
  agent: Agent;
  onClose: () => void;
  isProUser: boolean;
}

function TestRunModal({ agent, onClose, isProUser }: TestRunModalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTestRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    setError('');

    console.log(`Testing agent ${agent.name} with input: "${input}"`);
    // Simulate POST /api/agents/run_test/{agent_id}
    setTimeout(() => {
      setLoading(false);
      // Simulate token limit exceeded for non-pro users or randomly
      if (!isProUser && Math.random() < 0.5) { // 50% chance of error for free users
        setError('Error: TOKEN_LIMIT_EXCEEDED. Please upgrade to Pro for more test runs.');
        // In a real app, this would be a 403 Forbidden from backend
      } else {
        setOutput(`Simulated output for "${input}" using ${agent.name} (${agent.llmModel}).`);
      }
    }, 1500);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Test Agent: {agent.name}
                </h3>
                <p className="text-sm text-gray-500">System Prompt: {agent.systemPrompt}</p>
                <div className="mt-4">
                  <form onSubmit={handleTestRun}>
                    <div className="mb-4">
                      <label htmlFor="test-input" className="block text-sm font-medium text-gray-700">
                        Input
                      </label>
                      <textarea
                        id="test-input"
                        rows={3}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                      >
                        {loading ? 'Running Test...' : 'Run Test'}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                  {output && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700">Output:</h4>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{output}</p>
                    </div>
                  )}
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agents;
