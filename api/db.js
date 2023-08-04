const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://RishithSaginala:rishith83@cluster0.2hhjm5u.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"Colleges",
});

mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));