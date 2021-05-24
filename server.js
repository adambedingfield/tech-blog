// dependencies and middleware
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//port variables
const app = express();
const PORT = process.env.PORT || 3001;

const controllers = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// setup session
const sess = {
    secret: 'Super secret secret',
    cookie: {
        //expires after an hour
        expires: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

const helpers = require('./utils/helpers');

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// connect to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});