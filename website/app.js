const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Personal API Key for OpenWeatherMap API
const apiKey = "bfb9c46de98b7eb89ba53d648de114de&units=imperial";

const today = new Date();
let newDate =
  today.getMonth() + "." + today.getDate() + "." + today.getFullYear();

// Event listener to add function to existing HTML DOM element
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", actionAddWeather);

/* Function called by event listener */
function actionAddWeather(event) {
  event.preventDefault();
  const zipcode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  if (!zipcode) {
    generateButton.classList.add("invalid");
  } else {
    generateButton.classList.remove("invalid");
    getWeatherData(baseUrl, zipcode, apiKey).then((data) => {
      if (data.cod !== 200) {
        alert(`${data.message}`);
      } else {
        postWeatherData("/add", {
          date: newDate,
          temp: data.main.temp,
          content: feelings,
        })
          .then(() => {
            retrieveData();
          })
          .catch((e) => {
            console.log("Error submit: ", e);
          });
      }
    });
  }
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zipcode, apiKey) => {
  try {
    const res = await fetch(`${baseUrl}?zip=${zipcode},us&appid=${apiKey}`);
    const allWeatherData = await res.json();
    return allWeatherData;
  } catch (error) {
    console.log("Error get all weather: ", error);
  }
};

/* Function to POST data */
const postWeatherData = async (url = "", weather = {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: weather.date,
        temp: weather.temp,
        content: weather.content,
      }),
    });
    const newWeather = await res.json();
    return newWeather;
  } catch (error) {
    console.log("Error post weather: ", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  try {
    const req = await fetch("/all");
    // Transform into JSON
    const allData = await req.json();
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = "Date: " + allData.date;
    document.getElementById("temp").innerHTML =
      "Temp: " + Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML =
      "Content: " + allData.content;
  } catch (error) {
    console.log("Error: ", error);
  }
};
