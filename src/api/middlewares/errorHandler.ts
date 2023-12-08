import {Request, Response, NextFunction} from "express";
import {ErrorMessages} from "../../constants";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send(ErrorMessages.INTERNAL_SERVER_ERROR);
};

export default errorHandler;
