import axios from 'axios';
export const baseUrl="https://tuz-rust.vercel.app/api";

const api = axios.create({
    baseURL:baseUrl
});



export  const addProducts =(product)=>{
return api.post("/product",product);

}

export const addImages=(image)=>{
    return api.post("/pImage",image);

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

