const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const quotecontainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const bodyBg = document.getElementById('bodye')

let apiQuotes = [];

// New quote function
    function newQuote() {
        // picking a random quote from apiquotes array
        // here Math.random() is between 0 and 1
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // checking if author field is blank and replacing it with unkonwn
        if(!quote.author){
            authorText.textContent = 'Unknown';
        }
        else{
            authorText.textContent = quote.author;
        }

        // checking quote length to determine styling
        if(quote.text.length>100){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        // seting quote
        quoteText.textContent = quote.text;
        // complete();
    }


//  Getting Quotes from API
// asynchronous fetch request within a try catch statement.
// An asynchronous function can run at any time independently ans it won't stop the browser from completing the loading of a page.
async function getQuotes() {
    // loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }   catch(error) {
        //catching error here
    }
}

// tweet quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();






// dark theme switch

function lightMode() {
    toggleIcon.style.color = 'rgb(0 0 0 / 100%)';
    quotecontainer.style.color = 'rgba(0,0,0)';
    bodyBg.style.backgroundColor = '#ffffff';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode('light');
  }


// Dark Mode Styles
function darkMode() {
    toggleIcon.style.color = '#ffffff';
    quotecontainer.style.color = '#b0e617';
    bodyBg.style.backgroundColor = 'rgba(0,0,0)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
}

// Switch Theme 
function switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkMode();
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      lightMode();
    }
  }
  
  // Event Listener
  toggleSwitch.addEventListener('change', switchTheme);