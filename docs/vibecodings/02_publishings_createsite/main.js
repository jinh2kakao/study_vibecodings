// Custom JavaScript for AI Novel Maker
// Add interactivity here, e.g., for modals, dynamic content, etc.
console.log("AI Novel Maker script loaded.");

document.addEventListener('DOMContentLoaded', function () {
    const artifactsList = document.getElementById('artifacts-list');
    const contentViewer = document.getElementById('content-viewer');

    if (artifactsList && contentViewer) {
        const artifactLinks = artifactsList.querySelectorAll('.list-group-item-action');
        const contentPanes = contentViewer.querySelectorAll('.content-pane');

        artifactsList.addEventListener('click', function (e) {
            e.preventDefault();
            const targetLink = e.target.closest('.list-group-item-action');

            if (!targetLink) return;

            // Update active state for links
            artifactLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');

            // Show/hide content panes
            const targetId = targetLink.getAttribute('data-target');
            contentPanes.forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.remove('d-none');
                } else {
                    pane.classList.add('d-none');
                }
            });
        });
    }
});
