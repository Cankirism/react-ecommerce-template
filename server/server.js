const express = require("express");
const app = express();
// app.use(express.static(path.resolve(__dirname, "./build")));
// app.use(express.json({limit:'10mb'}));
// app.use(bodyParser.urlencoded({ extended: true,limit:'10mb' }));
// app.use(bodyParser.json());
// app.use(cors());

app.get("/api",(req,res)=>{
  console.log("ayaktayım")
  res.status(200).send("çalışıyorum");
})

//#endregion
app.listen(5801, () => console.log("server started on port 5801"));
