//Requires Express
var express = require('express');
var app = express();
// Requires body-parser
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./models/index');
var books = require('./models/books')

//Require database
// const db = require('./models/book').sequelize;
// module.exports = (app, db) => {
//     console.log(books);
//     app.get("/all_books", (req, res) =>
//     db.post.findAll().then((result) => res.json(result))
//     );
// }

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
router.use('/', (req, res) => res.redirect('/books'));


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
      error: err0l
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


module.exports = app;
