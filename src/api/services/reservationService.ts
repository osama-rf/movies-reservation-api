import MovieModel from '../models/movie';
import TimeSlotModel from "../models/timeslot";
import {mapToMovieListDto, MoviesListDto} from "../dto/moviesListDto";
import {AvailabilityCheckDto} from "../dto/availabilityCheckDto";
import {ReservationDto} from "../dto/reservationDto";
import {ErrorMessages} from "../utils/constants";

export const listAvailableMovies = async (): Promise<MoviesListDto[]> => {
    try {
        const movies = await MovieModel.find().populate('timeslots');
        return mapToMovieListDto(movies);
    } catch (error) {
        console.log(ErrorMessages.ErrorListingMovies);
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
            throw new Error(ErrorMessages.MovieOrTimeSlotNotFound);
        }

        const timeslot = movie.timeslots[0];
        return {
            availableCapacity: timeslot.capacity - timeslot.bookedCount,
        }

    } catch (error) {
        console.log(ErrorMessages.ErrorCheckingTimeSlotAvailability);
        throw new Error(ErrorMessages.ErrorCheckingTimeSlotAvailability)
    }
}

export const reservedTimeSlot = async (movieId: string, timeSlotId: string, numberOfPeople: number): Promise<ReservationDto> => {
    try {
        const timeslot = await TimeSlotModel.findById(timeSlotId);

        if (!timeslot || timeslot.capacity === undefined || timeslot.bookedCount === undefined) {
            throw new Error(ErrorMessages.ErrorTimeSlot);
        }

        if (timeslot.capacity - timeslot.bookedCount < numberOfPeople) {
            throw new Error(ErrorMessages.ErrorCapacity);
        }

        timeslot.bookedCount += numberOfPeople;
        await timeslot.save();

        const movie = await MovieModel.findById(movieId);

        return {
            reserveMessage: `Reserved ${numberOfPeople} seats for ${movie?.title} at ${timeslot.startTime}`
        };
    } catch (error) {
        console.error(error);
        throw new Error(ErrorMessages.ErrorReservingTimeSlot);
    }
};