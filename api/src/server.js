const app = require('./app');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((error) => {
        console.error("Error al sincronizar las tablas:", error);
    });


