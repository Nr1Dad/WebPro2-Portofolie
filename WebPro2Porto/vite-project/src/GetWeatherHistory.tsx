import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import type { WeatherData } from "./WeatherCard";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gridGap: "20px",
    marginTop: "20px"
  }
};


function GetWeatherHistory(){
    const [history, setHistory] = useState<WeatherData[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    async function handleHistoryClick(){
        try{
            const response = await fetch("/api/getWeatherHistory");
            if(!response.ok){
                throw new Error(`Server response: ${response.status}`);
            }

            const data: WeatherData[] = await response.json();
            setHistory(data);
            setShowHistory(true);
        }
        catch(error){
            console.error("Error fetching weather history:", error);
        }
    }

    return(
        <>
            <button onClick={handleHistoryClick}> Show Weather History </button>

            {showHistory && (
                <div style={styles.grid}>
                    {history.map((item, index) => (
                    <WeatherCard key={index} data={item} />
                    ))}
                </div>
            )}  
        </>
    );
}

export default GetWeatherHistory;