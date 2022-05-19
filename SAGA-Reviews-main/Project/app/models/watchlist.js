let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let watchlistSchema = new Schema({
    user_id: String,
    content_id: Number,
    name: String,
    title: String
})

let WatchList = mongoose.model("WatchList", watchlistSchema, "WatchList");
module.exports = WatchList;