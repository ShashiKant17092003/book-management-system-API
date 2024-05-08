const mongoose = require('mongoose');
require('dotenv').config();

const bookSchema = new mongoose.Schema({
    id:{type:Number},
    title:{type:String},
    author:{type:String},
    desc:{type:String},
    books:{type:Number}
});

mongoose.connect(process.env.mongoDb_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Aureal" })

const Book = mongoose.model('Book',bookSchema);

module.exports=Book;