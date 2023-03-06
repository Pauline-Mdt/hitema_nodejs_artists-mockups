import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import routes from './src/routes';
import {tokenDefined} from './src/middewares/authMiddleware';
import {handleErrors} from './src/middewares/errorMiddleware';

dotenv.config();

mongoose.connect('mongodb://localhost:27017/my_db');

const port = 3000;
const app = express();

app.use(express.json());
app.use(tokenDefined());
app.use(handleErrors);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(routes);

app.get('/', (req, res) => {
    res.send('Connected to API.')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});