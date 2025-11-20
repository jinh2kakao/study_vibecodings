/*
 * Layout.js
 * Global UI logic for AI Novel Maker - PromptBase Style Refactor
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Bootstrap Tooltips Initialization ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Sidebar Logic ---
    const body = document.body;
    const sidebar = document.querySelector('.dark-sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggle'); // Desktop toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn'); // Mobile toggle
    const sidebarOverlay = document.createElement('div'); // Create overlay dynamically

    // Add overlay to DOM
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

    // 1. Desktop Collapse Toggle
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('sidebar-collapsed');
            // Save preference if needed (localStorage)
            const isCollapsed = body.classList.contains('sidebar-collapsed');
            localStorage.setItem('sidebar-collapsed', isCollapsed);
        });
    }

    // Restore state from localStorage
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        body.classList.add('sidebar-collapsed');
    }

    // 2. Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('sidebar-mobile-open');
        });
    }

    // 3. Close Mobile Menu on Overlay Click
    sidebarOverlay.addEventListener('click', () => {
        body.classList.remove('sidebar-mobile-open');
    });

    // 4. Close Mobile Menu on Link Click (Optional, for better UX)
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                body.classList.remove('sidebar-mobile-open');
            }
        });
    });

    // --- Active Menu Item Highlighting ---
    // Automatically highlight the current page in the sidebar based on URL
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.sidebar-item');

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });

    console.log('Layout.js initialized: Responsive Sidebar & PromptBase Style');
});
