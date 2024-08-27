import { useEffect, useState } from "react";
import DataTable from "../../DataTable/DataTable.jsx";
import { allOrders } from "../../../api/api";
import Menu from "../../Menu/Menu.jsx";
import "./OrderList.css"
const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [headers, setHeaders] = useState([
    "Sipariş Kodu",
    "Adı",
    "Telefonu",
    "Sipariş Tarihi",
    "Şehir",
    "İlçe",
    "Mahalle"
  ]);
  useEffect(() => {
    const getOrders = async () => {
      const result = await allOrders();
      if (result) {
        setOrders(result.data.orders);
      }
    };

    getOrders();
  }, []);
  return (
    <>
    <div className="container-order" >
        <div className="column-order-left">
        <Menu />

        </div>
        <div className="column-order-right">
        <DataTable data={orders} headers={headers} />

        </div>
    </div>
    
    
    
    
    

      
    </>
  );
};
export default OrdersList;
