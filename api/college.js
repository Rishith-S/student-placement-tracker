const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: String,
});




module.exports = mongoose.model("colleges",collegeSchema)