const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tengo:29092009@cluster0.kukpd.mongodb.net/news?retryWrites=true&w=majority",{ 
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on("error",error => {
    console.log(error);
    process.exit(1);
});
mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
});