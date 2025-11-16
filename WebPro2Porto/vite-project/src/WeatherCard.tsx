import React from "react";

export interface WeatherData {
  value: string;
  created: string;
}

interface WeatherCardProps {
  data: WeatherData;
}

const weatherIcons: Record <string, string> = {

    Sunny: "Public/sun.png",
    Rainy: "Public/rain.png",
    Snowy: "Public/snow.png",
    Thunder: "Public/thunder.png",
    Cloudy: "Public/clouds.png",
    Misty:"Public/mist.png",
    Windy: "Public/wind.png",
    Moon: "Public/Moon.png"
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