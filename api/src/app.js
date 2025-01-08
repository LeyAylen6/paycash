const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./config/swaggerConfig');

const mediator = require('./mediator/mediator')

const routes = require('./routes');
const createPeopleHandler = require('./handlers/createPeopleHandler')
const getAllPeopleHandler = require('./handlers/getAllPeopleHandler');
const deletePeopleByIdHandler = require('./handlers/deletePeopleByIdHandler');
const updatePeopleByIdHandler = require('./handlers/updatePeopleByIdHandler');

require('./config/database');
require('./models/index')

const appMediator = mediator();

appMediator.registerHandler('GET_ALL_PEOPLE', getAllPeopleHandler);
appMediator.registerHandler('CREATE_PEOPLE', createPeopleHandler);
appMediator.registerHandler('UPDATE_PEOPLE_BY_ID', updatePeopleByIdHandler);
appMediator.registerHandler('DELETE_PEOPLE_BY_ID', deletePeopleByIdHandler);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('mediator', appMediator);

app.use('/api', routes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = app;