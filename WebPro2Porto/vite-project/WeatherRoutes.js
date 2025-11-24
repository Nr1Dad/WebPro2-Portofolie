import { MongoClient } from "mongodb";
import { monitorEventLoopDelay } from "perf_hooks";
import { timeStamp } from "console";
import express from "express";

const router = express.Router();
const client = new MongoClient("mongodb://localhost:27017");
const DB_NAME = "weatherDB";

//Get data from database
async function getDBcollection() {
    await client.connect();

    const db = client.db(DB_NAME);
    return db.collection("dmi_weather_data")
}

function weatherCodeToWord(code){ //We're sorry for this horror :/
    if (code === 0 || code === 1 || code === 100 || code === 101) return "Sunny"
    else if (code === 3 || code === 4 || code === 103 || code === 104 || code === 105) return "Coudy"
    else if (code === 5 || code >= 10 && code <= 12 || code === 28 || code >= 40 && code <= 49 || code === 110 || code === 120 || code >= 130 && code <= 135) return "Misty"
    else if (code === 9 || code === 18 || code === 19 || code >= 30 && code <= 35 || code === 118 || code >= 127 && code <= 129) return "Windy"
    else if (code === 13 || code === 17 || code === 29 || code >= 95 && code <= 99 || code === 112 || code === 126 || code >= 190 && code <= 196) return "Thunder"
    else if (code === 22 || code === 23 || code >= 36 && code <= 39 || code >= 70 && code <= 79 || code >= 85 && code <= 88 || code === 111 || code === 124 || code >= 170 && code <= 178) return "Snowy"
    else if (code === code >= 14 && code <= 16 || code === 20 || code === 21 || code >= 24 && code <= 27 || code >= 50 && code <= 69 || code >= 80 && code <= 84 || code >= 89 && code <= 94 || code >= 121 && code <= 123 || code === 125 || code >= 140 && code <= 148 || code >= 150 && code <= 158 || code >= 160 && code <= 168 || code >= 180 && code <= 187 || code === 189) return "Rainy";
    else return "Unknown";
}

router.get("/getWeatherHistory", async (req, res) => {
    try {
        const collection = await getDBcollection();
        const documents = await collection.find({}).sort({"properties.observed": -1}).limit(10).toArray();

        const normalized = documents.map(doc => {
            const props = doc.properties ?? {};
            return {
                value: weatherCodeToWord(props.value),
                created: props.created ?? props.observed ?? "Unknown"
            }
        });
        res.status(200).json(normalized);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
})

router.get("/getLatestWeather", async (req, res) => {
    try {
        const collection = await getDBcollection();
        const latestDocuments = await collection.find({}).sort({"properties.observed": -1}).limit(1).toArray();

        const latest = latestDocuments.length > 0 ? latestDocuments[0] : null;
        console.log("LATEST FROM MONGO:", latest);
        if (latest){
            const props = latest.properties ?? {};
             res.status(200).json({
                value: weatherCodeToWord(props.value),
                created: props.created ?? props.observed ?? "Unknown"
             });
        } else{
             res.status(404).json({ error: "No weather data found" });
        }
    } catch (error) {
        console.error("Error fetching latest weather data:", error);
        res.status(500).json({ error: "Failed to fetch latest weather data" });
    }
})

export default router;