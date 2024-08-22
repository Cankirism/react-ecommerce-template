import { useEffect, useState } from "react";
import {  fetchDistrictsofProvince, fetchNeighborhoods, fetchProvinces } from "../../../api/api";
import "../UserRegister.css"
const FetchNeighborhoods =({districtId})=>{
    const [neigborhoods,setNeighborhods] = useState([
       
    ]);
    const [selectedOption,setSelectedOption]=useState("");
    useEffect(()=>{
       
        const getNeighborhoods =async ()=>{
            const result = await fetchNeighborhoods(districtId);
          
            if(result){
           setNeighborhods(result.data.neigborhoods)
            }
        }

        getNeighborhoods();
             

    },[districtId])

    const handleNeghbordhoodChange = (e)=>{
        setSelectedOption(e.target.value);

    }
    return (
        <div className="option-div"> 
      <h6>Mahalle Seçiniz </h6>
      <select
      className="select-options"
      id="district-select"
        value={selectedOption}
        onChange={handleNeghbordhoodChange}
    
      >
        {neigborhoods.map((option) => (
          <option key={option._id} value={`${option.name}`}   >
            {option.name}
          </option>
        ))}
      </select>
    </div>

    )

}

export default FetchNeighborhoods;