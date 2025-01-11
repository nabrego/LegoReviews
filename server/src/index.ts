import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ratingsRouter from "./routes/ratings";
import setsRouter from "./routes/lego-sets";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/ratings", ratingsRouter);
app.use("/api", setsRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const mongoURI: string = process.env.MONGO_URI || "";

mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.log("FAILED TO CONNECT TO MONGODB", err));

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`SERVER IS RUNNING ON PORT ${port}`);
    });
}

export default app;