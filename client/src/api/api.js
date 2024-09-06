import axios from 'axios';
export const baseUrl="https://tuz-rust.vercel.app/api";
//export const baseUrl="http://localhost:5802/api"
//export const baseurl="https://www.zuhretuzurunleri.com/"
const api = axios.create({
    baseURL:baseUrl
});



export  const addProducts =(product)=>{
return api.post("/product",product);

}

export const addImages=(image)=>{
   // return api.post("/pImage",image);
   return api.post("/imageUpload",image)

}

export const fetchProduct=(id)=>{

    return api.get(`/product/${id}`);
}
export const getImages=async(productId)=>{
    return api.get(`/images/${productId}`);

}

export const getTopProducts=async()=>{
    return api.get("/allproducts");
}
export const getPopularProducts =async()=>{
    return api.get("/popular");
}

export const loginn = (values)=>{
    return api.post("/login",values)
     .catch((err)=>err.response)

}

export const remove=async (id)=>{
    return api.delete(`/delete/${id}`)

}

export const countProducts =()=>{
    return api.get("/count");
}

export const paginateProducts =(page)=>{
    return api.get(`/productpage/${page}`);

}

export const fetchProvinces = async()=>{
    return api.get("/province")
}
export const fetchDistrictsofProvince = async(provinceId)=>{
    return api.get(`/districts/${provinceId}`);
}

export const fetchNeighborhoods = async(districtId)=>{
    return api.get(`/neghborhoods/${districtId}`);

}

export const postOrders =async(orders)=>{
    return api.post("/order",orders);
}
export const postOrdersDetail = async(ordersDetail)=>{
   
    return api.post("/orderDetail",ordersDetail);
}

export const allOrders = async()=>{
    return api.get("/allOrders");
}
export const verifyToken=async(token)=>{
    return api.get("/verifyToken",{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).catch((err)=>err.response)

}

