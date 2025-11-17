// concept03/orchestra.js

document.addEventListener('DOMContentLoaded', () => {
    const orchestraCanvas = document.getElementById('orchestra-canvas');
    const agentSidebar = document.querySelector('.agent-sidebar');
    const btnSaveWorkflow = document.getElementById('btn-save-workflow');
    const btnRunWorkflow = document.getElementById('btn-run-workflow');
    const canvasHint = document.getElementById('canvas-hint');

    let workflowState = 'saved'; // 'saved', 'modified', 'running'
    let nodeCount = 0;
    let activeNode = null; // To track the currently dragged node
    let offsetX, offsetY; // To store the offset for dragging

    // Function to update button states based on workflowState
    const updateButtonStates = () => {
        btnSaveWorkflow.disabled = true;
        btnRunWorkflow.disabled = true;
        btnRunWorkflow.innerHTML = `<i class="bi bi-play-fill"></i> 워크플로우 실행`;
        orchestraCanvas.classList.remove('read-only');

        switch (workflowState) {
            case 'saved':
                btnRunWorkflow.disabled = false;
                break;
            case 'modified':
                btnSaveWorkflow.disabled = false;
                btnRunWorkflow.disabled = false; // Allow running even if modified, but save is available
                break;
            case 'running':
                btnSaveWorkflow.disabled = true;
                btnRunWorkflow.disabled = true;
                btnRunWorkflow.innerHTML = `
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    실행 중...
                `;
                orchestraCanvas.classList.add('read-only');
                break;
        }
    };

    // Function to set workflow state
    const setWorkflowState = (newState) => {
        workflowState = newState;
        updateButtonStates();
    };

    // Initial button state update
    updateButtonStates();

    // IA 2.0 Process: Simulate dragging agent from sidebar to canvas
    agentSidebar.addEventListener('click', (e) => {
        const agentCard = e.target.closest('.agent-card');
        if (agentCard) {
            const agentName = agentCard.dataset.agentName;
            nodeCount++;
            const newNode = document.createElement('div');
            newNode.classList.add('node');
            newNode.id = `node-${nodeCount}`;
            newNode.style.left = `${Math.random() * (orchestraCanvas.offsetWidth - 250)}px`; // Random position
            newNode.style.top = `${Math.random() * (orchestraCanvas.offsetHeight - 100)}px`; // Random position
            newNode.innerHTML = `<h5><i class="bi bi-cpu-fill"></i> ${agentName}</h5>`; // Using bi-cpu-fill for generic agent icon
            orchestraCanvas.appendChild(newNode);

            // Hide hint text if nodes are added
            if (nodeCount > 0) {
                canvasHint.classList.add('d-none');
            }

            setWorkflowState('modified'); // Workflow is modified when a new node is added

            // Make node draggable
            newNode.addEventListener('mousedown', (e) => {
                if (orchestraCanvas.classList.contains('read-only')) return; // Prevent dragging when read-only
                activeNode = newNode;
                offsetX = e.clientX - newNode.getBoundingClientRect().left;
                offsetY = e.clientY - newNode.getBoundingClientRect().top;
                activeNode.style.cursor = 'grabbing';
                setWorkflowState('modified'); // Moving a node also modifies the workflow
            });
        }
    });

    // Dragging logic for nodes
    orchestraCanvas.addEventListener('mousemove', (e) => {
        if (!activeNode) return;

        e.preventDefault(); // Prevent default drag behavior

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Boundary checks
        newX = Math.max(0, Math.min(newX, orchestraCanvas.offsetWidth - activeNode.offsetWidth));
        newY = Math.max(0, Math.min(newY, orchestraCanvas.offsetHeight - activeNode.offsetHeight));

        activeNode.style.left = `${newX}px`;
        activeNode.style.top = `${newY}px`;
    });

    orchestraCanvas.addEventListener('mouseup', () => {
        if (activeNode) {
            activeNode.style.cursor = 'grab';
            activeNode = null;
        }
    });

    // IA 4.0 Scenarios: Button interactions
    btnSaveWorkflow.addEventListener('click', () => {
        if (btnSaveWorkflow.disabled) return;
        alert('워크플로우가 저장되었습니다!');
        setWorkflowState('saved');
    });

    btnRunWorkflow.addEventListener('click', () => {
        if (btnRunWorkflow.disabled) return;
        setWorkflowState('running');

        // IA 4.7: Add running state to all nodes
        document.querySelectorAll('.node').forEach(node => {
            node.classList.add('state-running');
        });

        setTimeout(() => {
            // IA 4.0 Scenarios: 'feedback' state after 3 seconds
            alert('워크플로우 실행이 완료되었습니다!');
            setWorkflowState('saved'); // Revert to saved after run

            // Remove running state from all nodes
            document.querySelectorAll('.node').forEach(node => {
                node.classList.remove('state-running');
            });
        }, 3000);
    });
});