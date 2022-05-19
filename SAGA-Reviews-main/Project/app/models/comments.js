let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let commentsSchema = new Schema({
    content_id: Number,
    name: String,
    comment: String
})

let Comments = mongoose.model("Comments", commentsSchema, "Comments");
module.exports = Comments;