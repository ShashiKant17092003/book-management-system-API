const express = require('express');
const App = express();
const Books = require('./books');
const User = require('./user');
const auth = require('./Authentication');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const Secret = process.env.Secret;

App.use(express.json());

App.get('/books',auth, async (req,res)=>{
    try{
        const books = await Books.find({});
        return res.json({books});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server Error"});
    }
})

App.post('/books', auth, async (req, res) => {
    try {
        const title = req.body.title;
        if (await Books.findOne({ title })) {
            return res.json({ message: 'book already exist' });
        } else {
            let book_id = Math.floor(Math.random() * 1000000) + 1;
            req.body.id = book_id;
            let book = new Books(req.body);
            await book.save();
            return res.json({ message: 'book added succefully',book_id:book_id });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server Error" });
    }
})

App.put('/books/:id',auth, async (req,res)=>{
    const id  = req.params.id;
    try{
        const book = await Books.findOneAndUpdate(id,req.body,{new:true});
        if(book){
            return res.json({message:'book updates successfully'})
        }else{
            return res.status(404).json({ message: 'book not found' });        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server Error"});
    }
})

App.delete('/books/:id',auth, async (req,res)=>{
    const {id}=req.params;
    try{
        const book=await Books.findOneAndDelete({id:id});
        if(!book){
            return res.status(404).json({message:"book not found"});
        }
        return res.json({message:"Deleted Successfully"});
    }catch(err){
        return res.status(500).json({message:"Internal server Error"});
    }
})

App.post('/user/signup', async (req, res) => {
    try {
        const username = req.body.username;
        let user = await User.findOne({username});
        if (!user) {
            const user = new User(req.body);
            await user.save();
            const token = jwt.sign({ username, role: 'user' }, Secret, { expiresIn: '12h' });
            return res.json({ message: 'signed Up succesfully',token:token });
        } else {
            return res.json({ message: 'Failed to create account' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server Error" });
    }
})

App.post('/user/login', async (req, res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({ username , password });
        if (user) {
            const token = jwt.sign({ username, role: 'user' }, Secret, { expiresIn: '12h' });
            return res.json({ message: 'login succesfully',token:token });
        } else {
            return res.json({ message: 'authentication failed' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server Error" });
    }
})



App.listen(PORT, () => {
    console.log('Server Running on port 3000');
})