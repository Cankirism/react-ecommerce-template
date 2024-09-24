const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { STATUS_CODES } = require("http");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { error } = require("console");
const { UploadImage } = require("../utils/UploadImage");
require("dotenv").config();
const cors = require("cors");
const receiveImage = require("../multerMid");
const { uploadImage } = require("../utils/UploadImage");
const { ProvinceFetcher } = require("../utils/ProvinceFetcher");
const { Neighborhoods } = require("../utils/NeighborhoodFetcher");
const { Districts } = require("../utils/DistrictFetcher");
const { Stream } = require("stream");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("redis");
const {
  vertical,
} = require("@cloudinary/url-gen/qualifiers/gradientDirection");
const app = express();
const options = [
  cors({
    origin: "*",
  }),
];
let allDistricts = [];
let allNeigborhodds = [];

app.use(options);
app.use(express.json({ limit: "300mb" }));
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
  tumbrImage: String,
  imageUrls: [String],
});
const product = mongoose.model("product", productSchema);

app.post("/api/product", async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    await verifyToken(token);
    const addedProduct = new product(req.body);
    let result = await addedProduct.save();
    result = result.toObject();
    if (result) {
      res.status(200).send(result._id.toString());
    } else {
      throw new Error("Ürün eklenemedi");
    }
  } catch (err) {
    console.log("hata oluştu", err);
    res.status(400).send("hata oluştu,", err);
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    console.log("istek geldi");
    const id = req.params.id;
    let result = await product.findOne({ _id: new Object(id) });
    res.status(200).send(result);
    console.log(id);
    console.log(result);
    result = result.toObject();
  } catch (err) {
    res.status(400).send("Hata oluştu,", err);
    console.log(err);
  }
});

app.get("/api/allproducts", async (req, res) => {
  try {
    console.log("top siz çağrısı geldi");

    //let topSixProducts = await product.find();
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts.products);
  } catch (err) {
    res.status(400).send("hata olustu", err);
  }
});

app.get("/api/popular", async (req, res) => {
  let b = "";
  try {
    const topProducts = await product.find().sort({ $natural: -1 }).limit(4);
    res.status(200).send(topProducts);
  } catch (err) {
    res.status(400).send("hata olustu", err);
  }
});

