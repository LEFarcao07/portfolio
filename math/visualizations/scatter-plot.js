let scatterChart;

function parseInput(input) {
    return input.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
}

function updateChart() {
    const xInput = document.getElementById('x-values').value;
    const yInput = document.getElementById('y-values').value;
    
    const xValues = parseInput(xInput);
    const yValues = parseInput(yInput);
    
    if (xValues.length === 0 || yValues.length === 0 || xValues.length !== yValues.length) {
        alert('Masukkan data yang valid untuk X dan Y dengan jumlah yang sama');
        return;
    }
    
    const ctx = document.getElementById('scatterChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (scatterChart) {
        scatterChart.destroy();
    }
    
    scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Data Points',
                data: xValues.map((x, i) => ({x, y: yValues[i]})),
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Nilai X',
                        color: '#6B7280'
                    },
                    ticks: {
                        color: '#6B7280'
                    },
                    grid: {
                        color: '#E5E7EB'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nilai Y',
                        color: '#6B7280'
                    },
                    ticks: {
                        color: '#6B7280'
                    },
                    grid: {
                        color: '#E5E7EB'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#6B7280'
                    }
                }
            }
        }
    });
}

// Initialize chart on page load
document.addEventListener('DOMContentLoaded', updateChart);