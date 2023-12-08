import {Request, Response} from 'express';
import {checkTimeSlotAvailability, reservedTimeSlot} from '../services/reservationService';
import {AvailabilityCheckDto} from '../dto/availabilityCheckDto';
import {ReservationDto} from '../dto/reservationDto';
import {ErrorMessages} from "../utils/constants";
import mongoose from "mongoose";

export const checkAvailability = async (req: Request, res: Response): Promise<Response<AvailabilityCheckDto>> => {
    const {movieId, timeSlotId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(movieId) || !mongoose.Types.ObjectId.isValid(timeSlotId)) {
        return res.status(400).json({message: ErrorMessages.InvalidId});
    }
    try {
        const availability = await checkTimeSlotAvailability(movieId, timeSlotId);
        return res.json(availability);
    } catch (error) {
        console.error('Error checking availability:', error);
        return res.status(500).json({message: ErrorMessages.ErrorCapacity});
    }
};

export const reserveTimeSlot = async (req: Request, res: Response): Promise<Response<ReservationDto>> => {
    const {movieId, timeSlotId, numberOfPeople} = req.body;
    if (numberOfPeople <= 0) {
        return res.status(400).json({message: ErrorMessages.InvalidNumberOfPeople});
    }
    if (!mongoose.Types.ObjectId.isValid(movieId) || !mongoose.Types.ObjectId.isValid(timeSlotId)) {
        return res.status(400).json({message: ErrorMessages.InvalidId});
    }
    try {
        const reservation = await reservedTimeSlot(movieId, timeSlotId, numberOfPeople);
        return res.json(reservation);
    } catch (error) {
        console.error('Error reserving time slot:', error);
        return res.status(500).json({message: ErrorMessages.ErrorCapacity});
    }
};