const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3000;

mongoose.connect(`mongodb+srv://admun:${process.env.DBPassword}@cluster0.vo8hxvk.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Connected to mongoDB`);
})
.catch((err) => {
    console.error(`Error conecting to Mongo: ${err}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
})