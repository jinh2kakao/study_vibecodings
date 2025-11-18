// concept03/layout.js

document.addEventListener('DOMContentLoaded', () => {
    // (IA 1.3) QA 토글 로직
    const currentTier = localStorage.getItem('mock_tier') || 'Free';
    const qaToggle = document.getElementById('qa-tier-toggle');
    const qaLabel = document.getElementById('qa-tier-label');

    if (qaToggle && qaLabel) {
        qaToggle.checked = (currentTier === 'Pro');
        qaLabel.textContent = currentTier;

        qaToggle.addEventListener('change', () => {
            const newTier = qaToggle.checked ? 'Pro' : 'Free';
            localStorage.setItem('mock_tier', newTier);
            location.reload();
        });
    }

    // (IA 1.2) 알림 드롭다운 초기화
    const notificationDropdown = document.getElementById('notificationDropdown');
    if (notificationDropdown) {
        // BS5 드롭다운 인스턴스화
        new bootstrap.Dropdown(notificationDropdown);
    }
});