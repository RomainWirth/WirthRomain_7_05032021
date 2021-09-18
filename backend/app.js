import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// import cors
import cors from 'cors';
// const cors = require('cors');

// import routes
import loginRoutes from './routes/login';
import usersRoutes from './routes/users';
import topicMessageRoutes from './routes/topicMessage';
// const loginRoutes = require('./routes/login');
// const usersRoutes = require('./routes/users');
// const topicMessageRoutes = require('./routes/topicMessage');
 
// init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // header ou on renvoie le token
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// use routers
app.use(loginRoutes);
app.use(usersRoutes);
app.use(topicMessageRoutes); 

app.listen(5000, () => console.log('Server running at http://localhost:5000'));

module.exports = app;