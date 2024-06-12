import { useFormik } from "formik";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { productAddingSchema } from "../validation/ProductValidator";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { addProducts } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { HttpStatusCode } from "axios";
import FileBase64 from "react-file-base64";
import { addImages } from "../api/api";
import {useHistory} from "react-router-dom";
import Compressor from "compressorjs"
const AddProduct = () => {
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(1000);
  const [images, setImages] = useState([]);
  const [base64List,setbase64List]=useState([]);
  const [loading,setLoading]=useState(false);
  const history = useHistory();
const [compressedImages,setCompressedImages]=useState([]);
  const getImage = async (img) => {
    setImages(img);
    console.log("images are",img)
   img.map((i)=> {
    setbase64List(arr=>[...arr,i.base64])

   
   })
  };

//   const compressImages =async (image)=>{
//     console.log("resim is",image)
//     new Compressor(image,{
//       quality:0.8,
//       success:(compressedResult)=>{
//         setCompressedImages([...compressImages,compressedResult])
// }

// })

//     }

// compressedImages.map((i)=>{
//   console.log(i);
//   setbase64List(arr=>[...arr,i.base64]);
//   console.log("resiömler sıkıştırılarak yapıldı ");

//     })

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      description: "",
      price: price,
      piece: ""
     
    },
    validationSchema: productAddingSchema,
    onSubmit: (values) => {
      console.log("submitted");
      // console.log(values);
      const product = {
        name: values.name,
        brand: values.brand,
        description: values.description,
        price: values.price,
        piece: values.piece,
        available: true,
        createdAt: Date.now(),
        tumbrImage:base64List[0]
      };

      setLoading(true);

      const postProduct = async () => {
    
        try {
          if(images.length===0){
            setLoading(false);
            toast.error("Lütfen Resim Yükleyiniz");
          }
          else{
           
            const result = await addProducts(product);
          if (result.status === HttpStatusCode.Ok) {
            //burda image yukleme fonksiyonu çağrılacak
          
           const productImages ={
            productId:result.data,
            images:base64List,
            available:true

           };
           console.log("product id is",productId)
            const imageResult = await addImages(productImages);

            
            if(imageResult.status===HttpStatusCode.Ok){
             setLoading(false);
              toast.success("Ürün başarıyla eklendi.");
              setTimeout(() => {
                history.push("/products");
              }, 2000);
            }
            else{
              throw new Error();
            }
         
          } else {
            throw new Error();
          }

          }
          
        } catch (err) {
          toast.error("Hata oluştu,", err);
        }
      };
      postProduct();
    },
  });
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <Toaster />
      
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
            >
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Cases &amp; Covers
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Astım Tuz Lambası
          </li>
        </ol>
      </nav>

      <form id="productAddForm" onSubmit={formik.handleSubmit}>
        <div className="row mb-2">
          <div className="col">
            <input
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              placeholder="Ürün adı"
            />
          </div>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div>{formik.errors.name}</div>
        )}
        <div className="row mb-2">
          <div className="col">
            <CurrencyInput
              className="form-control"
              id="price"
              defaultValue={formik.values.price}
              placeholder="Birim Fiyatı giriniz .."
              decimalsLimit={2}
              onValueChange={(value) => (formik.values.price = value)}
            />
          </div>
          <div className="col">
            <input
              id="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              placeholder="Marka "
            />
          </div>
          <div className="col">
            <input
              id="piece"
              value={formik.values.piece}
              onChange={formik.handleChange}
              type="number"
              className="form-control"
              placeholder="Stok miktarı"
            />
          </div>
        </div>
        {formik.errors.brand && formik.touched.brand && (
          <div>{formik.errors.brand}</div>
        )}
        {formik.errors.price && formik.touched.price && (
          <div>{formik.errors.price}</div>
        )}
        {formik.errors.piece && formik.touched.piece && (
          <div>{formik.errors.piece}</div>
        )}
        <div className="row mb-2">
          <div className="col">
            <textarea
              id="description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Açıklama"
            />
          </div>
        </div>
        {formik.errors.description && formik.touched.description && (
          <div>{formik.errors.description}</div>
        )}

        <div className="row mb-2">
          <div className="col">
            <h5 className="strong">Resim Yükleme</h5>
            <FileBase64 multiple={true} onDone={getImage.bind(this)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            {images.map((image) => (
              <img width="20%" src={`${image.base64}`}></img>
            ))}
          </div>
        </div>

        <div className="row mb-2 ">
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={formik.handleSubmit}
              disabled={loading}
             
            >
              {
                loading?"Yükleniyor ..":"Yükle"
              }
            
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
