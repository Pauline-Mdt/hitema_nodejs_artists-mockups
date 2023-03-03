import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

mongoose.connect('mongodb://localhost:27017/my_db');

dotenv.config();

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});