import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { taskRouter } from "./task.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config({ path: 'E:/Tasker/.env'});

const { ATLAS_URI } = process.env;


if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        app.use("/tasks", taskRouter);
        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });
    })
    .catch(error => console.error(error));