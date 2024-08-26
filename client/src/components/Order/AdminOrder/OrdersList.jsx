import { useEffect, useState } from "react"
import DataTable from "../../DataTable/DataTable.jsx"
import { allOrders } from "../../../api/api";
import Menu from "../../Menu.jsx";
const OrdersList = ()=>{
    const [orders,setOrders ]=useState([]);
    const [headers,setHeaders]=useState([
        "Sipariş Kodu", "Adı","Telefonu","Sipariş Tarihi"
    ])
    useEffect(()=>{

        const getOrders = async()=>{
            const result = await allOrders();
            if(result){
                setOrders(result.data.orders);
            }
        }

        getOrders();

    },[])
    return (
        <>
        <div className="containerd">
            <Menu/>
            <DataTable data={orders} headers= {headers}/>

        </div>
        </>
    )
}
export default OrdersList;