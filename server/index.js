import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
    console.log(err);
    });

const app = express();
app.use(cors(
    {
        origin: ["https://deploymern-fe-riggina.vercel.app"]
    }
));

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.json("Hello");
})
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})