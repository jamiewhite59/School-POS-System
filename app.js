var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var conn = require('./dbcredentials/dbcredentials');
var session = require('express-session');
var SQLStore = require('express-mysql-session')(session);

var loginRouter = require('./routes/login');

var adminReportRouter = require('./routes/Admin/admin-reports');
var customersRouter = require('./routes/Admin/customers');
var ordersRouter = require('./routes/Admin/orders');
var stockRouter = require('./routes/Admin/stock');

var accountRouter = require('./routes/Customer/customer-account');
var customerReportRouter = require('./routes/Customer/customer-reports');
var suggestionsRouter = require('./routes/Customer/suggestions');

var posReportRouter = require('./routes/POS/pos-report');
var posRouter = require('./routes/POS/pos');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended : true}));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new SQLStore({}, conn);
app.use(session({
  secret: 'cookieSecret',
  store : sessionStore,
  expires : null,
  cookie : {}
}))

app.use('/login', loginRouter);

app.use('/admin-report', adminReportRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/stock', stockRouter);

app.use('/account', accountRouter);
app.use('/customer-report', customerReportRouter);
app.use('/suggestions', suggestionsRouter);

app.use('pos-report', posReportRouter);
app.use('/pos', posRouter);

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
