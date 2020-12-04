const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        newsId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }
);
const  Saved = mongoose.model("Saved", userSchema);
module.exports = Saved;