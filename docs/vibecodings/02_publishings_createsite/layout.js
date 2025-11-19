/*
 * Layout.js
 * Global UI logic for AI Novel Maker
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Sidebar Toggle (for potential mobile view) ---
    // Example: const sidebar = document.querySelector('.dark-sidebar');
    // const toggler = document.querySelector('#sidebar-toggler');
    // if(sidebar && toggler) {
    //     toggler.addEventListener('click', () => {
    //         sidebar.classList.toggle('collapsed');
    //         document.querySelector('.main-content').classList.toggle('collapsed');
    //     });
    // }

    // --- QA Mode Toggle ---
    const qaModeSwitch = document.querySelector('#qaModeSwitch');
    if (qaModeSwitch) {
        qaModeSwitch.addEventListener('change', (event) => {
            if (event.target.checked) {
                console.log('QA Mode Activated');
                // Add any visual indicators for QA mode
                document.body.style.border = '3px solid red';
            } else {
                console.log('QA Mode Deactivated');
                document.body.style.border = 'none';
            }
        });
    }
    
    // --- Active Menu Item ---
    // The active menu item is set by adding the 'active' class
    // directly in the HTML of each page. This script confirms it.
    const activeLink = document.querySelector('.sidebar-item.active');
    if (activeLink) {
        console.log(`Active page: ${activeLink.querySelector('.sidebar-link span').textContent}`);
    }

    // --- Notifications Dropdown (Example) ---
    // Add logic for fetching and displaying notifications if the component exists.

    console.log('layout.js loaded and initialized.');
});
