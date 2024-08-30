import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const weatherInfo = async () => {
    try {
      let response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      let jsonResponse = await response.json();
      setWeatherData(jsonResponse);

      setCity(""); // Reset city input after successful fetch
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      toast.error("City not found. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      weatherInfo();
    } else {
      toast.warn("Please enter a city name");
    }
  };

  const renderWeatherIcon = () => {
    if (weatherData) {
      if (weatherData.main.humidity > 80) {
        return <ThunderstormIcon style={{ fontSize: 80, color: 'white' }} />;
      } else if (weatherData.main.temp < 15) {
        return <AcUnitIcon style={{ fontSize: 80, color: 'white' }} />;
      } else {
        return <WbSunnyIcon style={{ fontSize: 80, color: 'white' }} />;
      }
    }
    return null;
  };

  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = currentTime.format("YYYY");
  const date = currentTime.format("DD");
  const day = currentTime.format("dddd");
  const time = currentTime.format("HH:mm:ss");

  return (
    <div className="body">
      <div className="container">
        <div className="img">
          <div className="overlay">
            <div className="time-and-date">
              <p className="time">{time}</p>
              <p className="date">
                {day}, {date} {year}
              </p>
            </div>
            <div className="city-name">
              <p>{weatherData ? weatherData.name : "City Name"}</p>
            </div>
            <div className="temperature">
              <p>{weatherData ? `${weatherData.main.temp}°C` : "23°C"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container1">
        <div className="bg-slack">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={handleChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
          
          <div className="icon">{renderWeatherIcon()}</div>
          <h1 className="heading" style={{ color: "white" }}>
            {weatherData ? weatherData.weather[0].description : "Weather"}
          </h1>
          <div className="description">
            <p>
              Temperature: {weatherData ? `${weatherData.main.temp}°C` : "23°C"}
            </p>
            <p>
              Humidity: {weatherData ? `${weatherData.main.humidity}%` : "38%"}
            </p>
            <p>
              Visibility:{" "}
              {weatherData ? `${weatherData.visibility / 1000} km` : "3 km"}
            </p>
            <p>
              Wind Speed:{" "}
              {weatherData ? `${weatherData.wind.speed} Km/h` : "3 Km/h"}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default WeatherCard;
