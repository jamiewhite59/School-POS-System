var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbcredentials');
var util = require('util');
var query = util.promisify(conn.query).bind(conn);

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = await query("SELECT * FROM testTable");

  let options = {
    title : "Express",
    sql : sql
  }

  res.render('index', options);
});

module.exports = router;
