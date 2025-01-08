const { People } = require('../models');

const createPeopleHandler = (command) => {
    return People.create(command.payload)
        .then(people => {
            if (!people) throw new Error('Failed to create People')
        })
        .catch(err => { throw err });
};

module.exports = createPeopleHandler;


