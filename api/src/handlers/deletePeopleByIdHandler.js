const { People } = require('../models');

const deletePeopleByIdHandler = (command) => {
    const id = command.payload

    return People.destroy({ where: { id } })
        .then(deletedCount => {
            if (deletedCount == 0) throw new Error('People not found')
        })
        .catch(err => { throw err });
};

module.exports = deletePeopleByIdHandler;