import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart').getContext('2d');

// Global variable to hold the chart instance
let chartInstance = null;

export const getChartData = data => {
  // Destroy the previous chart if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  const fiveDayData = data.list.filter(
    (_item, index) => index % 8 === 0
  );
  console.log(fiveDayData);

  // Create labels using the timestamp in the data
  const labels = fiveDayData.map(item => getFormattedDateFromData(item.dt));

  // Create the chart
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels, // Use the dynamically generated labels
      datasets: [
        {
          label: '— Temperature, C°',
          data: fiveDayData.map(item => item.main.temp), // Use the temp data from the filtered items
          backgroundColor: 'rgba(255, 107, 9, 1)',
          borderColor: 'rgba(255, 107, 9, 1)',
        },
        {
          label: '— Humidity, % ',
          data: fiveDayData.map(item => item.main.humidity), // Use the humidity data
          backgroundColor: 'rgba(9, 6, 235, 1)',
          borderColor: 'rgba(9, 6, 235, 1)',
        },
        {
          label: '— Wind Speed, m/s ',
          data: fiveDayData.map(item => item.wind.speed), // Use the wind speed data
          backgroundColor: 'rgba(234, 154, 5, 1)',
          borderColor: 'rgba(234, 154, 5, 1)',
        },
        {
          label: '— Atmosphere Pressure, m/m',
          data: fiveDayData.map(item => item.main.pressure), // Use the pressure data
          backgroundColor: 'rgba(6, 120, 6, 1)',
          borderColor: 'rgba(6, 120, 6, 1)',
          hidden: true
        },
      ],
    },
    options: {
      elements: {
        line: {
          tension: 0.2,
          borderWidth: 3,
        },
      },
      plugins: {
        legend: {
          display: true,
          align: 'center',
          title: {
            display: true,
            text: 'AVERAGE: ',
            position: 'top',
            padding: 0,
          },
          labels: {
            boxWidth: 15,
            boxHeight: 12,
            defaultFontColor: 'rgb(5, 120, 6)',
            color: 'rgba(247, 242, 242, 1)',
            padding: 10,
          },
        },
        title: {
          display: true,
          text: 'Value of indicators',
          position: 'left',
          padding: 0,
          fullSize: false,
        },
      },

      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(255, 255, 255, 1)',
          },
          ticks: {
            padding: 18,
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(255, 255, 255, 1)',
          },
          ticks: {
            padding: 18,
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    },
  });
};

// Function to format the timestamp into a readable date (Month Day, Year)
function getFormattedDateFromData(timestamp) {
  const date = new Date(timestamp * 1000); // Convert from Unix timestamp to milliseconds
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options); // Example: "Dec 2, 2024"
}