import {Document} from "mongoose";

export interface MoviesListDto {
    id?: string;
    title: string;
    timeslots: TimeSlotDto[];
}

export interface TimeSlotDto {
    id?: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    bookedCount: number;
}

// Map the movie document to the DTOs, so that the API doesn't expose the database structure
export const mapToMovieListDto = (movies: Document[]): MoviesListDto[] => {
    return movies.map(movie => ({
        id: movie.get('_id'),
        title: movie.get('title'),
        timeslots: movie.get('timeslots').map((timeSlot: Document) => ({
            id: timeSlot.get('_id'),
            startTime: timeSlot.get('startTime'),
            endTime: timeSlot.get('endTime'),
            capacity: timeSlot.get('capacity'),
            bookedCount: timeSlot.get('bookedCount')
        }))
    }));
};