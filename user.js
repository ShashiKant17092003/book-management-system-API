const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{type:String},
    username:{type:String},
    password:{type: String}
});

mongoose.connect(process.env.mongoDb_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Aureal" })

const user = mongoose.model('User',userSchema);

module.exports=user;