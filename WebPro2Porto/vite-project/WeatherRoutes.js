import { MongoClient } from "mongodb";
import { monitorEventLoopDelay } from "perf_hooks";
import { timeStamp } from "console";

const router = express.Router();
const client = new MongoClient("mongodb://localhost:27017");
const DB_NAME = "weatherDB";

//Get data from database
async function getDBcollection() {
    await MongoClient.connect();

    const db = MongoClient.db(DB_NAME);
    return db.collection("dmi_weather_data")
}

router.get("/getWeatherHistory", async (req, res) => {
    try {
        const collection = await getDBcollection();
        const documents = await collection.find({}).sort({timeStamp: -1}).limit(10).toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
})

router.get("/getLatestWeather", async (req, res) => {
    try {
        const collection = await getDBcollection();
        const documents = await collection.find({}).sort({timeStamp: -1}).limit(1).toArray();
        const latest = latestDocuments.length > 0 ? latestDocuments[0] : null;
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching latest weather data:", error);
        res.status(500).json({ error: "Failed to fetch latest weather data" });
    }
})

export default router;