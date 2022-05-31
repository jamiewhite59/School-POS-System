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

router.post('/login', async function(req,res){
  let email = req.body.email;
  let password = req.body.password;

  let sql = "SELECT UserType FROM Users WHERE Email='"+email+"' AND PasswordHash='"+password+"'";

  try{
    let data = await query(sql);
    if(data.length == 1){
      req.session.AccountType = data[0].UserType;
    }
    res.json(data);
  } catch(err){
    console.log("error");
  }
})

module.exports = router;
