// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
  themeToggleDarkIcon.classList.add('hidden');
} else {
  themeToggleLightIcon.classList.add('hidden');
  themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
});

let regressionChart;

function parseInput(input) {
    return input.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
}

function calculateRegression(xValues, yValues) {
    const points = xValues.map((x, i) => [x, yValues[i]]);
    const result = regression.linear(points);
    
    return {
        slope: result.equation[0],
        intercept: result.equation[1],
        r2: result.r2,
        points: result.points
    };
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
    
    const regressionResult = calculateRegression(xValues, yValues);
    const resultElement = document.getElementById('regression-result');
    
    resultElement.innerHTML = `
        <p class="text-lg font-semibold">Persamaan Regresi: y = ${regressionResult.slope.toFixed(2)}x + ${regressionResult.intercept.toFixed(2)}</p>
        <p class="text-sm">Koefisien Determinasi (R²): ${regressionResult.r2.toFixed(4)}</p>
    `;
    
    const ctx = document.getElementById('regressionChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (regressionChart) {
        regressionChart.destroy();
    }
    
    // Prepare data for the regression line
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const regressionLine = [
        {x: minX, y: regressionResult.slope * minX + regressionResult.intercept},
        {x: maxX, y: regressionResult.slope * maxX + regressionResult.intercept}
    ];
    
    regressionChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
                    data: xValues.map((x, i) => ({x, y: yValues[i]})),
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Regression Line',
                    data: regressionLine,
                    type: 'line',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }
            ]
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