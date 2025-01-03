import express from 'express';
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/frank_profile')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use("/api",router)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});