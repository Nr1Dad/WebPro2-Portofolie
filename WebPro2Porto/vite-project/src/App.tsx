import GetCurrentWeatherBtn from "./GetCurrentWeather";
import React, { useState, type JSX } from "react";
import GetWeatherHistory from "./GetWeatherHistory";

function App (): JSX.Element {

  return (
   <div>
      <h1>Current Weather</h1>
      <GetCurrentWeatherBtn />

      <h1>Weather History</h1>
      <GetWeatherHistory />
    </div>

  );


} 

export default App;