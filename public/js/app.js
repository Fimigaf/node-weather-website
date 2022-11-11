const weatherFormEl = document.querySelector(".weather-form");
const weatherInputEl = document.querySelector(".weather-search");
const messageOneEl = document.querySelector("#message-one");
const messageTwoEl = document.querySelector("#message-two");

weatherFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOneEl.textContent = 'Loading...';
  messageTwoEl.textContent = ' ';
  getWeatherInfo(weatherInputEl.value);
  weatherInputEl.value = '';
});

const getWeatherInfo = async (location) => {
  const response = await fetch(
    `http://localhost:3000/weather?location=${location}`
  );
  if (!response.ok) {
    return console.log(response.error);
  }
  const data = await response.json();
  if (data.error) {
    messageOneEl.textContent = '';
    return (messageTwoEl.textContent = data.error);
  }
  messageOneEl.textContent = data.location;
  messageTwoEl.textContent = data.forecast;
};
