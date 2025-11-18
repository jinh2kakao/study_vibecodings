// Global helper to check if Pro mode is active (either real Pro user or test mode)
window.getIsProMode = () => {
    // In a real app, 'currentUser.subscriptionTier' would come from a backend API
    const currentUser = {
        subscriptionTier: 'Free', // Default to Free for simulation
        agentCount: 0 // Default to 0 for simulation
    };
    const isTestProMode = localStorage.getItem('isTestProMode') === 'true';
    return currentUser.subscriptionTier === 'Pro' || isTestProMode;
};

// --- Simulated API for User API Keys (Req #2) ---
const USER_API_KEYS_STORAGE_KEY = 'userApiKeys';

const simulateFetchApiKeys = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const keys = JSON.parse(localStorage.getItem(USER_API_KEYS_STORAGE_KEY) || '[]');
            resolve(keys);
        }, 200);
    });
};

const simulateAddApiKey = (alias, key) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const keys = JSON.parse(localStorage.getItem(USER_API_KEYS_STORAGE_KEY) || '[]');
            const newKey = {
                id: 'key_' + Date.now(), // Simple unique ID
                alias: alias,
                encrypted_api_key: key // In real app, this would be encrypted
            };
            keys.push(newKey);
            localStorage.setItem(USER_API_KEYS_STORAGE_KEY, JSON.stringify(keys));
            resolve(newKey);
        }, 200);
    });
};

const simulateDeleteApiKey = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let keys = JSON.parse(localStorage.getItem(USER_API_KEYS_STORAGE_KEY) || '[]');
            keys = keys.filter(key => key.id !== id);
            localStorage.setItem(USER_API_KEYS_STORAGE_KEY, JSON.stringify(keys));
            resolve();
        }, 200);
    });
};

// --- End Simulated API ---

document.addEventListener('DOMContentLoaded', () => {
    // --- Onboarding Logic (Req #4) ---
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html' && hasCompletedOnboarding !== 'true') {
        window.location.href = 'onboarding.html';
        return; // Stop further execution on this page
    }

    const startOnboardingBtn = document.getElementById('start-onboarding-btn');
    if (startOnboardingBtn) {
        startOnboardingBtn.addEventListener('click', () => {
            localStorage.setItem('hasCompletedOnboarding', 'true');
            window.location.href = 'index.html';
        });
    }
    // --- End Onboarding Logic ---

    // --- Pro Mode Test Toggle Logic (Req #3) ---
    const proModeTestToggle = document.getElementById('pro-mode-test-toggle');
    if (proModeTestToggle) {
        // Load initial state from localStorage
        proModeTestToggle.checked = localStorage.getItem('isTestProMode') === 'true';

        // Save state on change
        proModeTestToggle.addEventListener('change', () => {
            localStorage.setItem('isTestProMode', proModeTestToggle.checked ? 'true' : 'false');
            console.log('Pro Mode (Test) is now:', proModeTestToggle.checked);
            // Optionally, reload page or re-evaluate UI elements that depend on pro mode
            // For this task, we'll rely on individual scripts to re-check getIsProMode()
        });
    }
    // --- End Pro Mode Test Toggle Logic ---

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

    // Simple tab switching logic for settings page
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsPanes = document.querySelectorAll('.settings-pane');
    const apiKeysNavItem = document.getElementById('api-keys-nav-item');
    const apiKeysPane = document.getElementById('api-keys-pane');
    const addApiKeyBtn = document.getElementById('add-api-key-btn');
    const apiKeyListDiv = document.querySelector('.api-key-list');


    // Function to render API keys
    const renderApiKeys = async () => {
        if (!apiKeyListDiv) return;
        const keys = await simulateFetchApiKeys();
        apiKeyListDiv.innerHTML = ''; // Clear existing list

        if (keys.length === 0) {
            apiKeyListDiv.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">등록된 API 키가 없습니다.</p>';
            return;
        }

        keys.forEach(key => {
            const keyItem = document.createElement('div');
            keyItem.className = 'api-key-item';
            keyItem.innerHTML = `
                <span class="key-alias">${key.alias}</span>
                <span class="masked-key">sk-********************${key.encrypted_api_key.slice(-3)}</span>
                <button class="btn btn-danger btn-small" data-key-id="${key.id}"><i class="fa-solid fa-trash"></i></button>
            `;
            apiKeyListDiv.appendChild(keyItem);
        });
    };

    if (settingsNavItems.length > 0 && settingsPanes.length > 0) {
        settingsNavItems.forEach(item => {
            item.addEventListener('click', async (e) => { // Made async to await renderApiKeys
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
                    if (targetId === 'api-keys-pane') {
                        await renderApiKeys(); // Render keys when API Keys pane is activated
                    }
                }
            });
        });

        // Check if URL hash points to API Keys pane on load
        if (window.location.hash === '#api-keys' && apiKeysNavItem && apiKeysPane) {
            // Simulate click on API Keys nav item to activate it and render keys
            apiKeysNavItem.click();
        } else if (!window.location.hash && settingsNavItems[0]) {
            // If no hash, activate the first item by default
            settingsNavItems[0].click();
        }
    }

    // Handle "Add New API Key" button click
    if (addApiKeyBtn) {
        addApiKeyBtn.addEventListener('click', async () => {
            const alias = prompt('API 키의 별칭을 입력하세요 (예: My OpenAI Key):');
            if (!alias) return;
            const key = prompt('API 키 값을 입력하세요:');
            if (!key) return;

            await simulateAddApiKey(alias, key);
            await renderApiKeys();
            alert('API 키가 추가되었습니다.');
        });
    }

    // Handle Delete API Key button click (using event delegation)
    if (apiKeyListDiv) {
        apiKeyListDiv.addEventListener('click', async (e) => {
            const deleteButton = e.target.closest('.btn-danger.btn-small');
            if (deleteButton) {
                const keyId = deleteButton.dataset.keyId;
                if (confirm('정말로 이 API 키를 삭제하시겠습니까?')) {
                    await simulateDeleteApiKey(keyId);
                    await renderApiKeys();
                    alert('API 키가 삭제되었습니다.');
                }
            }
        });
    }

    // Handle "Upgrade to Pro" button click in settings
    const upgradeToProBtn = document.getElementById('upgrade-to-pro-btn');
    if (upgradeToProBtn) {
        upgradeToProBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Simulating redirect to Stripe checkout for Pro upgrade.');
            alert('Stripe 체크아웃 페이지로 이동합니다.');
            window.location.href = 'pro-plan.html'; // Redirect to pro-plan page for now
        });
    }

    // Handle "Upgrade" button click in Billing pane
    const billingUpgradeBtn = document.getElementById('billing-upgrade-btn');
    if (billingUpgradeBtn) {
        billingUpgradeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Simulating redirect to Stripe checkout for Billing upgrade.');
            alert('Stripe 체크아웃 페이지로 이동합니다.');
            window.location.href = 'pro-plan.html'; // Redirect to pro-plan page for now
        });
    }

    // Handle "Delete Account" button click
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                console.log('Simulating account deletion...');
                alert('계정이 삭제되었습니다.');
                // In a real app, you'd make an API call and then redirect to login/signup
                window.location.href = 'login.html';
            }
        });
    }
});
