import React, { useState } from "react";
import WeatherCard from "./WeatherCard"; 
import type { WeatherData } from "./WeatherCard";

function GetCurrentWeatherBtn() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  async function handleUpdateClick() {
    try {
      const response = await fetch("/api/getLatestWeather");
      if (!response.ok) {
        throw new Error(`Server response: ${response.status} ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error while fetching weather:", error);
    }
  }

  return (
    <>
      <button onClick={handleUpdateClick}>Get Current Weather</button>
      
      {weatherData && <WeatherCard data={weatherData} />}
    </>
  );
}

export default GetCurrentWeatherBtn;