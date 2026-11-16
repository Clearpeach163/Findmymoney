const chartCanvas = document.getElementById("Chart-1");

async function renderChart() {
    if (!chartCanvas) return;

    const values = await Get("Balance_data") ?? [12, 19, 3, 5, 2, 3];
    const chartData = Array.isArray(values)
        ? values.map(Number).filter((n) => Number.isFinite(n))
        : [12, 19, 3, 5, 2, 3];

    if (chartData.length === 0) return;

    new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "",
                data: chartData,
                borderColor: "#7fe7ff",
                backgroundColor: "rgba(127, 231, 255, 0.2)",
                borderWidth: 1,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

renderChart();