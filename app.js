var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();
app.use(cors({
  origin: 'http://localhost:3001',  // Replace with your React app's URL
  credentials: true,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'aDifferentSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 60000 } // 1 minute for demonstration; you may want to set this higher
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS to allow credentials (cookies)


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productsRouter);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
