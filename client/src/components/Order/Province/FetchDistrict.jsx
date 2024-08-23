import { useEffect, useState } from "react";
import {  fetchDistrictsofProvince, fetchProvinces } from "../../../api/api";
import "../UserRegister.css"
const FetchDistrict =(props)=>{
    const [districts,setDistricts] = useState([
       
    ]);
    const [selectedOption,setSelectedOption]=useState("");
    useEffect(()=>{
       
        const getDistricts =async ()=>{
            const result = await fetchDistrictsofProvince(props.provinceId);
          
            if(result){

           setDistricts(result.data.districts)
           props.handleChange(result.data.districts[0].id,result.data.districts[0].name);
            }
        }

        getDistricts();
             

    },[props.provinceId])

    const handleDistrictChange = (e)=>{
      console.log("merhaba handle change methodundan geliyorum district")
      const val = e.target.value.split("-");
    
      setSelectedOption(e.target.value);
     props.handleChange(val[0],val[1]);


        


    }
    return (
        <div>
      <h6>İlçe Seçiniz </h6>
      <select
        id="district-select"
        value={selectedOption}
        onChange={handleDistrictChange}
        className="select-options"
    
      >
        {districts.map((option) => (
          <option key={option._id} value={`${option.id}-${option.name}`}   >
            {option.name}
          </option>
        ))}
      </select>
    </div>

    )

}

export default FetchDistrict;