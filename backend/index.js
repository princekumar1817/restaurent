import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";




const app = express();
app.use(cors({ credentials: true, origin: true }));
dotenv.config({ path: "./config/config.env" });


app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true,
    })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);
dbConnection();
app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})