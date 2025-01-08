const { People } = require('../models');

const getAllPeopleHandler = () => {
    return People.findAll()
        .then(people => people)
        .catch(err => { throw err });
};

module.exports = getAllPeopleHandler;