// src/components/UserInfo.js
// src/components/UserRegister.js
import React, { useState } from "react";
import "./UserRegister.css"; // Import the CSS file for styling
import FetchProvince from "./Province/FetchProvince";
import FetchDistrict from "./Province/FetchDistrict";
import FetchNeighborhoods from "./Province/FetchNeighborhoods";
import { postOrders, postOrdersDetail } from "../../api/api";

const UserInfo = ({orders}) => {

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province:"",
    district:"",
    neighborhood:"",
    fullAddress:"",
    isActive:true,
    date:Date.now()

  });

  const [selectedProvince,setSelectedProvince]=useState(1);
  const [selectedDistrict,setSelectedDistrict]=useState(1757);
  const [selectedNeighborhood,setSelectedNeighborhood]=useState(176887);
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProvinceChange =(id,name)=>{
    setSelectedProvince(id);
    //setProvince(name)
    console.log("this is user infon page, province cnanged");
    setFormData({...formData,["province"]:name})
  }
  const handleDistrictChange =(id,ilce)=>{
    console.log("this is user infon page, ilçe cnanged. new ilçe is",ilce);
    setSelectedDistrict(id);
   // setDistrict(name);
    //setDistrict(name);
    setFormData({...formData,["district"]:ilce})

  }
  const handleNeighborhood =(name)=>{
    console.log("this is user infon page, mahalle cnanged");
   // setNeighborhood(name);
    setFormData({...formData,["neighborhood"]:name})

  }
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
   
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    
    if(!formData.phone) errors.phone="Phone required";

    
    else if(!(formData.phone.match('[0-9]{11}'))) errors.phone="Telefon numarasını dogru giriniz "; 
    if(!formData.fullAddress) errors.fullAddress="Açık adresi detaylı giriniz"
    return errors;
  };

  const sendOrders =async(data)=>{
    const result = await postOrders(data);
    if(result){
     // alert(result.data.id);
   await postOrderDetail();

    }
    else {
      alert(result.data.message);
    }

  }

  const postOrderDetail =async()=>{
    if(orders){
     

    }

     
  }
  
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
     
       await sendOrders(formData);
      
      // Add form submission logic here (e.g., API call)
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="user-register">
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="name">Adınız</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Epostanız </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefon</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <FetchProvince  handleChange ={(id,name)=>handleProvinceChange(id,name)}/>
        <FetchDistrict  provinceId={selectedProvince} handleChange={(id,name)=>handleDistrictChange(id,name)}/>
        <FetchNeighborhoods districtId={selectedDistrict} handleChange={(name)=>handleNeighborhood(name)} />
       <div className="form-group">
        <label>Adres detayı belirtiniz </label>
        <textarea 
        id="fullAddress"
        className="form-control"
        rows="5"
        name="fullAddress"
        value={formData.fullAddress}
        onChange={handleChange}
        placeholder="Açık adres belirtiniz. Sokak cadde semt daire no vb."
        ></textarea>
          {errors.fullAddress && <span className="error">{errors.fullAddress}</span>}

       </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Siparişi Tamamla
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
