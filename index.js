$(document).ready(function(){
  $(".subcontainer").hide();
  $(".myinfo").hide();
  $("#show-title-weather").hide();
  $("#show-region").hide();
  $("#weather-icon").hide();
  $("#show-desc-weather").hide();
  $(".txt404").hide();
});

const apiKey = "c0c083bc03d9f002ce678129d69335ba";

const btn_search = document.querySelector("#search-button");

btn_search.addEventListener('click', function () {
  const city = document.querySelector("#search-input").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const show_desc_weather = document.querySelector("#show-desc-weather");
  const show_title_weather = document.querySelector("#show-title-weather");
  const show_region = document.querySelector("#show-region");
  const show_humidity = document.querySelector("#show-humidity");
  const show_temperature = document.querySelector("#show-temperature");
  const show_windSpeed = document.querySelector("#show-windSpeed");
  const show_feelsLike = document.querySelector("#show-feelsLike");
  const show_weather_icon = document.querySelector("#weather-icon");
  const show_temp_min = document.querySelector("#show-temp-min");
  const show_temp_max = document.querySelector("#show-temp-max");
  const show_pressure = document.querySelector("#show-pressure");
  const show_windDegree = document.querySelector("#show-windDegree");
  const show_cloudsAll = document.querySelector("#show-cloudsAll");
  const show_longitude = document.querySelector("#show-longitude");
  const show_latitude = document.querySelector("#show-latitude");



  function notFound(params) {
    $(document).ready(function () {
      $(".subcontainer").show(100);
      setTimeout(() => {
        $("#show-title-weather").text("Oops! Kota tidak ditemukan :(");
        $("#show-title-weather").show(300);
        $(".txt404").show(100);
        $(".myinfo").hide(300);
        $("#show-region").hide(300);
        $("#weather-icon").hide(300);
        $("#show-desc-weather").hide(300);
      }, 250);
    });
  }

  function cityFound() {
    $(document).ready(function () {
      // Buat biar ke effect refresh
      $("#show-title-weather").hide();
      $(".txt404").hide();
      $(".myinfo").hide();
        $("#show-title-weather").hide();
        $("#show-region").hide();
        $("#weather-icon").hide();
        $("#show-desc-weather").hide();

      $(".subcontainer").show(100);
      setTimeout(() => {
        $(".myinfo").show(300);
        $("#show-title-weather").show(300);
        $("#show-region").show(300);
        $("#weather-icon").show(300);
        $("#show-desc-weather").show(300);
      }, 250);
    });
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod == 404) {
        console.log(data);
        notFound(data.message);
      } else {
        console.log("DATA:", data); // log the JSON response to the console
        // extract the weather information you need from the JSON response
        const getcity = document.querySelector("#search-input").value;
        const getkelvin = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const feelsLike = data.main.feels_like;
        const descWeather = data.weather[0].description;
        const ttlWeather = data.weather[0].main;
        const getregion = data.sys.country;
        const temp_min = data.main.temp_min;
        const temp_max = data.main.temp_max;
        const get_pressure = data.main.pressure;
        const wind_deg = data.wind.deg;
        const clouds_all = data.clouds.all;
        const get_lat = data.coord.lat;
        const get_lon = data.coord.lon;

        // get direction compass
        var wind_direct = "";
        if(wind_deg == 360 || wind_deg == 0){
          wind_direct = "N";
        } else if(wind_deg < 90){
          wind_direct = "NE";
        } else if(wind_deg == 90){
          wind_direct = "E";
        } else if(wind_deg < 180){
          wind_direct = "SE";
        } else if(wind_deg == 180){
          wind_direct = "S";
        } else if(wind_deg < 270){
          wind_direct = "SW";
        } else if(wind_deg == 270){
          wind_direct = "W";
        } else if(wind_deg < 360){
          wind_direct = "NW";
        }

        // convert kelvin to celcius
        let celcius_feels_like = parseInt(feelsLike) - 273.15;
        let celcius_temp = parseInt(getkelvin) - 273.15;
        let celcius_temp_max = parseInt(temp_max) - 273.15;
        let celcius_temp_min = parseInt(temp_min) - 273.15;
        celcius_feels_like = Math.round(celcius_feels_like);
        celcius_temp = Math.round(celcius_temp);
        celcius_temp_max = Math.round(celcius_temp_max);
        celcius_temp_min = Math.round(celcius_temp_min);

        // get icon
        const get_icon = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${get_icon}.png`;

        // initial region
        const regionNames = new Intl.DisplayNames(
          ['id'], { type: 'region' }
        );

        // get timezone formatclock and dateBuilder
        const gettimezone = data.timezone;
        const dateBuilder = (timezone) => {

          const nowInLocalTime = Date.now() + 1000 * (timezone / 3600);
          const millitime = new Date(nowInLocalTime);
          const dateFormat = millitime.toLocaleString();

          let day = millitime.toLocaleString("in-IN", { weekday: "long" });
          let month = millitime.toLocaleString("in-IN", { month: "long" });
          let date = millitime.toLocaleString("in-IN", { day: "numeric" });
          let year = millitime.toLocaleString("in-IN", { year: "numeric" });
          let hours = millitime.toLocaleString("in-IN", { hour: "numeric" });
          let minutes = millitime.toLocaleString("in-IN", { minute: "numeric" });
          // jika menit nya kurang dari 2 digit menit maka ditambahi 0 didepannya
          if (minutes < 10) {
            minutes = 0 + minutes;
          }
          return `${hours}:${minutes}`;
        }

        // display the weather information on the page
        show_title_weather.innerHTML = ttlWeather;
        show_desc_weather.innerHTML = descWeather;
        show_region.innerHTML = "<i class='fa-solid fa-location-dot'></i> " + getcity + ", " + regionNames.of(getregion) + " " + dateBuilder(gettimezone);
        show_weather_icon.src = iconUrl;
        show_temperature.innerHTML = celcius_temp + "&deg;C";
        show_humidity.innerHTML = humidity + "%";
        show_feelsLike.innerHTML = celcius_feels_like + "&deg;C";
        show_windSpeed.innerHTML = windSpeed + "m/s";
        show_temp_min.innerHTML = celcius_temp_min + "&deg;C";
        show_temp_max.innerHTML = celcius_temp_max + "&deg;C";
        show_pressure.innerHTML = get_pressure + "hPa";
        show_windDegree.innerHTML = wind_deg + "&deg;" + wind_direct;
        show_cloudsAll.innerHTML = clouds_all + "%";
        show_latitude.innerHTML = get_lat;
        show_longitude.innerHTML = get_lon;

        cityFound();

      } // end of 404
    })
    .catch(error => console.log("show error", error));
});