
import dotenv from 'dotenv';
dotenv.config(); 
import express from "express"
import {connectDB} from "./utils/db.utils.js"
import { router } from "./routes/job.route.js";
import cors from "cors"

// Initialize Express app
const app = express();

app.use(cors({origin:"*"}))

connectDB();


app.use(express.json()); 


app.use('/api', router);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
