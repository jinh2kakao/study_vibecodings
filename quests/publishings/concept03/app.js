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

    // Simple tab switching logic for settings page
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
