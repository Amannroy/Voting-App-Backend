import express from "express";
const app = express();
import bodyParser from "body-parser";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";
import userRoutes from  "./routes/userRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";

app.use(bodyParser.json());
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
