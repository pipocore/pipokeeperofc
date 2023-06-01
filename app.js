const cluster = require('cluster')
const compression = require('compression');
const totalCPUs = require("os").cpus().length;
require('cache-require-paths');
const http = require('http');
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const passport = require('passport');
const flash = require('connect-flash');
require('./server/passport/passport')
const connection = require("./server/models/db");
const port = 8080;
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const indexroutes = require('./server/routes')
const dashroute = require('./server/dashroute')
if (cluster.isMaster) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        cluster.fork();
    });
} else {
    start();
}
 
function start() {
    const app = express();
    app.server = http.createServer(app);
    app.use(compression())
    app.use(express.json());
    app.use(morgan('tiny'));
    app.set('views', './server/views');
    app.set('view engine', 'pug');
    app.use(express.urlencoded({ extended: true}))
    app.use(express.static(__dirname + '/public'));
    app.set('trust proxy', 1)
    app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: MongoStore.create(({ mongoUrl: process.env.DB_URL , autoRemove: 'native' })),
    cookie: {maxAge: 10800000},
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
    app.use('/', indexroutes);
    app.use('/dashboard', dashroute);
    (async function db() {
    await connection();
})();
    app.server.listen(port, () => {
    });
}


module.exports = app;