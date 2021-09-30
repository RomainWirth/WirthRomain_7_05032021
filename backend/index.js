const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require ('cookie-session');

// import routes
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const topicMessageRoutes = require('./routes/topic_messages');
 
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // header ou on renvoie le token
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cookieSession({
    name: "session",
    secret: "SeCuRe",
    cookie: {
        secure: true,
        httpOnly: true,
        domain: "http://localhost:3000/",
    },
}));

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', function(req,res) {res.send('Hello World');});

// use routers
app.use('/api/auth', loginRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/topic_messages', topicMessageRoutes); 

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

module.exports = app;