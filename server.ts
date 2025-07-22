import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectToDatabase from "./config/database";
import cdmRoutes from "./routes/cdmRoutes";
import otherRoutes from "./routes/otherRoutes";
import { scheduleCleanCloudinary } from './config/cloudinary';

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json({ limit: "150kb" }));

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "150kb", extended: true }));

app.use("/cdm-data", cdmRoutes);
app.use("/", otherRoutes);

app.listen(port, () => console.log('Server Started'));

scheduleCleanCloudinary();

export default app;
