// Schema definition for Music

const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    Language: String,
    Album: String,
    Name: String,
    Path: String
});

module.exports = new mongoose.model("Music", musicSchema);