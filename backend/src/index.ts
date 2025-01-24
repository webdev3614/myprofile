import express from 'express';
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import {
  secret
} from "./middleware";

dotenv.config();

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(bodyParser.json())
app.use(secret)
mongoose.connect('mongodb://localhost:27017/dream')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use("/api", router)

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});