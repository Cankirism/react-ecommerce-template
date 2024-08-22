// src/components/UserInfo.js
// src/components/UserRegister.js
import React, { useState } from "react";
import "./UserRegister.css"; // Import the CSS file for styling
import FetchProvince from "./Province/FetchProvince";
import FetchDistrict from "./Province/FetchDistrict";
import FetchNeighborhoods from "./Province/FetchNeighborhoods";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedProvince,setSelectedProvince]=useState(1);
  const [selectedDistrict,setSelectedDistrict]=useState(1757);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProvinceChange =(id)=>{
    setSelectedProvince(id);
  }
  const handleDistrictChange =(id)=>{
    setSelectedDistrict(id)
  }
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords must match";
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
          <label htmlFor="password">Telefon</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <FetchProvince  handleChange ={(id)=>handleProvinceChange(id)}/>
        <FetchDistrict  provinceId={selectedProvince} handleChange={(id)=>handleDistrictChange(id)}/>
        <FetchNeighborhoods districtId={selectedDistrict} />
       <div className="form-group">
        <label>Adres detayı belirtiniz </label>
        <textarea 
        id="address"
        className="form-control"
        rows="5"
        name="address"
        placeholder="Açık adres belirtiniz. Sokak cadde semt daire no vb."
        ></textarea>

       </div>
        <button type="submit" className="submit-button">
          Siparişi Tamamla
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
