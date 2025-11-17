// concept03/app.js (v1.3 Update)

// (IA 1.3) MOCK_STATE가 localStorage를 기반으로 동적으로 설정됨
const MOCK_STATE = {
  subscription_tier: localStorage.getItem('mock_tier') || 'Free', // 'Free' 또는 'Pro'
  agent_count: (localStorage.getItem('mock_tier') || 'Free') === 'Pro' ? 10 : 0 // Pro면 에이전트가 많다고 가정, Free면 0
};

// (v1.2) Paywall Modal HTML (v1.1) - app.js 상단에 상수로 정의
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
                    <a href="pro-plan.html" class="btn btn-link text-decoration-none me-auto">자세히 보기</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary">지금 업그레이드</button>
                </div>
            </div>
        </div>
    </div>
`;


document.addEventListener('DOMContentLoaded', () => {
    // --- Helper Function to get current page ---
    const getCurrentPage = () => {
        const path = window.location.pathname;
        if (path.includes('join.html')) return 'signup'; // join.html is the signup page
        if (path.includes('login.html')) return 'login';
        if (path.includes('index.html')) return 'dashboard';
        if (path.includes('workspace.html')) return 'workspace';
        if (path.includes('settings.html')) return 'settings';
        if (path.includes('onboarding-step1.html')) return 'onboarding1';
        if (path.includes('onboarding-step2.html')) return 'onboarding2';
        return null;
    };

    const currentPage = getCurrentPage();

    // --- Page Specific Logic ---

    // Signup Page Logic (join.html)
    if (currentPage === 'signup') {
        const signupForm = document.getElementById('signup-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const signupBtn = document.getElementById('signup-btn');
        const emailFormatFeedback = document.getElementById('email-feedback-format');
        const emailApiFeedback = document.getElementById('email-feedback-api');
        const formAlert = document.getElementById('form-alert');

        let validationState = {
            email: false,
            passLength: false,
            passMatch: false
        };

        function showAlert(message, type) {
            formAlert.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }

        function validateForm() {
            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && emailRegex.test(emailInput.value)) {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                emailFormatFeedback.style.display = 'none';
                validationState.email = true;
            } else {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                emailFormatFeedback.style.display = 'block';
                validationState.email = false;
            }
            emailApiFeedback.textContent = '';
            emailApiFeedback.classList.remove('api-error');

            // Password Length Validation
            if (passwordInput.value && passwordInput.value.length >= 8) {
                passwordInput.classList.remove('is-invalid');
                passwordInput.classList.add('is-valid');
                validationState.passLength = true;
            } else {
                passwordInput.classList.remove('is-valid');
                passwordInput.classList.add('is-invalid');
                validationState.passLength = false;
            }

            // Password Match Validation
            if (passwordConfirmInput.value && passwordInput.value === passwordConfirmInput.value) {
                passwordConfirmInput.classList.remove('is-invalid');
                passwordConfirmInput.classList.add('is-valid');
                passwordConfirmInput.setCustomValidity('');
                validationState.passMatch = true;
            } else {
                passwordConfirmInput.classList.remove('is-valid');
                passwordConfirmInput.classList.add('is-invalid');
                passwordConfirmInput.setCustomValidity('비밀번호가 일치하지 않습니다.');
                validationState.passMatch = false;
            }

            signupBtn.disabled = !(validationState.email && validationState.passLength && validationState.passMatch);
        }

        function fakeApiSignup(email) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email === 'existing@example.com') {
                        reject({ status: 409, code: 'USER_ALREADY_EXISTS', message: '이미 사용 중인 이메일입니다.' });
                    } else {
                        resolve({ status: 201, token: 'fake-jwt-token-12345', user: { email: email, id: 'user-123' } });
                    }
                }, 1000);
            });
        }

        emailInput.addEventListener('keyup', validateForm);
        passwordInput.addEventListener('keyup', validateForm);
        passwordConfirmInput.addEventListener('keyup', validateForm);

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            formAlert.innerHTML = '';

            signupBtn.disabled = true;
            signupBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                가입 중...
            `;

            emailApiFeedback.textContent = '';
            emailApiFeedback.classList.remove('api-error');
            emailInput.classList.remove('is-invalid');

            try {
                const response = await fakeApiSignup(emailInput.value);

                showAlert(`가입 성공! (시뮬레이션된 토큰: ${response.token}). 3초 후 온보딩 페이지로 이동합니다.`, 'success');
                
                setTimeout(() => {
                    window.location.href = 'onboarding-step1.html'; // IA 1.0: Redirect to onboarding
                }, 3000);

            } catch (error) {
                if (error.status === 409) {
                    emailInput.classList.add('is-invalid');
                    emailApiFeedback.textContent = error.message;
                    emailApiFeedback.classList.add('api-error');
                    emailFormatFeedback.style.display = 'none';
                    showAlert(`회원가입 실패: ${error.message}`, 'danger');
                } else {
                    showAlert(`알 수 없는 오류가 발생했습니다: ${error.message || '서버 응답 없음'}`, 'danger');
                }
            } finally {
                signupBtn.innerHTML = '가입하기';
                validateForm();
            }
        });

        validateForm(); // Initial validation on page load
    }

    // Login Page Logic
    if (currentPage === 'login') {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate login success and redirect
                window.location.href = 'index.html'; // Redirect to dashboard
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
        // Ensure paywall modal HTML is in the DOM if not already
        if (!document.getElementById('paywallModal')) {
            document.body.insertAdjacentHTML('beforeend', paywallModalHTML);
        }

        const orchestraTab = document.getElementById('orchestra-tab');
        const newAgentBtn = document.getElementById('new-agent-btn'); // This button now opens templateLibraryModal
        const paywallModalEl = document.getElementById('paywallModal');
        const paywallModal = new bootstrap.Modal(paywallModalEl);
        const templateLibraryModalEl = document.getElementById('templateLibraryModal');
        const templateLibraryModal = new bootstrap.Modal(templateLibraryModalEl);

        // Elements for Orchestra and Outputs sample data
        const orchestraFreeView = document.getElementById('orchestra-free-view');
        const orchestraProView = document.getElementById('orchestra-pro-view');
        const outputsFreeView = document.getElementById('outputs-free-view');
        const outputsProView = document.getElementById('outputs-pro-view');

        // (B) workspace.html 탭 로직 (IA 3.2 - Pro 전용 기능)
        // This logic now applies to the orchestraTab, which is no longer the second tab.
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
            // Show free views, hide pro views
            if (orchestraFreeView) orchestraFreeView.classList.remove('d-none');
            if (orchestraProView) orchestraProView.classList.add('d-none');
            if (outputsFreeView) outputsFreeView.classList.remove('d-none');
            if (outputsProView) outputsProView.classList.add('d-none');

        } else if (MOCK_STATE.subscription_tier === 'Pro') {
            if (orchestraTab) {
                orchestraTab.classList.remove('disabled');
                orchestraTab.removeAttribute('aria-disabled');
                const proBadge = orchestraTab.querySelector('.badge');
                if (proBadge) proBadge.remove();
            }
            // Hide free views, show pro views
            if (orchestraFreeView) orchestraFreeView.classList.add('d-none');
            if (orchestraProView) orchestraProView.classList.remove('d-none');
            if (outputsFreeView) outputsFreeView.classList.add('d-none');
            if (outputsProView) outputsProView.classList.remove('d-none');
        }

        // IA 2.0: [+ 새 에이전트 생성] 클릭 시 템플릿 라이브러리 모달 열기
        if (newAgentBtn) {
            // newAgentBtn now triggers templateLibraryModal via data-bs-toggle,
            // so we only need to handle clicks on the templates inside the modal.
        }

        // IA 2.2: Template Library Modal Logic
        const createTemplateBtns = document.querySelectorAll('.create-template-btn');
        createTemplateBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateType = e.target.closest('.template-card').dataset.templateType;
                templateLibraryModal.hide(); // Hide template modal after selection

                if (templateType === 'basic') {
                    if (MOCK_STATE.subscription_tier === 'Free' && MOCK_STATE.agent_count >= 1) {
                        paywallModal.show(); // AC 4-A-6: Free user, already has 1 agent
                    } else {
                        alert('Basic 템플릿으로 에이전트 생성 (시뮬레이션)');
                        MOCK_STATE.agent_count++; // Simulate agent creation
                        // In a real app, this would navigate to agent editor or add to list
                    }
                } else if (templateType === 'pro') {
                    if (MOCK_STATE.subscription_tier === 'Free') {
                        paywallModal.show(); // AC 4-A-6: Pro 템플릿은 Free 유저에게 페이월
                    } else {
                        alert('Pro 템플릿으로 에이전트 생성 (시뮬레이션)');
                        MOCK_STATE.agent_count++; // Simulate agent creation
                    }
                } else if (templateType === 'blank') {
                    alert('빈 캔버스에서 에이전트 생성 (시뮬레이션)');
                    MOCK_STATE.agent_count++; // Simulate agent creation
                }
            });
        });
    }
});
