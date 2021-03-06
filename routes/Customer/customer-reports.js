var express = require('express');
var router = express.Router();
var conn = require('../../dbcredentials/dbcredentials');
var util = require('util');
var query = util.promisify(conn.query).bind(conn);

/* GET home page. */
router.get('/', async function(req, res, next) {

  let options = {
    title : "Customer reports",
    session : req.session
  }

  req.session.AccountType = "Customer";
  console.log(options);
  res.render('Customer/customer-reports', options);
});

module.exports = router;
