const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    id : {type : Number},
    name : {type : String},
    city : {type : String},
    age : {type : Number},
    education : {type : String},
    contact : {type : Number}
})


const Student = mongoose.model("student", studentSchema);
module.exports = Student;