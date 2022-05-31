var express = require('express');
var router = express.Router();
var conn = require('../../dbcredentials/dbcredentials');
var util = require('util');
var query = util.promisify(conn.query).bind(conn);

/* GET home page. */
router.get('/', async function(req, res, next) {

  let options = {
    title : "Orders",
    session : req.session
  }

  res.render('Admin/orders', options);
});

module.exports = router;
