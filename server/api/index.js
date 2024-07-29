const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { STATUS_CODES } = require("http");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { error } = require("console");
const {UploadImage} = require("../utils/UploadImage")
require("dotenv").config();
const cors = require("cors");
const receiveImage = require("../multerMid");
const {uploadImage} = require("../utils/UploadImage"); 
const app = express();
const options = [
	cors({
		origin:'*'
		
		
	})

];

app.use(options);
app.use(express.json({ limit: '300mb' }));
 
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
 // console.log("bucket is ", bucket);
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
//#region product

const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  available: Boolean,
  createdAt: Date,
  piece: Number,
  tumbrImage:String,
  imageUrls:[String]
  
});
const product = mongoose.model("product", productSchema);

app.post("/api/product", async (req, res) => {
  try {
    console.log(req.body);
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
    const topProducts = await product.find().sort({$natural:-1}).limit(4);
    res.status(200).send(topProducts);

  }catch(err){
    res.status(400).send("hata olustu",err);
  }
})

app.get("/api/count",async(req,res)=>{
  try{
    const productCounts = await product.estimatedDocumentCount();
    console.log("kayıtlı ürün sayısı",productCounts)
    res.status(200).send({
      count:productCounts
    });

  }
  catch(err){
    res.status(404).send(err);
  }
})

app.delete("/api/delete/:id",async(req,res)=>{
  try{
    console.log("dleted proucts is ",req.params)
    await product.deleteOne({_id:req.params.id})
    res.status(200).send("deleted");
  }
  catch(err){
    res.status(400).send("error",err);
  }
})

app.get("")

app.get("/api/productpage/:pagee",async(req,res)=>{
  try{
    const page = req.params.pagee;

    const products = await product.find().skip((page-1)*4).limit(4);
    res.status(200).send(products);
  }
  catch(err){
    res.status(404).send("Kayıt bulunamadı");
  }
})
//#endregion
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
    console.log("resimler için istek geldi ")
    const _productId = req.params.productId;
    
    // let images = await image.findOne({
    //   productId:_productId
    // });
    //images = images.toObject();
    const selectedProduct= await product.findOne({
      _id:_productId
    })
    console.log("selected is ",selectedProduct);
    console.log("imageUrl lst is",selectedProduct.imageUrls);
    res.status(200).send(selectedProduct.imageUrls);

  }
  catch(err){
    console.log(err);
    res.status(400).send("hata");

  }
 

})



//#endregion

//#region user
const userSchema = mongoose.Schema({
  email:String,
  password:String,
  isActive:Boolean
})

const user = mongoose.model("users",userSchema);
app.post("/api/user",async(req,res)=>{
  try{
    console.log("user ekleme isteği geldi",req.body)
    const newUser = new user(req.body);
    let result = await newUser.save();
    console.log(result);
    result = result.toObject();
    if(result){
      res.status(200).send("kullanıcı kaydedildi")
    }
    else {
      res.status(400).send("hata");
    }
  }
  catch(err){
    res.status(400).send("hata",err);
  }
 
})
app.post("/api/login",async(req,res)=>{
  try{
    console.log("user is ",req.body);
 
    const loginResult = await user.findOne({email: 'faruk.gungor@hotmail.com'})

    if(loginResult){
     
      res.status(200).send("login başarılı");
     
    }
    else{
      res.status(400).send("username or password error");
    }

  }catch(err){
    res.status(400).send("hata",err);
  }
 
  // const loginResult = await user.findOne({email:`${req.body.email}`,password:`${req.body.password}`})

})
//#endregion


//#region cloudinary

app.post('/api/imageUpload',async (req,res)=>{

  console.log("istek gelddiiiiiii");
receiveImage(req,res,async(err)=>{
  if(err){
    return res.status(404).send("hata oluştuuuu",err);
  }
  try{
    let urlList = [];
   
    //console.log("request is ",req.body);
    const base64List=req.body.images;
    // base64List.map(async (base64)=>{
    //  // console.log("base64 is ",base64)
    //   const imageName = new Date().getTime().toString();
    //   const result = await UploadImage(base64,imageName);
    //   console.log("upload result is ",result)
    //   const imageUrl = result;
      
    //   urlList.push(imageUrl);
    //  console.log("resim url :",imageUrl)
    //  console.log("url listesi",urlList);

    // });

    await Promise.all(
      base64List.map(async (base64)=>{
     // console.log("base64 is ",base64)
      const imageName = new Date().getTime().toString();
      console.log("image name is ",imageName);
      console.log("yeni version /n");
      const result = await UploadImage(base64,imageName);
      console.log("upload result is ",result)
      const imageUrl = result;
      
      urlList.push(imageUrl);
     console.log("resim url :",imageUrl)
     console.log("url listesi",urlList);

    }))
    res.status(200).send(urlList);
    
  //   const imageName = new Date().getTime().toString();
  //  const url = "https://konyadogaltasevi.com/wp-content/uploads/2023/04/himalaya-tuz-tasi-somineli-lamba-konya-dogal-tas-evi-1.png"
  //   const uploadResult = await UploadImage(req.body.base64,imageName);
  //   const  uploadedUrl = uploadResult.optimizedUrl;
  //   urlList.push(uploadedUrl);
   // return res.status(200).send(uploadUrl); 

  }
  catch(err){
    return res.status(404).send("hatauuu",err);
  }
 
})




})




//#endregion

app.listen(5802, () => console.log("server started on port 5801"));


