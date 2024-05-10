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
app.use(express.static(path.resolve(__dirname, "./build")));
app.use(express.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'10mb' }));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.status(200).send("çalışıyorum");
})
// //#region images
// const imageSchema = mongoose.Schema({
//   productId : String,
//   images:[String],
//   available:Boolean
// });

// const image = mongoose.model("PImage",imageSchema);

// app.post("/api/pImage",async(req,res)=>{
//   try{

//     const addedImage = new image(req.body);
//     let result = await addedImage.save();
//     result = result.toObject();
//     if(result){
     

//       res.status(200).send();
//     }
//     else {
//       res.status(400).send();
//     }

//   }
//   catch(err){
//     res.status(400).send("Hata oluştu",err);
//   }
// })

// //get images 

// app.get("/api/images/:productId",async(req,res)=>{
//   try{
//     const _productId = req.params.productId;
    
//     let images = await image.findOne({
//       productId:_productId
//     });
//     //images = images.toObject();
//     console.log(images);
//     res.status(200).send(images);

//   }
//   catch(err){
//     console.log(err);
//     res.status(400).send("hata");

//   }
 

// })



//#endregion
app.listen(5801, () => console.log("server started on port 5801"));
