var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require("dotenv");

const { Connection } = require("./model/config");

dotenv.config();


// DB Configuration
// require('./model/config');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
exports.MAIL_USER = process.env.MAIL_USER;
exports.MAIL_PASS = process.env.MAIL_PASS;

const URL =
  process.env.MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bilal1.1gjzw.mongodb.net/mern?retryWrites=true&w=majority`;

Connection(URL);




var userRouter = require('./routes/userRouter');
var postRouter = require('./routes/postRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

// app.use('/', usersRouter);
app.use('/users', userRouter);
app.use('/users/posts', postRouter);



if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build')); 

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



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
