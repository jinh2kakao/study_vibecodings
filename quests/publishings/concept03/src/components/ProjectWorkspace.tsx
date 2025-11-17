import React from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';

function ProjectWorkspace() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Project: {projectId}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <NavLink
                to={`/project/${projectId}/agents`}
                className={({ isActive }) =>
                  isActive
                    ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                }
              >
                Agents
              </NavLink>
              <NavLink
                to={`/project/${projectId}/orchestra`}
                className={({ isActive }) =>
                  isActive
                    ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                }
              >
                Orchestra
              </NavLink>
              <NavLink
                to={`/project/${projectId}/outputs`}
                className={({ isActive }) =>
                  isActive
                    ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                }
              >
                Outputs
              </NavLink>
            </nav>
          </div>
          <div className="py-6">
            <Outlet /> {/* This is where the nested route components will render */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectWorkspace;
