const ul = document.querySelector('.more-info-list');
const ulFiveDays = document.querySelector('.fivedays-result-list');
const moreInfoContainer = document.querySelector('.more-info-container');
const scrollBtns = document.querySelector('.scroll-btn');
const leftScroll = document.querySelector('.scrollLeft');
const rightScroll = document.querySelector('.scrollRight');

const itemsPerPage = 8; // How many items to show per page

export const getMoreInfo = (weather, page) => {
  ul.innerHTML = '';

  // Calculate the start and end indices for the current page
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get a slice of the filtered futureItems array for the current page
  const itemsToDisplay = weather.list.slice(startIndex, endIndex);

  itemsToDisplay.forEach(list => {
    const li = document.createElement('li');
    li.classList.add('more-info-item');

    li.innerHTML = `
          <span class="more-info-time">${getStandardTimeFromTimestamp(
            list.dt
          )}</span>
          <span class="more-info-weather-span">
            <img
            src="https://openweathermap.org/img/wn/${
              list.weather[0].icon
            }@2x.png"
          />
          </span>
          <span class="more-info-temp">${Math.round(list.main.temp)}°</span>
          <ul class="more-info-result-list">
            <li class="more-info-result-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M11.5555 2.57531C11.6844 2.33094 11.7578 2.05285 11.7578 1.75781C11.7578 0.788555 10.9693 0 10 0C9.03076 0 8.2422 0.788555 8.2422 1.75781C8.2422 2.05285 8.3156 2.33094 8.44459 2.57531C4.34185 3.31164 1.21869 6.9073 1.21869 11.2187C1.21869 16.0607 5.15799 20 10 20C14.842 20 18.7813 16.0607 18.7813 11.2187C18.7813 6.9073 15.6582 3.31168 11.5555 2.57531ZM10 1.17188C10.3231 1.17188 10.586 1.43473 10.586 1.75781C10.586 2.0809 10.3231 2.34375 10 2.34375C9.67693 2.34375 9.41408 2.0809 9.41408 1.75781C9.41408 1.43473 9.67693 1.17188 10 1.17188ZM10 18.8281C5.80416 18.8281 2.39056 15.4145 2.39056 11.2187C2.39056 7.02281 5.80416 3.60922 10 3.60922C14.1959 3.60922 17.6095 7.02281 17.6095 11.2187C17.6095 15.4145 14.1959 18.8281 10 18.8281Z" fill="white" fill-opacity="0.54"/>
                <path d="M14.5826 6.68113C14.5744 6.67184 14.5664 6.66234 14.5575 6.65344C14.5481 6.64402 14.5382 6.63563 14.5283 6.62699C13.3622 5.47688 11.7622 4.76562 10 4.76562C8.23032 4.76562 6.62489 5.48188 5.45789 6.63953C5.45282 6.64426 5.44747 6.64848 5.44254 6.65344C5.4384 6.65758 5.43493 6.66207 5.43094 6.66625C4.26735 7.83406 3.547 9.44379 3.547 11.2187C3.547 11.5423 3.80934 11.8046 4.13293 11.8046H4.797C5.12059 11.8046 5.38293 11.5423 5.38293 11.2187C5.38293 10.8951 5.12059 10.6327 4.797 10.6327H4.75157C4.86465 9.61309 5.26911 8.68016 5.87969 7.91922L5.91211 7.95164C6.02653 8.06605 6.17649 8.12328 6.32641 8.12328C6.47633 8.12328 6.62633 8.06609 6.74071 7.95164C6.96954 7.72281 6.96954 7.35184 6.74071 7.12301L6.70915 7.09145C7.46856 6.48469 8.39829 6.08289 9.41411 5.97023V6.01562C9.41411 6.33922 9.67645 6.60156 10 6.60156C10.3236 6.60156 10.586 6.33922 10.586 6.01562V5.97023C11.6014 6.08297 12.5311 6.48496 13.2905 7.09184L13.2594 7.12297C13.0306 7.3518 13.0306 7.72277 13.2594 7.9516C13.3738 8.06602 13.5238 8.12324 13.6737 8.12324C13.8236 8.12324 13.9736 8.06605 14.088 7.9516L14.12 7.91961C14.7291 8.67863 15.1332 9.60867 15.2476 10.625H15.1954C14.8718 10.625 14.6094 10.8873 14.6094 11.2109C14.6094 11.5345 14.8718 11.7969 15.1954 11.7969C15.1954 11.7969 15.8677 11.7968 15.8679 11.7968C16.1915 11.7964 16.4535 11.5337 16.4531 11.2101C16.4507 9.44629 15.7361 7.84598 14.5826 6.68113Z" fill="white" fill-opacity="0.54"/>
                <path d="M12.6571 8.56151C12.4283 8.33269 12.0573 8.33269 11.8285 8.56151L9.38164 11.0084C9.11074 10.8789 8.80836 10.8192 8.50207 10.8407C8.17925 10.8632 7.93582 11.1432 7.95836 11.466C7.9809 11.7888 8.26058 12.0324 8.58367 12.0097C8.75293 11.9978 8.91879 12.0599 9.03875 12.1799C9.15687 12.298 9.21906 12.4614 9.20937 12.6282C9.19062 12.9512 9.4373 13.2283 9.76035 13.2471C9.77191 13.2478 9.78339 13.2481 9.79484 13.2481C10.1029 13.248 10.3612 13.0076 10.3793 12.6961C10.3966 12.3972 10.3364 12.1021 10.2101 11.8373L12.6571 9.39019C12.8859 9.16132 12.8859 8.79034 12.6571 8.56151Z" fill="white" fill-opacity="0.54"/>
                <path d="M13.3594 15.4297H6.64062C6.31703 15.4297 6.05469 15.692 6.05469 16.0156C6.05469 16.3392 6.31703 16.6016 6.64062 16.6016H13.3594C13.683 16.6016 13.9453 16.3392 13.9453 16.0156C13.9453 15.692 13.683 15.4297 13.3594 15.4297Z" fill="white" fill-opacity="0.54"/>
              </svg>
              <span class="more-info-result">${list.main.pressure} mm</span>
            </li>
            <li class="more-info-result-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_103_566)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8876 5.87409C17.5147 5.23588 17.1161 4.63252 16.7652 4.17506C16.2479 3.50068 15.9423 3.26165 15.5975 3.26165C15.2707 3.26165 15.0049 3.49056 14.7064 3.83427C14.4866 4.08736 14.2246 4.4383 13.9488 4.849C13.5535 5.43756 13.1739 6.07944 12.8494 6.70225C12.5018 6.03577 12.1768 5.46139 11.9365 5.05018C11.1847 3.76353 10.3829 2.54946 9.67869 1.63153C8.52388 0.126094 8.0897 0 7.77341 0C7.45711 0 7.02293 0.126094 5.86805 1.63157C5.1639 2.5495 4.36206 3.76357 3.61026 5.05022C2.70678 6.59635 0.605408 10.4497 0.605408 12.832C0.605408 16.7845 3.82097 20 7.77341 20C11.4819 20 14.5414 17.1692 14.9051 13.5551C15.1324 13.597 15.3638 13.6189 15.5976 13.6189C17.6912 13.6189 19.3945 11.9156 19.3945 9.82191C19.3945 8.63074 18.4504 6.83718 17.8876 5.87409ZM7.77341 18.8281C4.46714 18.8281 1.77729 16.1383 1.77729 12.832C1.77729 11.4363 2.77702 8.85824 4.45159 5.93592C5.94633 3.32751 7.27899 1.65028 7.77341 1.23668C8.26782 1.65028 9.60044 3.32747 11.0952 5.93592C12.7698 8.85828 13.7695 11.4363 13.7695 12.832C13.7695 16.1383 11.0797 18.8281 7.77341 18.8281ZM15.5976 12.447C15.3656 12.447 15.1373 12.4166 14.9163 12.3574C14.7872 11.0661 14.1754 9.46101 13.5066 8.02948C14.1582 6.5744 15.1249 5.14057 15.597 4.59349C15.8952 4.93717 16.4233 5.66143 17.0107 6.69995C17.7696 8.04167 18.2227 9.20875 18.2227 9.82191C18.2227 11.2693 17.045 12.447 15.5976 12.447Z" fill="white" fill-opacity="0.54"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.38205 10.0454C9.10178 9.88353 8.74346 9.97966 8.58166 10.2599L5.95018 14.8178C5.78838 15.0981 5.8844 15.4564 6.16463 15.6182C6.2569 15.6715 6.35764 15.6968 6.45705 15.6968C6.65955 15.6968 6.85651 15.5917 6.96502 15.4037L9.59651 10.8458C9.7583 10.5656 9.66229 10.2072 9.38205 10.0454Z" fill="white" fill-opacity="0.54"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30859 11.2109C6.30859 10.8882 6.04539 10.625 5.72266 10.625C5.39992 10.625 5.13672 10.8882 5.13672 11.2109C5.13672 11.5337 5.39996 11.7969 5.72266 11.7969C6.04535 11.7969 6.30859 11.5337 6.30859 11.2109Z" fill="white" fill-opacity="0.54"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6289 13.9453C9.30617 13.9453 9.04297 14.2085 9.04297 14.5312C9.04297 14.854 9.30621 15.1172 9.6289 15.1172C9.95163 15.1172 10.2148 14.8539 10.2148 14.5312C10.2148 14.2085 9.9516 13.9453 9.6289 13.9453Z" fill="white" fill-opacity="0.54"/>
                </g>
                <defs>
                <clipPath id="clip0_103_566">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              <span class="more-info-result">${list.main.humidity}%</span>
            </li>
            <li class="more-info-result-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.8223 1.6521C14.8747 1.6521 13.9458 1.97882 13.2069 2.57206C12.9546 2.77468 12.9143 3.14343 13.1168 3.39577C13.3194 3.64808 13.6882 3.68847 13.9406 3.48585C14.4722 3.05901 15.1405 2.82397 15.8223 2.82397C17.4797 2.82397 18.8281 4.17237 18.8281 5.8298C18.8281 7.48722 17.4797 8.83562 15.8223 8.83562H4.80463C4.48103 8.83562 4.21869 9.09796 4.21869 9.42155C4.21869 9.74515 4.48103 10.0075 4.80463 10.0075H15.8223C18.1259 10.0075 20 8.13339 20 5.8298C20 3.5262 18.1258 1.6521 15.8223 1.6521Z" fill="white" fill-opacity="0.54"/>
                <path d="M3.68213 7.66772H9.94139C10.265 7.66772 10.5273 7.40538 10.5273 7.08179C10.5273 6.75819 10.265 6.49585 9.94139 6.49585H3.68213C3.35854 6.49585 3.09619 6.75819 3.09619 7.08179C3.09619 7.40538 3.35854 7.66772 3.68213 7.66772Z" fill="white" fill-opacity="0.54"/>
                <path d="M9.77715 11.1833H0.585938C0.262344 11.1833 0 11.4457 0 11.7693C0 12.0929 0.262344 12.3552 0.585938 12.3552H9.77715C11.1062 12.3552 12.1876 13.4365 12.1876 14.7656C12.1876 16.0947 11.1062 17.176 9.77715 17.176C9.23039 17.176 8.69453 16.9875 8.26816 16.6452C8.01586 16.4426 7.64707 16.483 7.44445 16.7353C7.24184 16.9876 7.28219 17.3564 7.53453 17.559C8.16816 18.0677 8.96461 18.3478 9.77715 18.3478C11.7524 18.3478 13.3595 16.7408 13.3595 14.7656C13.3595 12.7903 11.7524 11.1833 9.77715 11.1833Z" fill="white" fill-opacity="0.54"/>
                <path d="M0.585938 7.66772H1.37637C1.69996 7.66772 1.9623 7.40538 1.9623 7.08179C1.9623 6.75819 1.69996 6.49585 1.37637 6.49585H0.585938C0.262344 6.49585 0 6.75819 0 7.08179C0 7.40538 0.262344 7.66772 0.585938 7.66772Z" fill="white" fill-opacity="0.54"/>
                <path d="M7.65625 14.1016C7.65625 13.778 7.39391 13.5156 7.07031 13.5156H3.55469C3.23109 13.5156 2.96875 13.778 2.96875 14.1016C2.96875 14.4252 3.23109 14.6875 3.55469 14.6875H7.07031C7.39395 14.6875 7.65625 14.4252 7.65625 14.1016Z" fill="white" fill-opacity="0.54"/>
              </svg>
              <span class="more-info-result">${list.wind.speed} m/s</span>
            </li>
          </ul>
        `;

    ul.appendChild(li);
  });
  leftScroll.addEventListener('click', () => {
    ul.scrollBy({ left: -100, behavior: 'smooth' });
  });

  rightScroll.addEventListener('click', () => {
    ul.scrollBy({ left: 100, behavior: 'smooth' });
  });

  // Attach to scroll and window resize events
  ul.addEventListener('scroll', arrowVisibility);
  window.addEventListener('resize', arrowVisibility);
  arrowVisibility();
};

