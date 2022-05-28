var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbcredentials');
var util = require('util');
var query = util.promisify(conn.query).bind(conn);

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = await query("SELECT * FROM Users");

  let options = {
    title : "Express",
    sql : sql,
    session : req.session
  }
  res.render('login', options);
});

module.exports = router;
