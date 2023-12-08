import {Request, Response, NextFunction} from "express";
import {ErrorMessages} from "../utils/constants";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send(ErrorMessages.InternalServerError);
};

export default errorHandler;
