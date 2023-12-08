import MovieModel from '../models/movie';
import TimeSlotModel from "../models/timeslot";
import {mapToMovieListDto, MoviesListDto} from "../dto/moviesListDto";
import {AvailabilityCheckDto} from "../dto/availabilityCheckDto";
import {ReservationDto} from "../dto/reservationDto";
import {ErrorMessages} from "../../constants";

export const listAvailableMovies = async (): Promise<MoviesListDto[]> => {
    try {
        const movies = await MovieModel.find().populate('timeslots');
        return mapToMovieListDto(movies);
    } catch (error) {
        console.log(ErrorMessages.ERROR_LISTING_MOVIES);
        throw error;
    }
};

export const checkTimeSlotAvailability = async (movieId: string, timeSlotId: string): Promise<AvailabilityCheckDto> => {
    try {
        const movie = await MovieModel.findById(movieId).populate({
            path: 'timeslots',
            match: {
                _id: timeSlotId
            }
        });

        if (!movie || !movie.timeslots || movie.timeslots.length === 0) {
            throw new Error(ErrorMessages.MOVIE_OR_TIME_SLOT_NOT_FOUND);
        }

        const timeslot = movie.timeslots[0];
        return {
            availableCapacity: timeslot.capacity - timeslot.bookedCount,
        }

    } catch (error) {
        console.log(ErrorMessages.ERROR_CHECKING_TIME_SLOT_AVAILABILITY);
        throw new Error(ErrorMessages.ERROR_CHECKING_TIME_SLOT_AVAILABILITY)
    }
}

export const reservedTimeSlot = async (movieId: string, timeSlotId: string, numberOfPeople: number): Promise<ReservationDto> => {
    try {
        const timeslot = await TimeSlotModel.findById(timeSlotId);

        if (!timeslot || timeslot.capacity === undefined || timeslot.bookedCount === undefined) {
            throw new Error(ErrorMessages.ERROR_TIME_SLOT);
        }

        if (timeslot.capacity - timeslot.bookedCount < numberOfPeople) {
            throw new Error(ErrorMessages.ERROR_CAPACITY);
        }

        timeslot.bookedCount += numberOfPeople;
        await timeslot.save();

        const movie = await MovieModel.findById(movieId);

        return {
            reserveMessage: `Reserved ${numberOfPeople} seats for ${movie?.title} at ${timeslot.startTime}`
        };
    } catch (error) {
        console.error(error);
        throw new Error(ErrorMessages.ERROR_RESERVING_TIME_SLOT);
    }
};