document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');

    if (projectId) {
        console.log(`Orchestra Canvas loaded for Project ID: ${projectId}`);
        // In a real application, you would fetch project-specific data here
        // e.g., fetch(`/api/projects/${projectId}/workflow`).
        // For now, we'll update the title to reflect the project ID.
        const projectTitleElement = document.querySelector('.page-title-header h1');
        if (projectTitleElement) {
            projectTitleElement.textContent = `Project: ${projectId}`;
        }
    } else {
        console.warn('No Project ID found in URL. Loading generic Orchestra Canvas.');
        const projectTitleElement = document.querySelector('.page-title-header h1');
        if (projectTitleElement) {
            projectTitleElement.textContent = 'New Project Workflow';
        }
    }

    // Handle "Save Workflow" button click
    const saveWorkflowBtn = document.getElementById('save-workflow-btn');
    if (saveWorkflowBtn) {
        saveWorkflowBtn.addEventListener('click', () => {
            console.log(`Simulating API call: PUT /api/projects/${projectId} (Save Workflow)`);
            // Simulate API call
            setTimeout(() => {
                alert(`워크플로우가 저장되었습니다! 프로젝트 ID: ${projectId}`);
            }, 500);
        });
    }

    // Handle "Run Workflow" button click
    const runWorkflowBtn = document.getElementById('run-workflow-btn');
    if (runWorkflowBtn) {
        runWorkflowBtn.addEventListener('click', () => {
            console.log(`Simulating API call: POST /api/jobs/execute/${projectId} (Run Workflow)`);
            alert(`워크플로우 실행을 시작합니다! 프로젝트 ID: ${projectId}`);

            // Simulate API call and polling for results
            setTimeout(() => {
                console.log('Simulating job execution...');
                const jobId = 'job_' + Date.now();
                alert(`작업이 시작되었습니다. Job ID: ${jobId}. 결과 확인을 위해 폴링 시작.`);

                // Simulate polling for results (e.g., every 2 seconds)
                let pollCount = 0;
                const maxPolls = 5;
                const pollInterval = setInterval(() => {
                    pollCount++;
                    console.log(`Polling for results for Job ID: ${jobId} (Attempt ${pollCount}/${maxPolls})`);
                    // Simulate GET /api/outputs?job_id={id}
                    if (pollCount >= maxPolls) {
                        clearInterval(pollInterval);
                        alert(`작업 완료! Job ID: ${jobId}. 결과 페이지로 이동합니다.`);
                        window.location.href = `output-detail.html?job_id=${jobId}&project_id=${projectId}`;
                    }
                }, 2000);

            }, 1000);
        });
    }

    // Placeholder for drag and drop functionality (not fully implemented here)
    const agentCards = document.querySelectorAll('.agent-card');
    const canvasMain = document.querySelector('.canvas-main');

    agentCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.textContent);
            console.log('Dragging agent:', e.target.textContent);
        });
    });

    if (canvasMain) {
        canvasMain.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        canvasMain.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            console.log('Dropped agent:', data);
            // In a real app, you'd create a new node element here
            alert(`Agent "${data}" dropped on canvas!`);
        });
    }
});
