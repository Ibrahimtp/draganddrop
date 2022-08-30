var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose') ;
const sessions = require('express-session');
const MongoStore = require('connect-mongo');

const oneDay = 20000000000;

mongoose.connect('mongodb://localhost:27017/dragad')

var indexRouter = require('./routes/index');
var configureRouter = require('./routes/configure');
let personalizedRouter = require('./routes/personalized');
let signupRouter = require('./routes/signup');
let signinRouter = require('./routes/signin') ;
let assessRouter = require('./routes/assess') ;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  store: MongoStore.create({

    mongoUrl: 'mongodb://localhost:27017/dragad'
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  },
  resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/configure', configureRouter);
app.use('/personalized', personalizedRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/assess', assessRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
