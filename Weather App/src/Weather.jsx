import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const weatherInfo = async () => {
    try {
      let response =await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)

      let jsonResponse = await response.json();
      console.log(jsonResponse);
      setWeatherData(jsonResponse); // Store weather data in state

       let result = {
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      
      console.log(result);
      
      setCity(""); // Reset city input after successful fetch
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    weatherInfo();
  };

  return (
    <div className="body">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 180 }}
          image="https://images.unsplash.com/photo-1724549040066-6b084752625f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Weather Image"
        />
        <CardContent>
          <TextField
            id="outlined-basic"
            label="City Name"
            onChange={handleChange}
            value={city}
            variant="outlined"
          />
          <br />
          <br />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Search
          </Button>
          <br />
          <br />
          <Typography gutterBottom variant="h5" component="div">
            Weather
          </Typography>
          {/* {weatherData ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`Temperature in ${weatherData.name}: ${weatherData.main.temp}°C`}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Enter a city name to get the weather information.
            </Typography>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Weather;
