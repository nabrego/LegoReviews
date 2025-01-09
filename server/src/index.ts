// s7Vxq9nItQl893DE
import express, { Express} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ratingsRouter from "./routes/ratings";
import setsRouter from "./routes/lego-sets";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || "";

mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.log("FAILED TO CONNECT TO MONGODB", err));

app.use("/", ratingsRouter);
app.use("/api", setsRouter);

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});