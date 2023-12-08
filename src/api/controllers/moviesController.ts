import {Request, Response} from "express";
import {listAvailableMovies} from "../services/reservationService";
import {MoviesListDto} from "../dto/moviesListDto";
import {ErrorMessages} from "../constants";

export const getAllMovies = async (req: Request, res: Response): Promise<Response<MoviesListDto[]>> => {
    try {
        const movies = await listAvailableMovies();
        return res.json(movies);
    } catch (error) {
        return res.status(400).json({message: ErrorMessages.ERROR_LISTING_MOVIES});
    }
};