const mongoose = require("mongoose");


const connect = async (req, res) => {
    return  mongoose.connect("mongodb+srv://mansurdewan26:Ragnar4827@cluster0.psd8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}

module.exports = connect;