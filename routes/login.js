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
  let email = req.body.loginEmail;
  let password = req.body.loginPassword;

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
});

router.post('/register', async function(req,res){
  let email = req.body.registerEmail;
  let password = req.body.registerPassword;

  let fName = req.body.registerFName;
  let sName = req.body.registerSName;
  let telephone = req.body.registerTelephone;
  let postcode = req.body.registerPostcode;
  let houseNo = req.body.registerHouseNo;
  let dob = req.body.registerDOB;

  let sql = "SELECT Email FROM Users WHERE Email='"+email+"'";

  try{
    let data = await query(sql);
    if(data.length == 1){
      res.json({exists: true});
    }
    else{
      try{
        sql = "INSERT INTO Users (Email, PasswordHash) VALUES ('"+email+"', '"+password+"');" +
          "INSERT INTO Customers (UserID, FName, SName, DOB, Postcode, HouseNo, Telephone) VALUES((SELECT DISTINCT LAST_INSERT_ID() FROM Users), '"+fName+"', '"+sName+"', '"+dob+"', '"+postcode.toUpperCase()+"', '"+houseNo+"', '"+telephone+"');";
        await query(sql);
      } catch (err){
        console.log('insert error');
      }
      res.json({exists: false});
    }
  } catch (err){
    console.log("error");
  }
})

module.exports = router;
