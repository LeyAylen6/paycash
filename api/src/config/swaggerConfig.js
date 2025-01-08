const { DB_HOST, DB_PORT } = require('dotenv').config();

const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'Paycash - People',
        version: '1.0.0',
        description: 'API to manage a catalog of people',
    },
    servers: [
        {
            url: `${DB_HOST}:${DB_PORT}`,
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            People: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'Unique identifier for a person',
                    },
                    name: {
                        type: 'string',
                        description: 'First name of the person',
                    },
                    lastname: {
                        type: 'string',
                        description: 'Last name of the person',
                    },
                    gender: {
                        type: 'string',
                        enum: ['Male', 'Female', 'Other'],
                        description: 'Gender of the person',
                    },
                    birthdate: {
                        type: 'string',
                        format: 'date',
                        description: 'Birth date of the person in YYYY-MM-DD format',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the person',
                    },
                    phone: {
                        type: 'string',
                        description: 'Phone number of the person',
                    },
                    maritalStatus: {
                        type: 'string',
                        enum: ['Married', 'Divorced', 'Widowed', 'Single'],
                        description: 'Marital status of the person',
                    },
                },
                required: ['name', 'lastname', 'gender', 'birthdate', 'email', 'phone', 'maritalStatus'],
            },
        },
    },
    paths: {
        '/people': {
            get: {
                summary: 'Get all people',
                tags: ['People'],
                responses: {
                    200: {
                        description: 'List of people retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/People',
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Internal server error',
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new person',
                tags: ['People'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/People',
                            },
                            example: {
                                name: "John",
                                lastname: "Doe",
                                gender: "Male",
                                birthdate: "1990-01-01",
                                email: "john.doe@example.com",
                                phone: "123-456-7890",
                                maritalStatus: "Single"
                            }
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'People created successfully',
                        content: {},
                    },
                    400: {
                        description: 'Invalid data',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Invalid data',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Internal server error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/people/{id}': {
            delete: {
                summary: 'Delete a People by ID',
                tags: ['People'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'ID of the person to delete',
                    },
                ],
                responses: {
                    200: {
                        description: 'Person deleted successfully',
                        content: {},
                    },
                    400: {
                        description: 'Invalid ID parameter',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'ID parameter is required',
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Person not found',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Person not found',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Internal server error',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update a person by ID',
                tags: ['People'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'ID of the person to update',
                    },
                ],
                responses: {
                    200: {
                        description: 'Person updated successfully',
                        content: {},
                    },
                    400: {
                        description: 'Invalid ID parameter',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'ID parameter is required',
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Person not found',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Person not found',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'Internal server error',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = { swaggerDocs };