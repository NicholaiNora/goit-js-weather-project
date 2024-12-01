const chartContainer = document.querySelector('.chart-container');
const showButton = document.querySelector('.show-chart-button');
const chartSpan = document.querySelector('.show-chart-span');
const arrowIcon = document.querySelector('.show-chart-arrow-icon');
const showChart = document.querySelector('.show-chart-container');


let isOpen = false;

showButton.addEventListener('click', () => {
  if (!isOpen) {
    chartContainer.classList.remove('hidden');
    chartSpan.textContent = 'Hide Chart';
    arrowIcon.style.transform = 'rotate(180deg)';
    isOpen = true;
  } else {
    chartContainer.classList.add('hidden');
    chartSpan.textContent = 'Show Chart';
    arrowIcon.style.transform = 'rotate(0deg)';
    isOpen = false;
  }
});
