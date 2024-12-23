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
    // chartWrapper.style.marginBottom = '10px';
    chartContainer.scrollIntoView({
      behavior: 'smooth', // Smooth scroll animation
      block: 'start', // Align the top of the element to the top of the viewport
    });
    isOpen = true;
  } else {
    chartWrapper.classList.add('hidden');
    chartContainer.classList.add('hidden');
    // chartWrapper.style.marginBottom = '0';
    chartSpan.textContent = 'Show Chart';
    arrowIcon.style.transform = 'rotate(0deg)';
    isOpen = false;
  }
});

//for draggable scrolling
// Variables to keep track of the dragging state and initial mouse position
let isDragging = false;
let startX, scrollLeft;

// Function to handle the start of the drag
chartWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - chartWrapper.offsetLeft;
  scrollLeft = chartWrapper.scrollLeft;
  chartWrapper.style.cursor = 'grabbing'; // Change the cursor to grabbing
});

// Function to handle the drag motion
chartWrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // If not dragging, do nothing
  e.preventDefault(); // Prevent text selection during drag
  const x = e.pageX - chartWrapper.offsetLeft; // Calculate the mouse movement
  const walk = (x - startX) * 1; // Multiply to make scrolling faster
  chartWrapper.scrollLeft = scrollLeft - walk; // Update the scroll position
});

// Function to handle the end of the drag
chartWrapper.addEventListener('mouseup', () => {
  isDragging = false;
  chartWrapper.style.cursor = 'grab'; // Change the cursor back to grab
});

// Optional: Stop dragging if the mouse leaves the container
chartWrapper.addEventListener('mouseleave', () => {
  isDragging = false;
  chartWrapper.style.cursor = 'grab';
});