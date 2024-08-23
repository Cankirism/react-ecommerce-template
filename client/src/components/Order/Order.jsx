import { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import UserInfo from "./UserInfo";
import { useLocation } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const [items, setItems] = useState(location.state.cart);

  return (
    <>
      <OrderDetail order={items} />
      <UserInfo orders={items} />
    </>
  );
};
export default Order;
