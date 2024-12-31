import express from "express";
const app = express();
import bodyParser from "body-parser";
import { PORT } from "./config/serverConfig.js";

app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server ids running on PORT ${PORT}`);
});
