require('cache-require-paths');
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const passport = require('passport');
const app = express();
app.disable('x-powered-by');
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'https://ka-f.fontawesome.com', 'https://fonts.gstatic.com'],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://ka-f.fontawesome.com'],
            styleSrc: ["'self'","'unsafe-inline'", 'https://ka-f.fontawesome.com', 'https://fonts.googleapis.com'],
            connectSrc: ["'self'", 'https://ka-f.fontawesome.com'],
        },
}));
const compression = require('compression');
app.use(compression())
const flash = require('connect-flash');
require('./server/passport/passport')
const connection = require("./server/models/db");
const port = 8080;
const session = require('express-session');
const logger = require('morgan');
const MongoStore = require('connect-mongo');
app.set('views', './server/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'));
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: MongoStore.create(({ mongoUrl: process.env.DB_URL , autoRemove: 'native' })),
    cookie: {maxAge: 300000, secure: true},
}));
app.use(passport.authenticate('session'));
app.use(flash());

app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
const indexroutes = require('./server/routes')
const dashroute = require('./server/dashroute')
app.use('/', indexroutes);
app.use('/dashboard', dashroute);
(async function db() {
  await connection();
})();

app.set('http_port', port);
	require('http').createServer(app).listen(app.get('http_port'), () => {
    });

module.exports = app;