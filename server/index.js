// Importing the require modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const fileupload = require('express-fileupload')

// Importing the environment variables
require("dotenv/config");

// Creating the folder "uploads" to upload the music files
var folder = process.env.FOLDER;
!fs.existsSync(`./${folder}`) && fs.mkdirSync(`./${folder}`, { recursive: true });

// setting up mongodb using mongoose
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error(
        "MongoURI isn't provided"
    );
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo", err);
});

// Getting the model
const musicModel = require("./models/Music.js");

// setting up the express application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// posting a music file to the model
app.post("/uploadMusic", fileupload(), (req, res, next) => {

    const fileName = req.files.music.name.split(" ").join("_");

    const dirName = __dirname.replace(/\\/g, "/");
    const path = dirName + `/${process.env.FOLDER}/` + fileName;

    if (fs.existsSync(path)) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            status: "success",
            message: "File already present"
        }));
    }

    else {
        req.files.music.mv(path, async (err) => {

            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    status: "error",
                    message: err.message
                }));
            }

            else {
                var obj = {
                    "Album": req.body.albumName,
                    "Language": req.body.language,
                    "Name": fileName.split("_").join(" ").split(".")[0],
                    "Path": `/${fileName}`
                }
                await musicModel.create(obj, (err, item) => {
                    if (err) {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.status(400).json({
                            status: "error",
                            message: err.message
                        });
                    }
                    else {
                        item.save();
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({ status: 'success', message: "Successfully saved" }));
                    }
                });
            }
        });
    }
});


app.get("/getFiles", async (req, res) => {
    const data = await musicModel.find({}, { __v: 0 });
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        status: "success",
        data
    }));
});

// Setting up the port
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});