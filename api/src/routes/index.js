const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.get('/people', peopleController.getAllPeople);

router.post('/people', peopleController.createPeople);
router.delete('/people/:id', peopleController.deletePeopleById);
router.put('/people/:id', peopleController.updatePeopleById);

// router.patch('/people/:id', () => updatePeopleById);

module.exports = router;