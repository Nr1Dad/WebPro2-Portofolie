import React from "react";

export interface WeatherData {
  value: string;
  created: string;
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

const defaultIcon = "Icons/sharknado.png"

function WeatherCard({ data }: WeatherCardProps) {
    const iconKey = data.value;

     const icon = weatherIcons[data.value] || defaultIcon;

  return (
    <div className="card">
       <img
        src={icon}
        className="card-img-top"
        style={{ width: "100px", height: "100px" }}
        alt={data.value}
      />

      <div className="card-body">
        <h5 className="card-title">{data.value}</h5>
        <p className="card-text">Timestamp: {data.created}</p>
      </div>
    </div>
  );
}

export default WeatherCard;