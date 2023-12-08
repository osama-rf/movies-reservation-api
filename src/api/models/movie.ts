import mongoose from 'mongoose';
import {TimeSlot} from './timeslot';

interface Movie {
    title: string;
    timeslots: TimeSlot[];
}

const movieSchema = new mongoose.Schema<Movie>({
    title: {
        type: String,
        required: true
    },
    timeslots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timeslot'
    }]
});

const MovieModel = mongoose.model<Movie>('Movie', movieSchema);

export default MovieModel;
