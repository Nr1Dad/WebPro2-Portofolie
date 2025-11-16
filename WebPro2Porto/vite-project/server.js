import express from "express"; //Get express and the getData function
import { getData } from "./FetchData.js"

const exapp = express();
const port = 3000;

console.log("✅ server.js is running from:", import.meta.url);

exapp.get("/api/getData", async(req, res) => {
    try {
        await getData();
        console.log("Passed await getData()");
        res.json({message: "Data has been fetched and stored in database"});
    } catch (error) {
        res.status(500).json({message: "An error occurred when running getData()"});
    }
    console.log("Made it to the end of server.js code")
});

exapp.listen(port, () => console.log("backend running at localhost port 3000"));