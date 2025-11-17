import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PaywallModal from './PaywallModal';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Input Node' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Agent Node' } },
];
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

function Orchestra() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isProUser, setIsProUser] = useState(true); // Simulate user tier: set to true for Pro, false for Free
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false); // State for execution loading
  const [jobId, setJobId] = useState<string | null>(null); // State to store job_id for polling
  const { getNodes, getEdges } = useReactFlow(); // Hook to get current nodes and edges

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (reactFlowInstance && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode: Node = {
          id: `dndnode_${Date.now()}`,
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes],
  );

  const handleOrchestraClick = () => {
    if (!isProUser) {
      setShowPaywallModal(true);
    }
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSaveWorkflow = () => {
    if (!isProUser) {
      alert('Upgrade to Pro to save workflows!');
      setShowPaywallModal(true);
      return;
    }

    const flow = {
      nodes: getNodes(),
      edges: getEdges(),
    };
    const flowDefinitionJson = JSON.stringify(flow);
    console.log('Saving workflow:', flowDefinitionJson);

    // Simulate POST /api/workflows/{project_id}
    setTimeout(() => {
      // Simulate success
      alert('Workflow saved successfully!');
      // Simulate 403 Forbidden if not Pro (though we already checked)
      // if (!isProUser) {
      //   console.error('Error: 403 Forbidden - Not a Pro user.');
      // }
    }, 1000);
  };

  const handleExecuteWorkflow = () => {
    if (!isProUser) {
      alert('Upgrade to Pro to execute workflows!');
      setShowPaywallModal(true);
      return;
    }

    setIsExecuting(true);
    console.log('Executing workflow...');
    // Simulate POST /api/jobs/execute/{workflow_id}
    setTimeout(() => {
      setIsExecuting(false);
      const simulatedJobId = `job_${Date.now()}`;
      setJobId(simulatedJobId); // Store job_id for polling
      alert(`Workflow execution started! Job ID: ${simulatedJobId}. Checking status...`);
    }, 2000); // Simulate async processing time
  };

  // Polling for job status
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;

    if (jobId) {
      pollingInterval = setInterval(() => {
        console.log(`Polling status for Job ID: ${jobId}`);
        // Simulate GET /api/jobs/status/{job_id}
        const randomStatus = Math.random();
        let status: 'pending' | 'completed' | 'failed';

        if (randomStatus < 0.6) {
          status = 'pending';
        } else if (randomStatus < 0.9) {
          status = 'completed';
        } else {
          status = 'failed';
        }

        if (status === 'completed' || status === 'failed') {
          clearInterval(pollingInterval);
          alert(`Job ${jobId} ${status}!`);
          setJobId(null); // Reset job ID
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [jobId]);

  return (
    <div className="flex h-full">
      {/* Sidebar for Agents (Drag and Drop) */}
      {isProUser && (
        <aside className="w-64 bg-gray-50 p-4 border-r border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Agents Library</h3>
          <div
            className="dndnode bg-blue-500 text-white p-2 rounded-md mb-2 cursor-grab"
            onDragStart={(event) => onDragStart(event, 'default')}
            draggable
          >
            Default Agent
          </div>
          <div
            className="dndnode bg-green-500 text-white p-2 rounded-md mb-2 cursor-grab"
            onDragStart={(event) => onDragStart(event, 'output')}
            draggable
          >
            Output Agent
          </div>
          {/* More agents can be added here */}
        </aside>
      )}

      <div className="flex-grow h-screen" ref={reactFlowWrapper}>
        <div className="p-4 bg-white shadow rounded-lg h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Orchestra Canvas</h2>
            <div className="flex items-center space-x-2">
              {!isProUser && (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Pro
                </span>
              )}
              {isProUser && (
                <>
                  <button
                    onClick={handleSaveWorkflow}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Workflow
                  </button>
                  <button
                    onClick={handleExecuteWorkflow}
                    disabled={isExecuting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isExecuting ? 'Executing...' : 'Execute Workflow'}
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="mt-2 text-gray-600">Drag and drop agents to build your workflow.</p>

          {!isProUser ? (
            <div
              className="relative border-4 border-dashed border-gray-200 rounded-lg h-full flex items-center justify-center text-gray-400 text-lg mt-4 cursor-not-allowed"
              onClick={handleOrchestraClick}
              title="Pro Plan 전용 기능입니다..." // Tooltip for Free users
            >
              <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center">
                <span className="text-gray-600 text-xl font-semibold">Upgrade to Pro to access Orchestra</span>
              </div>
              Orchestra canvas (Pro-only)
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          )}

          {showPaywallModal && <PaywallModal onClose={() => setShowPaywallModal(false)} />}
        </div>
      </div>
    </div>
  );
}

export default Orchestra;
