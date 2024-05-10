import React,{Children, createContext,useState} from "react";

const CartContext =createContext();

export const CartContextProvider =({children})=>{
    const [cart,setCart]=useState([]);
    const updateCart =(item)=>{
        setCart(cart=>[...cart,item])
       
    }
    const values ={
        cart,updateCart
    };
    return(
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;