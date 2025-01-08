const createPeopleCommand = (userData) => ({
    type: 'CREATE_PEOPLE',
    payload: userData
});

module.exports = { createPeopleCommand };