import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes';

mongoose.connect('mongodb://localhost:27017/my_db');

dotenv.config();

const port = 3000;
const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Connected to API.')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});