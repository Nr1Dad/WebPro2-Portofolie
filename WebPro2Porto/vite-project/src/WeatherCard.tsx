interface WeatherData {
  typeOfWeather: string;
  timestamp: string;
  temperature: number;
}

interface WeatherCardProps {
  data: WeatherData | null;
}

function WeatherCard({ data }: WeatherCardProps) {
  if (!data) return null;

  return (
    <div className="card">
      <img
        src="Icons/sun.png"
        className="card-img-top"
        style={{ width: "100px", height: "100px" }}
      />

      <div className="card-body">
        <h5 className="card-title">{data.typeOfWeather}</h5>
        <p className="card-text">Timestamp: {data.timestamp}</p>
        <p className="card-text">Temperature: {data.temperature}°C</p>
        <a href="#" className="btn btn-primary">View Weather History</a>
      </div>
    </div>
  );
}

export default WeatherCard;