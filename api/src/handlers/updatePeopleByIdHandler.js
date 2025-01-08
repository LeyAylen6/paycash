const { People } = require('../models');

const updatePeopleByIdHandler = (command) => {
    const { id, newValues } = command.payload

    return People.update(newValues, { where: { id } })
        .then(updatedCount => {
            if (updatedCount == 0) throw new Error('People not found')
        })
        .catch(err => { throw err });
};

module.exports = updatePeopleByIdHandler;