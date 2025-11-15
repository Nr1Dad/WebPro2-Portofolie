import express from "express"; //Get express and the getData function
import getData from "./FetchData"

const exapp = express();
const port = 3000;

exapp.get("/call/getData", async(req, res) => {
    try {
        await getData();
        res.json({message: "Data has been fetched and stored in database"});
    } catch (error) {
        res.status(500).json({message: "An error occurred when running getData()"});
    }
});

exapp.listen(port, () => console.log("backend running at localhost port 3000"));