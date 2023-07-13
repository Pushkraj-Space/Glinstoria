const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const cluster = process.env.MONGO_CLUSTER;

// let uri = `mongodb+srv://${username}:${password}@${cluster}.rjuzmug.mongodb.net/?retryWrites=true&w=majority`
let uri = `mongodb://127.0.0.1:27017/glint`
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});     

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log("Connected to database"));

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

// Home path
app.get('/', (req,res) => {
    res.send("Welcome to Glinstoria");
})

const port =  process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log("GlinStoria Running")
})


