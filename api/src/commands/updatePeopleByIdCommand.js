const updatePeopleByIdCommand = (id, newValues) => ({
    type: 'UPDATE_PEOPLE_BY_ID',
    payload: { id, newValues }
})

module.exports = { updatePeopleByIdCommand };