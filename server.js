import express from "express";
const app = express();
import bodyParser from "body-parser";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";

app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
