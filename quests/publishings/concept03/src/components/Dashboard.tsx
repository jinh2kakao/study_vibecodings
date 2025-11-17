import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  lastModified: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  useEffect(() => {
    // Simulate fetching projects from an API
    const fetchProjects = () => {
      console.log('Fetching projects from GET /api/projects...');
      setTimeout(() => {
        setProjects([
          { id: '1', title: 'My First Novel', lastModified: '2023-10-26' },
          { id: '2', title: 'Space Opera Saga', lastModified: '2023-11-15' },
          { id: '3', title: 'Fantasy World Builder', lastModified: '2023-09-01' },
        ]);
      }, 500);
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}/agents`);
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new project with title:', newProjectTitle);
    // Simulate POST /api/projects
    setTimeout(() => {
      const newProject: Project = {
        id: String(projects.length + 1),
        title: newProjectTitle,
        lastModified: new Date().toISOString().slice(0, 10),
      };
      setProjects([...projects, newProject]);
      setNewProjectTitle('');
      setShowCreateModal(false);
      // Optionally navigate to the new project's workspace
      navigate(`/project/${newProject.id}/agents`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + New Novel Project
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {projects.length === 0 ? (
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-400 text-lg">
                No projects yet. Click "+ New Novel Project" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-gray-500">
                        Last Modified: {project.lastModified}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create New Project Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Create New Project
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleCreateNewProject}>
                        <label htmlFor="project-title" className="block text-sm font-medium text-gray-700">
                          Project Title
                        </label>
                        <input
                          type="text"
                          name="project-title"
                          id="project-title"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g., The Last Dragon"
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                          required
                        />
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                          >
                            Create
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
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
      )}
    </div>
  );
}

export default Dashboard;