function arrowVisibility() {
  const containerWidth = ul.clientWidth;
  const contentWidth = ul.scrollWidth;

  // Show arrows only if content overflows
  const maxScrollLeft = contentWidth - containerWidth;
  // Hide the left button if at the start of the list
  if (ul.scrollLeft === 0) {
    leftScroll.style.display = 'none';
  } else {
    leftScroll.style.display = 'block';
  }

  // Hide the right button if at the end of the list
  if (ul.scrollLeft === maxScrollLeft) {
    rightScroll.style.display = 'none';
  } else {
    rightScroll.style.display = 'block';
  }
}

const button = document.createElement('button');
button.classList.add('more-info-button', 'hidden');
button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                      <path d="M1 1L11 11M1 11L11 1" stroke-width="1.5"/>
                    </svg>`;

ulFiveDays.insertAdjacentElement('afterend', button);

button.addEventListener('click', () => {
  moreInfoContainer.classList.add('hidden');
  button.classList.add('hidden');
  scrollBtns.classList.add('hidden');
});

//for draggable scrolling
const scrollableContainer = document.querySelector('.more-info-list');
let isDragging = false;
let startY;
let scrollTop;

scrollableContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
  scrollTop = scrollableContainer.scrollTop;
  scrollableContainer.style.cursor = 'grabbing'; // Change cursor to grabbing when dragging
});

scrollableContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const distance = e.clientY - startY;
  scrollableContainer.scrollTop = scrollTop - distance;
});

scrollableContainer.addEventListener('mouseup', () => {
  isDragging = false;
  scrollableContainer.style.cursor = 'grab'; // Reset cursor after dragging
});

scrollableContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  scrollableContainer.style.cursor = 'grab'; // Reset cursor if mouse leaves
});


function getStandardTimeFromTimestamp(timestamp) {
  // Convert the timestamp (which is in seconds) to milliseconds
  const date = new Date(timestamp * 1000);

  // Get the hours and minutes from the Date object
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  // Format the hours and minutes to ensure they are two digits (e.g., "09:05" instead of "9:5")
  const formattedTime = `${hours.toString()}:${minutes
    .toString()
    .padStart(2, '0')} ${period}`;

  return formattedTime;
}
