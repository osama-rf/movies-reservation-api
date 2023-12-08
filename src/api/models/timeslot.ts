import mongoose from 'mongoose';

export interface TimeSlot {
    startTime: Date;
    endTime: Date;
    capacity: number;
    bookedCount: number;
}

const timeSlotSchema = new mongoose.Schema<TimeSlot>({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    capacity: {type: Number, required: true},
    bookedCount: {type: Number, default: 0}
});

const TimeSlotModel = mongoose.model<TimeSlot>('Timeslot', timeSlotSchema);

export default TimeSlotModel;
