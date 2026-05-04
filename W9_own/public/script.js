
const cityinput = document.getElementById('cityinput');
const statustext = document.getElementById('status');
const citytext = document.getElementById('city');
const temptext = document.getElementById('temp');
const humiditytext = document.getElementById('humidity');
const conditiontext = document.getElementById('condition');
const submitBtn = document.getElementById('submitBtn');
const weathercard = document.getElementById('weathercard');

/*
Mistakes:

Wrote trim instead of trim()

submitBtn.addEventListener("click", fetchWeather);
here i write 'submit' in place of click


*/

function fetchWeather(){
    const mycity = cityinput.value.trim();

    if(!mycity){
        statustext.textContent = "Please give valid city as input";
        weathercard.classList.add('hidden');
        return;
    }

    //during loading
    statustext.textContent = "Loading please wait....";
    weathercard.classList.add('hidden');

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/weather", true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            statustext.textContent = "Error in fetching weather (xhr.status !== 200)";
            return;
        }

        try{
            const data = JSON.parse(xhr.responseText);
            // console.log(data);

            // console.log(mycity);
            const match = data.find((item) => item.city.toLowerCase() === mycity.toLowerCase());
            // console.log("now here");

            if(!match){
                statustext.textContent = "No such city found.";
                return;
            }

            citytext.textContent = match.city;
            temptext.textContent = `${match.temperature} C`;
            humiditytext.textContent = match.humidity;
            conditiontext.textContent = match.conditions;

            statustext.textContent = 'Weather data fetched successfully!';
            weathercard.classList.remove('hidden');  //remember


        } catch(err){
            statustext.textContent = "Error in fetching weather (catch block)";
        }
    };

    xhr.onerror = function (){
        statustext.textContent = 'Error in fetching weather data';
        return;
    };

    xhr.send();
};


submitBtn.addEventListener("click", fetchWeather);
