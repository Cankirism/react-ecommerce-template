import { useEffect, useState } from "react";
import {  fetchDistrictsofProvince, fetchNeighborhoods, fetchProvinces } from "../../../api/api";
import "../UserRegister.css"
const FetchNeighborhoods =(props)=>{
    const [neigborhoods,setNeighborhods] = useState([
       
    ]);
    const [selectedOption,setSelectedOption]=useState("");
    useEffect(()=>{
       
        const getNeighborhoods =async ()=>{
            const result = await fetchNeighborhoods(props.districtId);
          
            if(result){
              props.handleChange(result.data.neigborhoods[0].name);

           setNeighborhods(result.data.neigborhoods)
            }
        }

        getNeighborhoods();
             

    },[props.districtId])

    const handleNeghbordhoodChange = (e)=>{
        setSelectedOption(e.target.value);
        props.handleChange(e.target.value);


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