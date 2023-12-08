import {Router} from "express";
import {checkAvailability, reserveTimeSlot} from "../controllers/reservationController";

const router = Router();

/**
 * @swagger
 * /api/v1/reservations/check-availability/{movieId}/{timeSlotId}:
 *   get:
 *     summary: Check the availability of a specific time slot for a movie
 *     description: Retrieve the remaining capacity for a given time slot of a movie.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: Unique ID of the movie.
 *         schema:
 *           type: string
 *       - in: path
 *         name: timeSlotId
 *         required: true
 *         description: Unique ID of the time slot.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The remaining capacity of the time slot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableCapacity:
 *                   type: integer
 *                   description: The available capacity for the time slot.
 *       400:
 *         description: Invalid input or time slot not found.
 *       500:
 *         description: Internal Server Error
 */
router.get("/check-availability/:movieId/:timeSlotId", checkAvailability);

/**
 * @swagger
 * /api/v1/reservations/reserve:
 *   post:
 *     summary: Reserve a time slot for a movie
 *     description: Reserve a specific number of seats for a movie at a given time slot.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: Unique ID of the movie.
 *               timeSlotId:
 *                 type: string
 *                 description: Unique ID of the time slot.
 *               numberOfPeople:
 *                 type: integer
 *                 description: Number of seats to reserve.
 *     responses:
 *       200:
 *         description: Reservation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reserveMessage:
 *                   type: string
 *                   description: Confirmation message of the reservation.
 *       400:
 *         description: Invalid input, not enough capacity, or time slot not found.
 *       500:
 *         description: Internal Server Error
 */
router.post("/reserve", reserveTimeSlot);

export default router;