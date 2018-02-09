var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }]
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;