app.get("/api/count", async (req, res) => {
  try {
    const productCounts = await product.estimatedDocumentCount();
    console.log("kayıtlı ürün sayısı", productCounts);
    res.status(200).send({
      count: productCounts,
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    console.log("dleted proucts is ", req.params);
    await product.deleteOne({ _id: req.params.id });
    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send("error", err);
  }
});

app.get("");

app.get("/api/productpage/:pagee", async (req, res) => {
  try {
    const page = req.params.pagee;

    const products = await product
      .find()
      .skip((page - 1) * 4)
      .limit(4);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send("Kayıt bulunamadı");
  }
});
//#endregion
//#region images
const imageSchema = mongoose.Schema({
  productId: String,
  images: [String],
  available: Boolean,
});

const image = mongoose.model("PImage", imageSchema);

app.post("/api/pImage", async (req, res) => {
  try {
    const addedImage = new image(req.body);
    let result = await addedImage.save();
    result = result.toObject();
    if (result) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(400).send("Hata oluştu", err);
  }
});

//get images

app.get("/api/images/:productId", async (req, res) => {
  try {
    console.log("resimler için istek geldi ");
    const _productId = req.params.productId;

    // let images = await image.findOne({
    //   productId:_productId
    // });
    //images = images.toObject();
    const selectedProduct = await product.findOne({
      _id: _productId,
    });
    console.log("selected is ", selectedProduct);
    console.log("imageUrl lst is", selectedProduct.imageUrls);
    res.status(200).send(selectedProduct.imageUrls);
  } catch (err) {
    console.log(err);
    res.status(400).send("hata");
  }
});

//#endregion

//#region cloudinary

app.post("/api/imageUpload", async (req, res) => {
  console.log("istek gelddiiiiiii");
  receiveImage(req, res, async (err) => {
    if (err) {
      return res.status(404).send("hata oluştuuuu", err);
    }
    try {
      let urlList = [];

      //console.log("request is ",req.body);
      const base64List = req.body.images;
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
        base64List.map(async (base64) => {
          // console.log("base64 is ",base64)
          const imageName = new Date().getTime().toString();
          console.log("image name is ", imageName);
          console.log("yeni version /n");
          const result = await UploadImage(base64, imageName);
          console.log("upload result is ", result);
          const imageUrl = result;

          urlList.push(imageUrl);
          console.log("resim url :", imageUrl);
          console.log("url listesi", urlList);
        })
      );
      res.status(200).send(urlList);

      //   const imageName = new Date().getTime().toString();
      //  const url = "https://konyadogaltasevi.com/wp-content/uploads/2023/04/himalaya-tuz-tasi-somineli-lamba-konya-dogal-tas-evi-1.png"
      //   const uploadResult = await UploadImage(req.body.base64,imageName);
      //   const  uploadedUrl = uploadResult.optimizedUrl;
      //   urlList.push(uploadedUrl);
      // return res.status(200).send(uploadUrl);
    } catch (err) {
      return res.status(404).send("hatauuu", err);
    }
  });
});

//#endregion

//#region province

app.get("/api/province", async (req, res) => {
  try {
    const provinces = await ProvinceFetcher();
    if (provinces)
      res.status(200).send({
        provinces: provinces,
      });
    else {
      throw new Error("İl Listesi çekilemedi");
    }
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/api/districts", async (req, res) => {
  try {
    const district = await getDistricts();
    res.status(200).send({
      status: "success",
      districts: district,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/api/districts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const districts = await getDistricts(id);
    res.status(200).send({
      status: "success",
      districts: districts,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});
const getDistricts = async (provinceId) => {
  const result = await Districts(provinceId);
  if (result) {
    return result.districts;
  } else throw new Error("İle ait ilçe listesi getirilemedi");
};

// app.get("/api/neghborhoods", async (req, res) => {
//   try {

//   } catch (err) {
//     res.status(400).send({
//       status: "error",
//       message: err.message,
//     });
//   }
// });

app.get("/api/neghborhoods/:id", async (req, res) => {
  try {
    const districtId = req.params.id;
    const neigborhoodsList = await getNeighborhoods(districtId);
    res.status(200).send({
      status: "success",
      neigborhoods: neigborhoodsList,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

const getNeighborhoods = async (distritId) => {
  const district = await Neighborhoods(distritId);
  if (district) {
    return district.neighborhoods;
  } else {
    throw new Error("İlçeye ait mahalle bilgisi bulunamadı");
  }
};

//#endregion

//#region order

const orderDetailModel = {
  productId: String,
  productName: String,
  quantity: Number,
  price: Number,
};
const orderDetailSchema = mongoose.Schema({
  orderId: String,
  orders: [orderDetailModel],
  sum: Number,
  status: String,
  cargoName: String,
  cargoCode: String,
  isActive: Boolean,
  date: Date,
});

const OrderDetail = mongoose.model("orderDetail", orderDetailSchema);
app.post("/api/orderDetail", cors(), async (req, res) => {
  try {
    console.log("order detail body is", req.body);
    const orderDetailBody = req.body;
    const newOrderDetail = new OrderDetail(orderDetailBody);
    let result = await newOrderDetail.save();
    result = result.toObject();
    if (result) {
      res.status(200).send({
        status: "success",
        result: result._id,
      });
    } else {
      throw new Error("Sipariş Oluşturulamadı. Tekrar Deneyiniz");
    }
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

const orderSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  province: String,
  district: String,
  neighborhood: String,
  fullAddress: String,
  isActive: Boolean,
  date: Date,
});
const Order = mongoose.model("order", orderSchema);

app.post("/api/order", async (req, res) => {
  try {
    const orderBody = req.body;
    console.log("order iss ", orderBody);
    const neworder = new Order(orderBody);
    let result = await neworder.save();
    result = result.toObject();
    if (result) {
      res.status(200).send({
        status: "success",
        orderId: result._id,
      });
    }
    else {
      throw new Error("Order kayıt edilemedi. Tekrar deneyiniz");

    }
    
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});
app.get("/api/allOrders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ $natural: -1 });
    if (orders) {
      res.status(200).send({
        orders: orders,
      });
    } else {
      throw err;
    }
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});
//#endregion

//#region user
const userSchema = mongoose.Schema({
  email: String,
  password: String,
  isActive: Boolean,
});

const user = mongoose.model("users", userSchema);

app.post("/api/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const isVerifiedResult = await verifyUser(Email, Password);

    if (isVerifiedResult) {
      res.status(200).send(isVerifiedResult);
    }
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

const SECRET_KEY = process.env.REACT_APP_JWT_KEY;
const verifyUser = async (email, password) => {
  const searchedUser = await user.findOne({ email: email, isActive: true });
  if (!searchedUser) {
    console.error(email, "kullanıcısı bulunamadı");
    throw new Error("User Not Found");
  }
  if (await bcrypt.compare(password, searchedUser.password)) {
    token = await jwt.sign(
      {
        id: searchedUser._id,
        username: email,
        type: user,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return {
      status: "success",
      accessToken: token,
    };
  } else {
    throw new Error("Username or password wrong");
  }
};

const verifyToken = async (token) => {
  await jwt.verify(token, SECRET_KEY, (error, decodedData) => {
    if (error) {
      throw new Error(error);
    } else {
      return decodedData;
    }
  });
};
//#endregion

app.get("/api/verifyToken", async (req, res) => {
  try {
    const accessToken = req.headers["authorization"].split(" ")[1];
    console.log("access token is ", accessToken);
    if (verifyToken) {
      res.status(200).send({
        status: "success",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err.message,
    });
  }
});

// app.post("/api/signup", async (req, res) => {
//   try {
//     const userInfo = req.body;
//     const signupResult = await createUser(userInfo.email, userInfo.password);
//     if (signupResult) {
//       res.status(200).send({
//         status: "success",
//         id: signupResult
//       })
//     }
//     else {
//       throw new Error("Kullanıcı oluşturulamadı. Yeniden deneyinizı")
//     }

//   }
//   catch (err) {
//     res.status(400).send({
//       status: "error",
//       message: err.message
//     })

//   }
// })
// const createUser = async (email, password) => {

//   const saltRounds = 10;
//   const salt = await bcrypt.genSaltSync(saltRounds);
//   const passwd = await bcrypt.hashSync(password, salt);
//   const newUser = new user({
//     email: email,
//     password: passwd,
//     isActive: true

//   });
//   let result = await newUser.save();
//   if (result) {
//     return result.toObject()._id;
//   }
//   else {
//     throw new Error("Kullanıcı Oluştururken hata");
//   }

// }

//#endregion

//#region  redis
let redisClient;
(async () => {
  redisClient = await redis
    .createClient({
      password: process.env.REDIS_PASS,
      socket: {
        host: "redis-17765.c311.eu-central-1-1.ec2.redns.redis-cloud.com",
        port: 17765,
      },
    })
    .on("error", (err) => console.log("redis client error", err))
    await redisClient.connect();
})();
let cachedProducts;
const getAllProducts = async () => {
  try {
    cachedProducts = await redisClient.get("allProducts");
    if (cachedProducts == null) {
      console.log("not cached")
      const prd = await product.find();
      await redisClient.set("allProducts", JSON.stringify(prd));
      cachedProducts = [...prd];
    }
    else {
      console.log("cached")
    }
    return {
      status: "Ok",
      products: JSON.parse(cachedProducts),
    };
  } catch (err) {
    return {
      status: "Errorrrr",
      message: err.message,
    };
  }
};

//#endregion
app.listen(5802, () => console.log("server started on port 5801"));
