//Requires Express
var express = require('express');
var app = express();
// Requires body-parser
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');
var books = require('./routes/books')


// view engine setup
// app.set('view')
app.set('view engine', 'pug');
//Uses body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);
app.use('/books', books);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//** */Server listens for the app
app.listen(3000, ()=>{
  console.log('App running on port 3000')
});


module.exports = app;
