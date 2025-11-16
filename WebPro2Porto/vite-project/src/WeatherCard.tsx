import React from "react";

export interface WeatherData {
  typeOfWeather: string;
  timestamp: string;
  temperature: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const weatherIcons: Record <string, string> = {

    Sunny: "Icons/sun.png",
    Rainy: "Icons/rain.png",
    Snowy: "Icons/snow.png",
    Thunder: "Icons/thunder.png",
    Cloudy: "Icons/clouds.png",
    Misty:"Icons/mist.png",
    Windy: "Icons/wind.png",
    Moon: "Icons/Moon.png"
};

const defaultIcon = "Icons/sharknado"

function WeatherCard({ data }: WeatherCardProps) {
     const icon = weatherIcons[data.typeOfWeather] || defaultIcon;

  return (
    <div className="card">
       <img
        src={icon}
        className="card-img-top"
        style={{ width: "100px", height: "100px" }}
        alt={data.typeOfWeather}
      />

      <div className="card-body">
        <h5 className="card-title">{data.typeOfWeather}</h5>
        <p className="card-text">Timestamp: {data.timestamp}</p>
        <p className="card-text">Temperature: {data.temperature}°C</p>
        <button className="btn btn-primary">View Weather History</button>
      </div>
    </div>
  );
}

export default WeatherCard;