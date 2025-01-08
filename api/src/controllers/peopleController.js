const { createPeopleCommand } = require('../commands/createPeopleCommand');
const { deletePeopleByIdCommand } = require('../commands/deletePeopleByIdCommand');
const { updatePeopleByIdCommand } = require('../commands/updatePeopleByIdCommand');
const { getAllPeopleQuery } = require('../queries/getAllPeopleQuery');
const { isValidPeople } = require('../utils/validation');

const getAllPeople = async (req, res) => {
    try {
        const mediator = req.app.get('mediator');

        const query = getAllPeopleQuery();

        const user = await mediator.send(query);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPeople = async (req, res) => {
    try {
        const mediator = req.app.get('mediator');

        if (!isValidPeople(req.body)) {
            throw new Error('Invalid data')
        }

        const command = createPeopleCommand(req.body);

        await mediator.send(command);

        res.status(201).send();
    } catch (error) {
        if (error.message == 'Invalid data' || error.message == 'Failed to create People') {
            res.status(400);
        } else {
            res.status(500);
        }

        res.json({ error: error.message });
    }
};

const deletePeopleById = async (req, res) => {
    try {
        const id = req.params.id;
        const mediator = req.app.get('mediator');

        if (!id) throw new Error('Id param is required')

        const command = deletePeopleByIdCommand(id)
        await mediator.send(command);

        res.status(200).send();

    } catch (error) {
        if (error.message == "Id param is required") {
            res.status(400);

        } else if (error.message == "People not found") {
            res.status(404);

        } else {
            res.status(500);
        }

        res.json({ error: error.message });
    }
}

const updatePeopleById = async (req, res) => {
    try {
        const id = req.params.id;
        const newValues = req.body;
        const mediator = req.app.get('mediator');

        if (!id) throw new Error('Id param is required')

        const command = updatePeopleByIdCommand(id, newValues)
        await mediator.send(command);

        res.status(200).send();
    } catch (error) {
        if (error.message == "Id param is required") {
            res.status(400);

        } else if (error.message == "People not found") {
            res.status(404);
        } else {
            res.status(500);
        }

        res.json({ error: error.message });
    }
}

module.exports = {
    createPeople,
    getAllPeople,
    deletePeopleById,
    updatePeopleById
};
