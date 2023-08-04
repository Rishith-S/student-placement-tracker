const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model("branches",branchSchema)