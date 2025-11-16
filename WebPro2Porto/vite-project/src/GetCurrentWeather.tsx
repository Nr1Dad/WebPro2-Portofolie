import App from "./App";
import WeatherCard from "./WeatherCard";

function GetCurrentWeatherBtn () {

    return(
    <> 
    
        <h4>  </h4>
        <button onClick={handleUpdateClick}> Get Current Weather </button>
        
    
    </>
    );
}

async function handleUpdateClick(): Promise<void> {
    try {
      //Call the endpoint that runs getData()
      const response = await fetch("/api/getData");

      //If response gets an error like 404 throw new Error
      if (!response.ok){
        throw new Error(`Server response: ${response.status} ${response.statusText}`)
      }

      console.log("I MADE IT HERE!");

    } catch (error) {
      //Post what error occured in the console
      console.error("Error while calling backend:", error)
    }

    loadWeatherCard();

  }
  
  async function loadWeatherCard(){

    return <div> <WeatherCard></WeatherCard></div>

  }

export default GetCurrentWeatherBtn;

