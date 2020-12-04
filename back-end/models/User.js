const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        creator: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);
const  User = mongoose.model("User", userSchema);
module.exports = User;