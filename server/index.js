const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { STATUS_CODES } = require("http");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { error } = require("console");
require("dotenv").config();
const cors = require("cors");



const app = express();
// app.use(express.static(path.resolve(__dirname, "./build")));
// app.use(express.json({limit:'10mb'}));
// app.use(bodyParser.urlencoded({ extended: true,limit:'10mb' }));
// app.use(bodyParser.json());
// app.use(cors());

app.get("/",(req,res)=>{
  res.status(200).send("çalışıyorum");
})

//#endregion
app.listen(5801, () => console.log("server started on port 5801"));
