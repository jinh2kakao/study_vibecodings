/*
 * admin.js
 * Logics for the admin dashboard, including chart initialization.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Chart.js Example: Token Usage
    const tokenUsageCtx = document.getElementById('tokenUsageChart');
    if (tokenUsageCtx) {
        new Chart(tokenUsageCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Pro Users',
                    data: [120, 180, 150, 210, 200, 250, 230],
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(155, 89, 182, 1)'
                }, {
                    label: 'Free Users',
                    data: [80, 90, 85, 100, 110, 105, 95],
                    backgroundColor: 'rgba(108, 117, 125, 0.1)',
                    borderColor: 'rgba(108, 117, 125, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(108, 117, 125, 1)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chart.js Example: Signups
    const signupsCtx = document.getElementById('signupsChart');
    if (signupsCtx) {
        new Chart(signupsCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Signups',
                    data: [50, 75, 120, 90, 150, 130],
                    backgroundColor: 'rgba(155, 89, 182, 0.7)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 1
                }, {
                    label: 'Conversions to Pro',
                    data: [5, 10, 15, 12, 20, 25],
                    backgroundColor: 'rgba(22, 163, 74, 0.7)',
                    borderColor: 'rgba(22, 163, 74, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    

    // --- Simple-DataTables Example: Users Table ---
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        new simpleDatatables.DataTable(usersTable);
    }
    

    // --- Simple-DataTables Example: Job Logs Table ---
    const jobLogsTable = document.getElementById('jobLogsTable');
    if (jobLogsTable) {
        new simpleDatatables.DataTable(jobLogsTable);
    }

    console.log('admin.js loaded and charts initialized.');
});
