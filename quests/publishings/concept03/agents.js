document.addEventListener('DOMContentLoaded', () => {
    const createNewAgentBtn = document.getElementById('create-new-agent-btn');
    const agentLimitMessage = document.getElementById('agent-creation-limit-message');
    const agentCardLinks = document.querySelectorAll('.agent-card-link');

    // Simulate user data (replace with actual user data in a real app)
    const currentUser = {
        subscriptionTier: 'Free', // 'Free' or 'Pro'
        agentCount: 1 // Number of agents the user currently has (for Free tier limit)
    };

    // Determine if user is Pro (either real Pro or test mode)
    const isProUser = window.getIsProMode();

    // TDD v1.1: Logic for "+ 새 에이전트 생성" button
    if (createNewAgentBtn) {
        if (!isProUser && currentUser.agentCount >= 1) { // If not Pro and already has 1 or more agents
            createNewAgentBtn.disabled = true;
            if (agentLimitMessage) {
                agentLimitMessage.style.display = 'flex'; // Show the message
            }
        } else {
            createNewAgentBtn.addEventListener('click', () => {
                console.log('Navigating to agent creation page.');
                window.location.href = 'agent-edit.html?id=new';
            });
        }
    }

    // Handle Agent Card clicks
    agentCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation
            const agentId = link.href.split('id=')[1]; // Extract ID from href
            if (agentId) {
                console.log(`Navigating to agent edit page for ID: ${agentId}`);
                window.location.href = `agent-edit.html?id=${agentId}`;
            } else {
                console.warn('Agent ID not found for clicked card.');
                // Fallback or error handling
                window.location.href = 'agents.html'; // Navigate back to agent list
            }
        });
    });
});

