const chartWrapper = document.querySelector('.chart-wrapper');
const chartContainer = document.querySelector('.chart-container');
const showButton = document.querySelector('.show-chart-button');
const chartSpan = document.querySelector('.show-chart-span');
const arrowIcon = document.querySelector('.show-chart-arrow-icon');
const showChart = document.querySelector('.show-chart-container');

let isOpen = false;

showButton.addEventListener('click', () => {
  if (!isOpen) {
    chartWrapper.classList.remove('hidden');
    chartContainer.classList.remove('hidden');
    chartSpan.textContent = 'Hide Chart';
    arrowIcon.style.transform = 'rotate(180deg)';
    chartContainer.style.marginBottom = '10px';
    chartContainer.scrollIntoView({
      behavior: 'smooth', // Smooth scroll animation
      block: 'start', // Align the top of the element to the top of the viewport
    });
    isOpen = true;
  } else {
    chartWrapper.classList.add('hidden');
    chartContainer.classList.add('hidden');
    chartContainer.style.marginBottom = '0';
    chartSpan.textContent = 'Show Chart';
    arrowIcon.style.transform = 'rotate(0deg)';
    isOpen = false;
  }
});
