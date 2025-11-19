// concept03/orchestra.js
document.addEventListener('DOMContentLoaded', () => {
    // v2.1: 툴바 버튼이 .top-header에 있음
    const btnSave = document.getElementById('btn-save-workflow');
    const btnRun = document.getElementById('btn-run-workflow');

    const orchestraPane = document.getElementById('orchestra-pane');
    if (!orchestraPane) return; // 오케스트라 탭이 아니면 중단

    // 캔버스 UI 요소
    const canvasMain = document.getElementById('orchestra-canvas');
    const agentSidebar = orchestraPane.querySelector('.agent-library');

    let canvasState = 'saved'; // 'saved', 'modified', 'running'
    let nodeCount = 4; // Max Case: 4개 노드가 이미 있음

    function updateUIbyState() {
        if (!btnSave || !btnRun || !canvasMain) return; 

        // style.css의 .btn:disabled 스타일이 적용됨
        if (canvasState === 'modified') {
            btnSave.disabled = false;
            btnRun.disabled = true; 
            btnRun.innerHTML = '<i class="fa-solid fa-play"></i> Run Workflow';
            // canvasMain.classList.remove('read-only'); // (추가 기능)
        }
        else if (canvasState === 'running') {
            btnSave.disabled = true;
            btnRun.disabled = true;
            btnRun.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running...';
            // canvasMain.classList.add('read-only'); // (추가 기능)
        }
        else { // 'saved'
            btnSave.disabled = true;
            btnRun.disabled = false;
            btnRun.innerHTML = '<i class="fa-solid fa-play"></i> Run Workflow';
            // canvasMain.classList.remove('read-only');
        }
    }

    btnSave.addEventListener('click', () => {
        btnSave.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        btnSave.disabled = true;
        setTimeout(() => { 
            canvasState = 'saved';
            updateUIbyState();
        }, 800);
    });

    btnRun.addEventListener('click', () => {
        canvasState = 'running';
        updateUIbyState();
        setTimeout(() => {
            canvasState = 'saved';
            updateUIbyState();
            // v1.2 알림 센터 시뮬레이션 (alert 대신)
            console.log("워크플로우 실행 완료! (v1.2 🔔 알림 센터에 '완료' 알림이 표시됩니다.)");
        }, 3000); 
    });

    // '드래그' 시뮬레이션
    agentSidebar.addEventListener('click', (e) => {
        if (canvasState === 'running') return; 
        const agentCard = e.target.closest('.agent-card');
        if (agentCard) {
            alert(agentCard.dataset.agentName + " 노드가 캔버스에 추가되었습니다. (시뮬레이션)");
            nodeCount++;
            canvasState = 'modified'; 
            updateUIbyState();
        }
    });
    updateUIbyState(); // 초기 상태 설정
});