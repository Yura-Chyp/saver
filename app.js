const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://rude22:${process.env.DBPassword}@cluster0.pxa4wp9.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Connected to mongoDB`);
})
.catch((err) => {
    console.error(`Error connecting to Mongo: ${err}`);
});


const User = mongoose.model('User', {
    login: String,
    password: String
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/submit', async (req, res) => {
    try {
        const { login, password } = req.body;
        const saltRounds = 10; 
        

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.findOne({ login });

        const newUser = new User({ login, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'Data saved' });
    } catch (error) {
        console.log(`Error processing the form`);
        res.status(500).json({ error: 'An error occurred while processing the form' });
    }
});
const userSchema = new mongoose.Schema({
    site: String,
    password: String
});

const Usere = mongoose.model('Usere', userSchema);

app.use(bodyParser.json());

app.post('/submt', async (req, res) => {
    try {
        const { site, password } = req.body;

        const newUsere = new Usere({ site, password });
        await newUsere.save();

        res.status(200).json({ message: 'Data saved' });
    } catch (error) {
        console.error('Error processing the form:', error);
        res.status(500).json({ error: 'An error occurred while processing the form' });
    }
});

app.get('/get-users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(`Error getting users: ${error}`);
        res.status(500).json({ error: 'Error getting users' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','home.html'))
})


app.listen(PORT, () => {
    console.log(`Server works on port: ${PORT}`);
});
