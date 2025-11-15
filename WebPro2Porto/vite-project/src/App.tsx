import GetCurrentWeatherBtn from "./GetCurrentWeather";
import WeatherCard from "./WeatherCard";
import React, { useState, type JSX } from "react";

function App (): JSX.Element {

  async function handleUpdateClick(): Promise<void> {
    try {
      //Call the endpoint that runs getData()
      const response = await fetch("http://localhost:3000/api/getData");

      //If response gets an error like 404 throw new Error
      if (!response.ok){
        throw new Error(`Server response: ${response.status} ${response.statusText}`)
      }

    } catch (error) {
      //Post what error occured in the console
      console.error("Error while calling backend:", error)
    }
  }


  return <div> <GetCurrentWeatherBtn/> <WeatherCard/> </div>


} 

export default App;