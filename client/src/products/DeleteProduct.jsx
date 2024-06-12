import { useEffect, useState } from "react";
import { fetchProduct, getTopProducts } from "../api/api";
import { remove } from "../api/api";
import { paginateProducts } from "../api/api";
import { HttpStatusCode } from "axios";
import toast,{ Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
const DeleteProduct = () => {
  const [product, setProduct] = useState({name:"",price:"",tumbrlImage:""});
  const [isLoading,setIsLoading]=useState(true);
  const [pid,setPid]=useState("");
  useEffect(async () => {
    // const productList = await fetchProduct(id);
    // setProducts(productList.data);
    // setIsLoading(false);
    
  });

   const deleteProduct= async (id)=>{
    console.log("delete butonu tıklandı")
    const deleteResult = await remove(id);
  if(deleteResult.status===HttpStatusCode.Ok){
toast.success("Ürün silindi");
  }
  else {
    toast.error("silerken hata")
  }

   }

   const getProduct =async (id)=>{
    if(id==""){
      toast.error("Lütfen ürün kodunu giriniz")

    }
    else {
      const prd = await fetchProduct(id);
    setProduct(prd.data);

    }
    


   }

  return (
    <div className="containerd">
      <Toaster/>
      
      
        <div className="cartt">
        
        <input className="col-sm-12" placeholder="Ürün kodunu giriniz" onChange={(e)=>setPid(e.target.value)}></input>
        <button 
        className="btn-sm btn-success"
        onClick={()=>getProduct(pid)}
        >Ara</button>
        {  
        product.name!=""?(
        

           
            <div className="productd" >
            <img src={product.tumbrImage} alt={product.name}/>
            <div className="productd-info">
                <h5>{product.name}</h5>
                <p>Fiyat: {product.price} TL</p>
                <p>
                

                </p>
                
                <button className="remove-btn btn-sm" 
                onClick={()=>deleteProduct(product._id)}
                >Sil</button>
            </div>
        </div>
         
        ):(<div></div>)

          
        }

      </div>
      
    
      

    </div>
    
    
  );
};
export default DeleteProduct;
