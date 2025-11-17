import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface JobOutput {
  id: string;
  workflowId: string;
  generatedTextContent: string;
  timestamp: string;
}

function Outputs() {
  const { projectId } = useParams<{ projectId: string }>();
  const [outputs, setOutputs] = useState<JobOutput[]>([]);

  useEffect(() => {
    // Simulate fetching outputs from an API
    console.log(`Fetching outputs for project ${projectId} from GET /api/outputs?project_id=${projectId}...`);
    setTimeout(() => {
      setOutputs([
        {
          id: 'output1',
          workflowId: 'workflow_abc',
          generatedTextContent: 'Chapter 1: The ancient prophecy spoke of a hero...',
          timestamp: '2023-11-17T10:00:00Z',
        },
        {
          id: 'output2',
          workflowId: 'workflow_xyz',
          generatedTextContent: 'Character Description: Elara, a nimble elf with a mysterious past.',
          timestamp: '2023-11-17T11:30:00Z',
        },
      ]);
    }, 500);
  }, [projectId]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Project Outputs</h2>
      <p className="mt-2 text-gray-600">Generated content from your workflows.</p>

      {outputs.length === 0 ? (
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-400 text-lg mt-4">
          No outputs generated yet. Run a workflow in the Orchestra tab to see results.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {outputs.map((output) => (
            <div key={output.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Output from Workflow: {output.workflowId}</h3>
              <p className="text-sm text-gray-500">Generated on: {new Date(output.timestamp).toLocaleString()}</p>
              <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md">
                <p className="text-gray-800 whitespace-pre-wrap">{output.generatedTextContent}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Outputs;
