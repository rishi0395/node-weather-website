console.log('Client side JS file loaded');

//to interact with the DOM
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const getWeatherApi = (location) => {
  //fetch API is not the JS nor NodeJS api it's a browser based Api which used to fetch the data from URL
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((resp) => {
      if (resp.error) {
        messageOne.textContent = resp.error;
      } else {
        messageTwo.textContent = `Location: ${resp.location}`;
        messageOne.textContent = `Temperature: ${resp.temp}`;
      }
    });
  });
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); //to prevent the reload of the client side browser page

  const location = search.value; //to get the input value
  messageOne.textContent = 'Loading....';
  messageTwo.textContent = '';
  getWeatherApi(location);
});
