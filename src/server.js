const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models/index.js'); 
//require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const studentRouter = require('./routes/studentRoutes.js');
app.use('/api/students', studentRouter);

const PORT =  9000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.sync({ force: false }); // Synchronize all defined models to the DB.
  console.log('Database synced');
});
