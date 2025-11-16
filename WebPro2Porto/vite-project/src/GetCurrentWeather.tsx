import React, { useState } from "react";
import WeatherCard from "./WeatherCard";


interface WeatherData {
  typeOfWeather: string;
  timestamp: string;
  temperature: number;
}

function GetCurrentWeatherBtn() {
  // State for controlling when to show the card
  const [showCard, setShowCard] = useState(false);
  // State for storing fetched data
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  async function handleUpdateClick() {
    try {
      const response = await fetch("/api/getData");
      if (!response.ok) {
        throw new Error(`Server response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // assuming your backend returns JSON

      // Store the data and show the WeatherCard
      setWeatherData(data);
      setShowCard(true);
    } catch (error) {
      console.error("Error while calling backend:", error);
    }
  }

  return (
    <>
      <button onClick={handleUpdateClick}>Get Current Weather</button>

      {/* Conditionally render the weather card */}
      {showCard && <WeatherCard data={weatherData} />}
    </>
  );
}

export default GetCurrentWeatherBtn;
