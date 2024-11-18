import quotes from '../quotesData';

const quotesContainer = document.querySelector('.quotes-container');

function getRandomNumber() {
  return Math.floor(Math.random() * quotes.length);
}

let timerInterval
export const getQuote = () => {
if (timerInterval) clearInterval(timerInterval);
timerInterval = setInterval(() => {
    const quote = quotes[getRandomNumber()];
    quotesContainer.innerHTML = `<p class="quotes-paragraph">
        ${quote.quote}
      </p>
      <cite class="quotes-author">${quote.author}</cite>`;
}, 5000);

};