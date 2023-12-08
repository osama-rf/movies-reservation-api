import mongoose from 'mongoose';
import {seedMoviesToDb} from "../services/migrationService";
import {SuccessMessages} from "../constants";

export const connectToDB = async (mongoUri: string) => {
    try {
        await mongoose.connect(mongoUri);
        console.log(SuccessMessages.CONNECTION_SUCCESS);

        // check if movies and timeslots collections are empty and seed them if they are.
        // to avoid seeding every time the server starts
        // Check also if movies exist but timeslots don't exist or vice versa and seed them if they do. or delete them if they don't. to avoid inconsistency
        const moviesCount = await mongoose.connection.db.collection('movies').countDocuments();
        const timeslotsCount = await mongoose.connection.db.collection('timeslots').countDocuments();
        if (moviesCount === 0 && timeslotsCount === 0) {
            await seedMoviesToDb();
        } else if (moviesCount === 0 && timeslotsCount > 0) {
            await mongoose.connection.db.collection('timeslots').deleteMany({});
            await seedMoviesToDb();
        } else if (moviesCount > 0 && timeslotsCount === 0) {
            await mongoose.connection.db.collection('movies').deleteMany({});
            await seedMoviesToDb();
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}