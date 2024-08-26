import React, { useEffect, useState } from 'react';
import "./DataTable.css"

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

          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row._id}</td>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.date}</td>

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
