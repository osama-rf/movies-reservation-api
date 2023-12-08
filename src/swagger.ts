const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Movies Reservation System API',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data for a movie reservation system.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            Movie: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        format: 'ObjectId',
                        description: 'The unique identifier of the movie'
                    },
                    title: {
                        type: 'string',
                        description: 'The title of the movie'
                    },
                    timeslots: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/TimeSlot'
                        }
                    }
                }
            },
            TimeSlot: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        format: 'ObjectId',
                        description: 'The unique identifier of the time slot'
                    },
                }
            }
        },
    }
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/routes/*.ts'],
};

export default options;
