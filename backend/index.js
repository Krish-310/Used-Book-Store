import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins
app.use(cors());
// Option 2: Allow Custom Periods
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Yay");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
        .then(() => {
            console.log("App connected to Database");
            app.listen(PORT, () => {
                console.log(`App is listening to port: ${PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
        })


