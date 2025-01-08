const deletePeopleByIdCommand = (id) => ({
    type: 'DELETE_PEOPLE_BY_ID',
    payload: id
})

module.exports = { deletePeopleByIdCommand };