import { Router } from 'express';
import { getAllMovies } from '../controllers/moviesController';

const router = Router();

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Retrieve a list of movies with their available time slots.
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', getAllMovies);

export default router;
