require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');

//Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'discord.oauth2'
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Mdileware Route
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.get('/', (req, res) =>{
    res.render('dashboard', {
        users: [
            {name: 'nasicas'}
        ]
    });
});


app.listen(PORT, () => {
    console.log(`now listening to requests on port ${PORT}`)
});

