const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./src/models/index.js'); 
//require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./src/routes/userRoutes.js');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false }); // Synchronize all defined models to the DB.
  console.log('Database synced');
});
