//jshint esversion:6

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "faiz5555",
  database: "sekolahku"
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  } else {
    console.log('connected as id ' + db.threadId);
  }
});

module.exports = db;
