require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const tempToken = jwt.sign({ userId: 'publicUser' }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        req.headers.authorization = `Bearer ${tempToken}`;
    }
    next();
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
