//jshint esversion:6

const router = require("express").Router();
const db = require("../connection");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/signup", (req, res) => {
  const data = req.body;

  if ((data.hasOwnProperty('username') && data.hasOwnProperty('email') && data.hasOwnProperty('password')) == false) {
    res.send('Informasi tidak lengkap: anda butuh username, email, dan password untuk mendaftar');
  } else {
    let sql = `SELECT * FROM users WHERE username = '${data.username}' OR email = '${data.email}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else if (result.length > 0) {
        res.send({
          "signup": "failed",
          "status": 'Username/email telah dipakai untuk mendaftar'
        });
      } else {
        let sql = `INSERT INTO users SET ?`;
        db.query(sql, data, (err, result) => {
          res.send({
            "username": data.username,
            "email": data.email,
            "status": "Signup sukses"
          });
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const data = req.body;

  if (!data.hasOwnProperty('password')) {
    res.send("You need a password to log in");
  } else {
    let sql = `SELECT * FROM users WHERE username = '${data.username}' OR email = '${data.email}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else if (result == 0) {
        res.send({
          "login": "failed",
          "status": "Akun tidak terdaftar"
        });
      } else {
        if (data.password != result[0].password) {
          res.send({
            "login": "failed",
            "status": "Password salah"
          });
        } else {
          res.send({
            "login": "ok",
            "status": "Login sukses"
          });
        }
      }
    });
  }
});




module.exports = router;
