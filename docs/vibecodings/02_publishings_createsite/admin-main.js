window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
        });
    }

    // --- Chart.js Setup ---

    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // -- Area Chart Example
    var ctxArea = document.getElementById("tokenUsageChart");
    if (ctxArea) {
        var myLineChart = new Chart(ctxArea, {
            type: 'line',
            data: {
                labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
                datasets: [{
                    label: "Pro",
                    lineTension: 0.3,
                    backgroundColor: "rgba(0, 97, 242, 0.2)",
                    borderColor: "rgba(0, 97, 242, 1)",
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(0, 97, 242, 1)",
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(0, 97, 242, 1)",
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
                },
                {
                    label: "Free",
                    lineTension: 0.3,
                    backgroundColor: "rgba(244, 161, 0, 0.2)",
                    borderColor: "rgba(244, 161, 0, 1)",
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(244, 161, 0, 1)",
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(244, 161, 0, 1)",
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: [5000, 15000, 12000, 9000, 10000, 14000, 15000, 17000, 13000, 12000, 16000, 15500, 19000],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 40000,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, .125)",
                        }
                    }],
                },
                legend: {
                    display: true
                }
            }
        });
    }


    // -- Bar Chart Example
    var ctxBar = document.getElementById("signupsChart");
    if (ctxBar) {
        var myLineChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: "Signups",
                    backgroundColor: "rgba(0, 97, 242, 1)",
                    borderColor: "rgba(0, 97, 242, 1)",
                    data: [4215, 5312, 6251, 7841, 9821, 14984],
                },
                {
                    label: "Conversions",
                    backgroundColor: "rgba(0, 172, 105, 1)",
                    borderColor: "rgba(0, 172, 105, 1)",
                    data: [421, 531, 625, 784, 982, 1498],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 6
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 15000,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                },
                legend: {
                    display: true
                }
            }
        });
    }

    // --- Simple-DataTables Setup ---
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }

});
