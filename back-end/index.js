const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const connect =require("./connection/connection");
const classRoute = require("./routes/class");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use()
app.get("/", (req, res)=>{
  res.send("ok");
})
app.use("/api/v1/myClass", classRoute)

app.get("*", (req, res) => {
  res.status(404).send("page not found")  
})

app.listen(3004, () => {
  console.log("server is up in 3004")
})