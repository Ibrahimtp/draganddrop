var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose') ;
const sessions = require('express-session');
const MongoStore = require('connect-mongo');

const oneDay = 20000000000;
 
// mongoose.connect('mongodb://localhost:27017/dragad')
// mongoose.connect(uri)

const uri = "mongodb+srv://ibrahim:WJgo0lnPPZjsQhRs@draganddrop.w4gluc5.mongodb.net/?retryWrites=true&w=majority" ;
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    //    useFindAndModify: false,
    useUnifiedTopology: true

  }).then(()=> {
    console.log("connected successfully")})


var indexRouter = require('./routes/index');
var configureRouter = require('./routes/configure');
let personalizedRouter = require('./routes/personalized');
let signupRouter = require('./routes/signup');
let signinRouter = require('./routes/signin') ;
let assessRouter = require('./routes/assess') ;
let signoutRouter = require('./routes/signout') ;
let adminRouter = require('./routes/admin') ;
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

    mongoUrl: uri
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
app.use('/signout', signoutRouter);
app.use('/admin', adminRouter);




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
