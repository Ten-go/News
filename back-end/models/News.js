const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim: true,
            required: true
        },
        body: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);
const  News = mongoose.model("News", userSchema);
module.exports = News;