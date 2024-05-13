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

const mongoDb = process.env.MONGODB_URL;
try {
  mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  handleError(err);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

// creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  let client = mongoose.connections[0].client;

  let dba = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(dba, {
    bucketName: "images",
  });
  console.log("bucket is ", bucket);
});

//#region upload image as base64

//#region  imageUpload
const storage = new GridFsStorage({
  url: mongoDb,

  options: { useNewUrlParser: true },
  file: (req, file) => {
    console.log(req.headers);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "images",
        // filename: `${Date.now()}_${file.originalname}`,
        filename: req.headers.productid,
        metadata: req.headers.productid,
      };
    } else {
      throw new Error("Lütfen pgn ya da jpg dosya yükleyiniz ");
    }
  },
});
const upload = multer({
  limits: 1024 * 1024 * 5,
  storage: storage,
});

app.post(
  "/upload/image",
  upload.single("image"),
  async (req, res) => {
    console.log("file is ", req.file);
    res.json({
      success: true,
      message: "File Uploaded",
    });
  },
  (err, req, res, next) => {
    return res.json({
      success: false,
      message: err.message,
    });
  }
);
//#endregion

//#region  download image

app.get("/image/:productId", async (req, res) => {
  console.log(req.params);
  try {
    const imageList = await bucket
      .find({
        filename: req.params.productId,
      })
      .toArray();
    console.log(imageList);
    if (imageList.length === 0) {
      throw new error("image not found");
    }
    imageList.map((image) => {
      console.log("image is ", image);
      console.log(image._id.toString());

      bucket.openDownloadStream(image._id).pipe(res);
    });
    // await bucket.openDownloadStreamByName(req.params.productId)
    //     .pipe(res);
  } catch (err) {
    res.status(404).send("Hata oluştu");
  }
});
//#endregion
const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  available: Boolean,
  createdAt: Date,
  piece: Number,
  tumbrImage:String
});
const product = mongoose.model("product", productSchema);

app.post("/api/product", async (req, res) => {
  try {
   // console.log(req.body);
    const addedProduct = new product(req.body);

   
    let result = await addedProduct.save();
    result = result.toObject();
    if (result) {
     
      res.status(200).send(result._id.toString());
    } else {
     res.status(400).send("Hata oluştu")
    }
  } catch (err) {
    console.log("hata oluştu", err);
    res.status(400).send("hata oluştu,", err);
  }
});






app.get("/api/product/:id", async (req, res) => {
  try {
    console.log("istek geldi")
    const id = req.params.id;
    let result = await product.findOne({ _id: new Object(id) });
    res.status(200).send(result)
    console.log(id);
    console.log(result);
    result = result.toObject();
  } catch (err) {
    res.status(400).send("Hata oluştu,",err);
    console.log(err);
  }
});


app.get("/api/allproducts",async(req,res)=>{
 
  try{
    console.log("top siz çağrısı geldi");
    let topSixProducts = await product.find();
   //topSixProducts=topSixProducts.toObject();
    console.log("top six is",topSixProducts);
    res.status(200).send(topSixProducts);
    
  } catch(err){
    res.status(400).send("hata olustu",err);
  }
})

app.get("/api/popular",async(req,res)=>{
  let b="";
  try{
    const topProducts = await product.find().limit(4);
    res.status(200).send(topProducts);

  }catch(err){
    res.status(400).send("hata olustu",err);
  }
})

//#region images
const imageSchema = mongoose.Schema({
  productId : String,
  images:[String],
  available:Boolean
});

const image = mongoose.model("PImage",imageSchema);

app.post("/api/pImage",async(req,res)=>{
  try{

    const addedImage = new image(req.body);
    let result = await addedImage.save();
    result = result.toObject();
    if(result){
     

      res.status(200).send();
    }
    else {
      res.status(400).send();
    }

  }
  catch(err){
    res.status(400).send("Hata oluştu",err);
  }
})

//get images 

app.get("/api/images/:productId",async(req,res)=>{
  try{
    const _productId = req.params.productId;
    
    let images = await image.findOne({
      productId:_productId
    });
    //images = images.toObject();
    console.log(images);
    res.status(200).send(images);

  }
  catch(err){
    console.log(err);
    res.status(400).send("hata");

  }
 

})

app.listen(5801, () => console.log("server started on port 5801"));


