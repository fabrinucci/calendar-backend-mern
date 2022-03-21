
const express = require ('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

const app = express();

// Database
dbConnection();

// Corse
app.use(cors())

// Public Directory
app.use( express.static('public') );

// Body Parse
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


// get peticions
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});