import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Menu.css"

const Menu =()=>{
    const [menuItems, setMenuItems] = useState([
        { id: 1, title: 'Ürün Ekle', link: '/#/addproduct' },
        { id: 2, title: 'Ürün Sil', link: '/#/delete' },
        { id: 3, title: 'Ürün Düzenle', link: '/services' },
        { id: 4, title: 'İletişim', link: '/contact' },
        {id:5,title:"Siparişler",link:'/#/allOrders'}
      ]);

    return (
        <div className="sidebar"> 
             
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      

        </div>
       
    )
}
export default Menu;