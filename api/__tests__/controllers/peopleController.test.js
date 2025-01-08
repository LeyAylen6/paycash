const request = require('supertest');
const app = require('../../src/app'); // Ruta al archivo principal donde defines tus rutas
const { createPeopleCommand } = require('../../src/commands/createPeopleCommand');
const { deletePeopleByIdCommand } = require('../../src/commands/deletePeopleByIdCommand');
const { updatePeopleByIdCommand } = require('../../src/commands/updatePeopleByIdCommand');
const { getAllPeopleQuery } = require('../../src/queries/getAllPeopleQuery');
const { getAllPeople, createPeople, deletePeopleById, updatePeopleById } = require('../../src/controllers/peopleController');
const { isValidPeople } = require('../../src/utils/validation');

jest.mock('../../src/commands/createPeopleCommand');
jest.mock('../../src/commands/deletePeopleByIdCommand');
jest.mock('../../src/commands/updatePeopleByIdCommand');
jest.mock('../../src/queries/getAllPeopleQuery');

describe('People Controller Tests', () => {

    describe('getAllPeople Controller', () => {
        let req, res, mediator;

        beforeEach(() => {
            mediator = {
                send: jest.fn(),
            };

            req = {
                app: {
                    get: jest.fn().mockReturnValue(mediator),
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        it('should return a list of people with a 200 status', async () => {
            const mockData = [{ id: 1, name: 'John Doe' }];
            mediator.send.mockResolvedValue(mockData);

            await getAllPeople(req, res);

            expect(mediator.send).toHaveBeenCalledWith(getAllPeopleQuery());
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should handle errors and return a 500 status', async () => {
            mediator.send.mockRejectedValue(new Error('Internal error'));

            await getAllPeople(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
        });
    });


    describe('POST /api/people', () => {
        let req, res, mediator;

        beforeEach(() => {
            mediator = {
                send: jest.fn(),
            };

            req = {
                app: {
                    get: jest.fn().mockReturnValue(mediator),
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(function (data) {
                    this.body = data;
                }),
                send: jest.fn(),
            };
        });

        it('should create a new person and return status 201', async () => {
            const people = {
                name: "John",
                lastname: "Doe",
                gender: "Male",
                birthdate: "1990-01-01",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                maritalStatus: "Single"
            };
            req.body = people;

            createPeopleCommand.mockReturnValue(people);

            await createPeople(req, res);

            expect(mediator.send).toHaveBeenCalledWith(createPeopleCommand(req.body))
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.body).toEqual(undefined);
        });

        it('should return 400 if data is invalid', async () => {
            req.body = {};

            await createPeople(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.body).toEqual({ error: 'Invalid data' });
        });

        it('should return 500 if an error occurs', async () => {
            const people = {
                name: "JohnTest",
                lastname: "Doe",
                gender: "Male",
                birthdate: "1990-01-01",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                maritalStatus: "Single"
            };
            req.body = people
            mediator.send.mockRejectedValue(new Error('Internal error'));

            await createPeople(req, res);

            expect(mediator.send).toHaveBeenCalledWith(createPeopleCommand(req.body))
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
        });
    });

    describe('DELETE /api/people/:id', () => {
        let req, res, mediator;

        beforeEach(() => {
            mediator = {
                send: jest.fn(),
            };

            req = {
                app: {
                    get: jest.fn().mockReturnValue(mediator),
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(function (data) {
                    this.body = data;
                }),
                send: jest.fn(),
            };
        });

        it('should delete a person and return status 200', async () => {
            req.params = { id: '1' };
            deletePeopleByIdCommand.mockReturnValue(req.params.id);

            await deletePeopleById(req, res);

            expect(mediator.send).toHaveBeenCalledWith(deletePeopleByIdCommand(req.params.id));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.body).toEqual(undefined);
        });

        it('should return 400 if no id is provided', async () => {
            req.params = { id: undefined };

            await deletePeopleById(req, res);

            expect(mediator.send).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 500 if there is an error during deletion', async () => {
            req.params = { id: '1' };
            mediator.send.mockRejectedValue(new Error('Internal error'));

            await deletePeopleById(req, res);

            expect(mediator.send).toHaveBeenCalledWith(deletePeopleByIdCommand(req.params.id))
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
        });
    });

    describe('PUT /api/people/:id', () => {
        let req, res, mediator;

        beforeEach(() => {
            mediator = {
                send: jest.fn(),
            };

            req = {
                app: {
                    get: jest.fn().mockReturnValue(mediator),
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(function (data) {
                    this.body = data;
                }),
                send: jest.fn(),
            };
        });

        it('should update a person and return status 200', async () => {
            newValues = {
                name: "John",
                lastname: "Doe",
                gender: "Male",
                birthdate: "1990-01-01",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                maritalStatus: "Single"
            };
            req.body = newValues;
            req.params = { id: '2' }

            updatePeopleByIdCommand.mockResolvedValue(1);

            await updatePeopleById(req, res);

            command = updatePeopleByIdCommand(req.params.id, newValues)
            expect(mediator.send).toHaveBeenCalledWith(command)
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.body).toEqual(undefined);
        });

        it('should return 400 if no id is provided', async () => {
            newValues = {
                name: "John",
                lastname: "Doe",
                gender: "Male",
                birthdate: "1990-01-01",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                maritalStatus: "Single"
            };
            req.body = newValues;
            req.params = { id: undefined }

            await updatePeopleById(req, res);

            expect(mediator.send).not.toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 500 if there is an error during update', async () => {
            newValues = {
                name: "John",
                lastname: "Doe",
                gender: "Male",
                birthdate: "1990-01-01",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                maritalStatus: "Single"
            };
            req.body = newValues;
            req.params = { id: '1' }
            mediator.send.mockRejectedValue(new Error('Internal error'));

            await updatePeopleById(req, res);

            command = updatePeopleByIdCommand(req.params.id, newValues)
            expect(mediator.send).toHaveBeenCalledWith(command)
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
        });
    });

});
