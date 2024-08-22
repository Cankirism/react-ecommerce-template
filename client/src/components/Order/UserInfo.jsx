// src/components/UserInfo.js
// src/components/UserRegister.js
import React, { useState } from "react";
import "./UserRegister.css"; // Import the CSS file for styling
import FetchProvince from "./Province/FetchProvince";
import FetchDistrict from "./Province/FetchDistrict";
import FetchNeighborhoods from "./Province/FetchNeighborhoods";

const UserInfo = () => {

  const [province,setProvince]=useState("");
  const [district,setDistrict]=useState("");
  const [neighborhood,setNeighborhood]=useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province:province,
    district:district,
    neighborhoods:neighborhood,
    address:""

  });

  const [selectedProvince,setSelectedProvince]=useState(1);
  const [selectedDistrict,setSelectedDistrict]=useState(1757);
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProvinceChange =(id,name)=>{
    setSelectedProvince(id);
    setProvince(name)
    console.log(name);
    setFormData({...formData,["province"]:name})
  }
  const handleDistrictChange =(id,name)=>{
   
    setSelectedDistrict(id);
    setDistrict(name);
    setFormData({...formData,["district"]:name})

  }
  const handleNeighborhood =(name)=>{
    setNeighborhood(name);
    setFormData({...formData,["neighborhoods"]:name})

  }
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
   
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    
    if(!formData.phone) errors.phone="Phone required";

    
    else if(!(formData.phone.match('[0-9]{11}'))) errors.phone="Telefon numarasını dogru giriniz "; 
    if(!formData.address) errors.address="Açık adresi detaylı giriniz"
    return errors;
  };

  const handleSubmit = (e) => {
   
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
     
   
      console.log("Form data submitted:", formData);
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
        id="address"
        className="form-control"
        rows="5"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Açık adres belirtiniz. Sokak cadde semt daire no vb."
        ></textarea>
          {errors.address && <span className="error">{errors.address}</span>}

       </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Siparişi Tamamla
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
