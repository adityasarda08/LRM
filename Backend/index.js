const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/leads', require('./routes/leads'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

pool.connect().then(() => console.log('Connected to the database'))
.catch(err => console.error('Database connection error:', err));


