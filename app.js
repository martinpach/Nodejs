var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;


/* ================================================ */
app.use(express.static(__dirname + '/public'));
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdemo"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.post('/user', (req, res) => {
    var sql = `INSERT INTO users (name, age) VALUES ("${req.body.name}", ${req.body.age})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.get('/users', (req, res) => {
    con.query("SELECT * FROM users", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/users/:id', (req, res) => {
    var sql = "SELECT * FROM users WHERE id = " + mysql.escape(req.params.id);
        con.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(3500);