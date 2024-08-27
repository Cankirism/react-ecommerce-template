import React, { useEffect, useState } from 'react';
import "./DataTable.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';

const DataTable = ({ data,headers }) => {
   const [orders,setOrders]=useState(data);
 useEffect(()=>{
    console.log("datable rendered");
 },[]);
    // if (!data || data.length === 0) {
    // return <p>No data available</p>;
  
  return (
    <>
    <div className="data-table-container">
      <table className="data-table">
        <thead>
        
          <tr>
           {
            headers.map((header)=>(
                <th>{header}</th>
            ))
           }
           <th>
            İşlem
           </th>

          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row._id}</td>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.date}</td>
              <td>{row.province}</td>
              <td>{row.district}</td>
              <td>{row.neighborhood}</td>
              <td>
                <Link to={`/orderDetail/${row._id}`}>
                <button className='btn btn-outline-success'>Detay</button>
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
        <tfoot>{data.length} kayıt getirildi</tfoot>
      </table>

    

    </div>



    </>
    
  );
};

export default DataTable;
