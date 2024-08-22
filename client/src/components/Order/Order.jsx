import { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import UserInfo from "./UserInfo";
import { useLocation } from "react-router-dom";

const Order =()=>{
    
    const location = useLocation();
    const [items,setItems]=useState(location.state.cart);
    console.log("order listesi",items)
    console.log(location)
    return(
        <>
        <OrderDetail order={items} />
        <UserInfo />
        </>
        
    )

}
export default Order;