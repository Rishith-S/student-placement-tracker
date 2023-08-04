const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    college:{
      type: String,
      ref: 'college',
    },
    marks: String,
    branch:{
      type:String,
      ref:'branch'
    },
    placement:String,
    rollno:String
});

module.exports = mongoose.model("students",studentSchema)
  