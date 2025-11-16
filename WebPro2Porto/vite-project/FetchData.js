//Code for importing data from DMI using API and for using MongoDB
import { error } from "console";
import { promises as fs } from "fs";
import { json } from "stream/consumers";
import path from "path";
import {MongoClient} from "mongodb";


//The url. Contains both API key and query request. We can chance this depending on what information we want to get from the api. Query is needed unless we want a million random weather data xD
const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=b716f5e5-6105-4382-9077-10efa88df0c3&parameterId=weather&limit=5";

//Json files
const inputFile = path.resolve("weather_data.json")
const outputFile = path.resolve("weather_data_clean.json")

//MongoDB
const Mongo_Connection = "mongodb://localhost:27017"; //Standart local host for MongoDB Database
const DB_Name = "weatherDB"; //Database name
const Collection_Name = "dmi_weather_data"; //Collection name


async function fetchAndSaveWeatherData()
{
    try{
    const response = await fetch(url); //Makes HTTP request and waits for a response. The response is stored in response object.
    if (!response.ok){ //check if an error occured while trying to call the API, ex. 404. If an error occured stop running the function and send error message.
        throw new Error(`HTTP ${response.status} - ${response.statusText}`) //returns the error status and error text; ex. "HTTP 404 - Not Found"
    }

    const data = await response.json(); //reads file and parses to JSON. If the data is not in valid JSON format throw error instead.

    await fs.writeFile("weather_data.json", JSON.stringify(data, null, 2), "utf8"); //write data into weather_data.json file. "utf8" ensures that we can use danish letters should we run into some in the data.
    console.log("Successfully called and stored data :)");
    }
    catch(error){
        console.error("Error fetching weather data", error);
    }
}


//find an array that contains "features". We don't get all the extra information from DMI, just the weather data
function findArrayObject(obj){
    const arrayKey = "features";

    if (Array.isArray(obj[arrayKey])){  //Check that it actually is an array
        return {array: obj[arrayKey], key: arrayKey};
    }

    //DMI outputs GEOjson format, so we make the data ready for MongoDB
    if (Array.isArray(obj.features && obj.features.length > 0 && obj.features[0] && obj.features[0].properties))  //Check if the array we found has features and properties and isn't empty
    {
        const mappedArray = obj.features.map(function (f) {  //Map the features to a new array. If it has properties map those with their values else just map f
            if (f.properties !== null && f.properties !== undefined){
                return f.properties;
            } else {
                return f;
            }
        });
        return {array: mappedArray, key: "features->properties"}
    }
    return null; //if we don't find anything return null
}

//Function to make the JSON from GEOjson to MongoDB readable JSON file
async function makeCleanFile(){
    try {
        //read the input file ad parse it to json
        const rawData = await fs.readFile(inputFile, "utf8");
        const jsonFile = JSON.parse(rawData);

        //If jsonFile is already an array just put it in directly
        if (Array.isArray(jsonFile)){
            await fs.writeFile(outputFile, JSON.stringify(jsonFile, null, 2), "utf8");
            return jsonFile;
        }

        //if it's not already an array, find an array. If we don't find one throw error
        const arrayObj = findArrayObject(jsonFile);
        if (!arrayObj){
            throw new Error ("Could not find array object");
        }

        //Write the array to the clean file
        const doc = arrayObj.array;
        await fs.writeFile(outputFile, JSON.stringify(doc, null, 2), "utf8");
        return doc;

    } catch (error) { //if any fails exit the code
        console.error("failed to make clean JSON file");
        process.exit(1);
    }
}

//Function for adding data to MongoDB database
async function exportDataToMongoDB(docs){
    const Client = new MongoClient(Mongo_Connection);

    try{
        await Client.connect(); //Try to connect to mongoDB

        //Get the name of the database and the collection
        const db = Client.db(DB_Name);
        const collecton = db.collection(Collection_Name);

        if (!Array.isArray(docs)){ //check if the document passed in the argument actually is an array
            console.log("not an array docs");
            return;
        }

        const result = await collecton.insertMany(docs); //Insert the data from the passed document to the mongoDB database
        console.log("Yay!");

        const insertedIds = Object.values(result.insertedIds); //Get data back from the database for displaying on website
        const insertedDoc = await collection.find({ _id: { $in: insertedIds } }).toArray();

        return insertedDoc;

    } catch(error){
        console.error(error); //catch any potential errors
    } finally{
        console.log("Closing connection");
        await Client.close(); //close the connection. Done in finally to make sure it runs regardless of errors.
    }
}

//Run all functions
export async function getData(){
    await fetchAndSaveWeatherData();
    const cleanJson = await makeCleanFile();
    await exportDataToMongoDB(cleanJson);
}


//getData();
