# Movie Reservation System API

## Introduction
This is a RESTful API for managing a movies reservation. It allows users to view available movies, check the availability of specific time slots for movies, and reserve time slots. The API is built using Node.js with Express.js and MongoDB.

## Project Structure
```
movie-reservation-system/
│
├── node_modules/
│
├── src/
│   ├── api/
│   │   ├── controllers/       # Route controllers
│   │   ├── middlewares/       # Express middlewares
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   └── services/          # Business logic
│   │
│   ├── config/                # Configuration files
│   └── app.ts                 # Express app initialization
│   └── swagger.ts             # Swagger file
│   └── constants.ts           # Constants used in the app
│
├── .env                       # Environment variables
├── package.json
├── README.md
└── tsconfig.json              # TypeScript configuration
```

## How to Use
1. **Installation**
   - Clone the repository: `git clone [repository URL]`
   - Navigate to the project directory: `cd movie-reservation-system`
   - Install dependencies: `npm install`

2. **Setting Up the Environment**
   - Create a `.env` file in the root directory.
   - Add the MongoDB URI and other configuration settings:
     ```
     MONGO_URI=your_mongodb_uri
     PORT=3000 or any other port you want to use
     ```

3. **Running the Application**
   - Run the server: `npm start`
   - The application will be available at `http://localhost:3000`.

4. **Seed the Database**
   - By default, when running the application for the first time, the movies data will be automatically seed the database, So feel free to test the endpoints.

5. **Endpoints**
   - The API endpoints are available at `http://localhost:3000/api/v1`.
   - The app contains the following endpoints:
     - `GET /movies` - Get all movies from the database.
     - `GET /reservations/check-availability/:movieId/:timeSlotId` - Check the availability of a movie based on the capacity.
     - `POST /reservations/reserve` The request body should include `movieId`, `timeSlotId`, and `numberOfPeople` parameters. This endpoint is for making reservations and managing bookings.

6. **API Documentation**
   - Access the Swagger documentation at `http://localhost:3000/api-docs` for detailed information and testing of API endpoints.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
