document.addEventListener('DOMContentLoaded', function () {

    // --- State ---
    let isPro = false;

    // --- DOM Elements ---
    const proUserSwitch = document.getElementById('simulateProUser');
    const orchestraTab = document.getElementById('orchestra-tab');
    const agentsTab = document.getElementById('agents-tab');
    const createNewAgentBtn = document.getElementById('createNewAgentBtn');
    const paywallModalEl = document.getElementById('paywallModal');
    
    // --- Bootstrap Instances ---
    const paywallModal = new bootstrap.Modal(paywallModalEl);
    const orchestraTabInstance = new bootstrap.Tab(orchestraTab);
    const agentsTabInstance = new bootstrap.Tab(agentsTab);

    // --- Functions ---

    /**
     * Updates the UI based on the isPro state.
     */
    function updateUI() {
        const proBadge = orchestraTab.querySelector('.pro-badge');

        if (isPro) {
            // Pro User
            orchestraTab.classList.remove('disabled-style');
            proBadge.style.display = 'none';
        } else {
            // Free User
            orchestraTab.classList.add('disabled-style');
            proBadge.style.display = 'inline-block';

            // If user switches to free while on the orchestra tab, move them back to agents
            if (orchestraTab.classList.contains('active')) {
                agentsTabInstance.show();
            }
        }
    }

    // --- Event Listeners ---

    /**
     * Handle Pro User Simulation Toggle
     */
    proUserSwitch.addEventListener('change', function () {
        isPro = this.checked;
        updateUI();
    });

    /**
     * Handle Orchestra Tab Click
     * For free users, this prevents tab switching and shows the paywall.
     */
    orchestraTab.addEventListener('click', function (event) {
        if (!isPro) {
            event.preventDefault();
            event.stopPropagation();
            paywallModal.show();
        }
    });

    /**
     * Handle Create New Agent Button Click
     * For free users, shows the paywall. For pro users, shows an alert.
     */
    createNewAgentBtn.addEventListener('click', function () {
        if (isPro) {
            alert('에이전트 메이커 UI 열림 (Pro)');
        } else {
            paywallModal.show();
        }
    });

    // --- Initial Setup ---
    updateUI();

});
