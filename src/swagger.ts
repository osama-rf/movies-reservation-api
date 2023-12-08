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
}

const options = {
    swaggerDefinition,
    apis: ['./src/api/routes/*.ts'],
};

export default options;