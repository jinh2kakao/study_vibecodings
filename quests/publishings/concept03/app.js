document.addEventListener('DOMContentLoaded', () => {
    // --- Global State Simulation ---
    const MOCK_STATE = {
        subscription_tier: 'Free', // 'Free' 또는 'Pro'
        agent_count: 1             // 현재 생성된 에이전트 수
    };

    // --- Helper Function to get current page ---
    const getCurrentPage = () => {
        const path = window.location.pathname;
        if (path.includes('login.html')) return 'login';
        if (path.includes('dashboard.html')) return 'dashboard';
        if (path.includes('workspace.html')) return 'workspace';
        return null;
    };

    const currentPage = getCurrentPage();

    // --- (A) Paywall Modal HTML Dynamic Insertion (for workspace.html) ---
    if (currentPage === 'workspace') {
        const paywallModalHTML = `
            <div class="modal fade" id="paywallModal" tabindex="-1" aria-labelledby="paywallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paywallModalLabel">Pro 플랜으로 업그레이드하세요</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>AI 에이전트팀을 무제한으로 만들고 '오케스트라 캔버스'로 작업을 자동화하세요!</p>
                            <ul class="list-unstyled mt-3">
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02L13.42 6.022a.75.75 0 0 0-.02-1.08"/></svg>무제한 AI 에이전트 생성</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02L13.42 6.022a.75.75 0 0 0-.02-1.08"/></svg>AI 워크플로우 자동화 (오케스트라 캔버스)</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02L13.42 6.022a.75.75 0 0 0-.02-1.08"/></svg>대용량 토큰 사용</li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            <button type="button" class="btn btn-primary">지금 업그레이드</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', paywallModalHTML);
    }

    // --- Page Specific Logic ---

    // Login Page Logic
    if (currentPage === 'login') {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate login success and redirect
                window.location.href = 'dashboard.html';
            });
        }
    }

    // Dashboard Page Logic
    if (currentPage === 'dashboard') {
        // (D) Dashboard.html Modal Logic (IA 2.2)
        const newProjectBtn = document.getElementById('new-project-btn');
        const newProjectModalEl = document.getElementById('newProjectModal');
        if (newProjectBtn && newProjectModalEl) {
            const newProjectModal = new bootstrap.Modal(newProjectModalEl);
            newProjectBtn.addEventListener('click', () => {
                newProjectModal.show();
            });
        }

        // Project Card Click Logic
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Ensure clicking the link inside the card works, but card itself also navigates
                if (!e.target.closest('a')) {
                    window.location.href = 'workspace.html';
                }
            });
        });
    }

    // Workspace Page Logic
    if (currentPage === 'workspace') {
        const orchestraTab = document.getElementById('orchestra-tab');
        const newAgentBtn = document.getElementById('new-agent-btn');
        const paywallModalEl = document.getElementById('paywallModal');
        const paywallModal = new bootstrap.Modal(paywallModalEl);

        // (B) workspace.html 탭 로직 (IA 3.2 - Pro 전용 기능)
        if (MOCK_STATE.subscription_tier === 'Free') {
            if (orchestraTab) {
                orchestraTab.classList.add('disabled');
                orchestraTab.setAttribute('aria-disabled', 'true');
                // Add Pro badge dynamically if not already there
                if (!orchestraTab.querySelector('.badge')) {
                    const proBadge = document.createElement('span');
                    proBadge.classList.add('badge', 'bg-warning', 'text-dark', 'ms-1');
                    proBadge.textContent = 'Pro';
                    orchestraTab.appendChild(proBadge);
                }

                // Add click event listener to prevent tab change and show paywall
                orchestraTab.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent Bootstrap's tab activation
                    e.stopPropagation(); // Stop event from bubbling up
                    paywallModal.show();
                });
            }
        }

        // (C) workspace.html 새 에이전트 생성 로직 (IA 3.1.1 - 1개 제한)
        if (MOCK_STATE.subscription_tier === 'Free' && MOCK_STATE.agent_count >= 1) {
            if (newAgentBtn) {
                newAgentBtn.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent any default button action
                    paywallModal.show();
                });
            }
        }
    }
});
