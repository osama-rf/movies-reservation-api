import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {connectToDB} from "./api/config/dbConfig";
import movieRoutes from './api/routes/movieRoutes';
import reservationRoutes from './api/routes/reservationRoutes';
import {SuccessMessages} from "./constants";
import errorHandler from "./api/middlewares/errorHandler";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';



const app = express();

// Global error handler middleware
app.use(errorHandler);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'your-mongo-uri';

app.use(bodyParser.json());
connectToDB(MONGO_URI)

// Swagger UI
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/v1/", (req: Request, res: Response) => {
    res.send("Hello Movies!");
});

app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/reservations', reservationRoutes);

const port = process.env.PORT || 'your-port';
app.listen(port, () => console.log(SuccessMessages.SERVER_RUNNING));

export default app;