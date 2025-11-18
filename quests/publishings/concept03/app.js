document.addEventListener('DOMContentLoaded', () => {
    // Handle "Create New Project" button click
    const createNewProjectBtn = document.getElementById('create-new-project-btn');
    if (createNewProjectBtn) {
        createNewProjectBtn.addEventListener('click', () => {
            // Simulate API call to POST /api/projects
            console.log('Simulating API call: POST /api/projects');
            // In a real app, you'd make a fetch request here.
            // For now, we'll simulate success and redirect.
            setTimeout(() => {
                const newProjectId = 'proj_' + Date.now(); // Generate a unique ID
                alert('새 프로젝트가 생성되었습니다! ID: ' + newProjectId);
                window.location.href = `orchestra.html?project_id=${newProjectId}`;
            }, 500); // Simulate network latency
        });
    }

    // Handle Project Card clicks
    const projectCardLinks = document.querySelectorAll('.project-card-link');
    projectCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation
            const projectId = link.dataset.projectId;
            if (projectId) {
                console.log(`Navigating to project workspace for ID: ${projectId}`);
                window.location.href = `orchestra.html?project_id=${projectId}`;
            } else {
                console.warn('Project ID not found for clicked card.');
                // Fallback or error handling
                window.location.href = 'orchestra.html'; // Navigate to a generic workspace
            }
        });
    });

    // Simple tab switching logic for settings page (re-added for settings.html)
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsPanes = document.querySelectorAll('.settings-pane');

    if (settingsNavItems.length > 0 && settingsPanes.length > 0) {
        settingsNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Deactivate all
                settingsNavItems.forEach(i => i.classList.remove('active'));
                settingsPanes.forEach(p => p.classList.remove('active'));

                // Activate clicked
                const targetId = item.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                
                item.classList.add('active');
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});