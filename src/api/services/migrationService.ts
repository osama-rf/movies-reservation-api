import MovieModel from '../models/movie';
import TimeslotModel from '../models/timeslot';
import {ErrorMessages, SuccessMessages} from "../utils/constants";

interface MovieSeed {
    title: string;
    timeslots: {
        startTime: Date;
        endTime: Date;
        capacity: number;
    }[];
}

const movieData: MovieSeed[] = [
    {
        title: 'La la land',
        timeslots: [
            {
                startTime: new Date('2023-12-17T09:00:00'),
                endTime: new Date('2023-12-20T11:00:00'),
                capacity: 25
            },
            {
                startTime: new Date('2023-12-17T12:00:00'),
                endTime: new Date('2023-12-20T14:00:00'),
                capacity: 10
            },
        ]
    },
    {
        title: 'Napoleon',
        timeslots: [
            {
                startTime: new Date('2023-12-17T09:00:00'),
                endTime: new Date('2023-12-20T11:00:00'),
                capacity: 20
            },
            {
                startTime: new Date('2023-12-17T09:00:00'),
                endTime: new Date('2023-12-20T11:00:00'),
                capacity: 15
            },
        ]
    },
    {
        title: 'Parasite',
        timeslots: [
            {
                startTime: new Date('2023-12-17T09:00:00'),
                endTime: new Date('2023-12-20T11:00:00'),
                capacity: 20
            },
            {
                startTime: new Date('2023-12-17T09:00:00'),
                endTime: new Date('2023-12-20T11:00:00'),
                capacity: 10
            },
        ]
    }
];

export const seedMoviesToDb = async () => {
    try {
        for (const movie of movieData) {
            const timeslotDocs = await TimeslotModel.insertMany(movie.timeslots);
            const timeslotIds = timeslotDocs.map(timeSlotId => timeSlotId._id);
            const movieDoc = new MovieModel({
                title: movie.title,
                timeslots: timeslotIds
            });
            await movieDoc.save();
        }

        console.log(SuccessMessages.SeedMoviesSuccess);
    } catch (error) {
        console.log(ErrorMessages.SeedMoviesError, error);
    }
};