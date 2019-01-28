//jshint esversion: 6

const express = require("express");
const app = express();
const auth = require("./route/auth");

app.use(auth);


app.get("/", (req, res) => {
    res.send({ "status": "Server active" });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
