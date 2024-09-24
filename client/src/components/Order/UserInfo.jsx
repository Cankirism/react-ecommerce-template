// src/components/UserInfo.js
// src/components/UserRegister.js
import React, { useState } from "react";
import "./UserRegister.css"; // Import the CSS file for styling
import FetchProvince from "./Province/FetchProvince";
import FetchDistrict from "./Province/FetchDistrict";
import FetchNeighborhoods from "./Province/FetchNeighborhoods";
import { postOrders,postOrdersDetail} from "../../api/api";
import toast,{ Toaster } from "react-hot-toast";
const UserInfo = ({ orders }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    neighborhood: "",
    fullAddress: "",
    isActive: true,
    date: Date.now(),
    summary:""
  });

  const [selectedProvince, setSelectedProvince] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState(1757);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(176887);
  const [order, setOrder] = useState([]);
  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState({});
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProvinceChange = (id, name) => {
    setSelectedProvince(id);
    //setProvince(name)

    setFormData({ ...formData, ["province"]: name });
  };
  const handleDistrictChange = (id, ilce) => {
    setSelectedDistrict(id);
    // setDistrict(name);
    //setDistrict(name);
    setFormData({ ...formData, ["district"]: ilce });
  };
  const handleNeighborhood = (name) => {
    // setNeighborhood(name);
    setFormData({ ...formData, ["neighborhood"]: name });
  };
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Lütfen ad ve soyadı giriniz ";
    if (!formData.email) errors.email = "Lütfen e-posta adresinizi giriniz";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Eposta formata uygun değil";

    if (!formData.phone) errors.phone = "Lütfen telefon no giriniz";
    else if (!formData.phone.match("[0-9]{11}"))
      errors.phone = "Telefon numarasını 11 haneli giriniz ";
    if (!formData.fullAddress)
      errors.fullAddress = "Açık adresi detaylı giriniz";
    return errors;
  };

  const sendOrders = async (data) => {
    const result = await postOrders(data);
    if (result) {
      // alert(result.data.id);
      return await postOrderDetail(result.data.orderId);
    } else {
      alert(result.data.message);
    }
  };


  

  const renewOrderDetail = async () => {
    if (orders) {
      orders.map((orderr) => {
        const newOrder = {
          productId: orderr.id,
          productName: orderr.name,
          quantity: orderr.quantity,
          price: orderr.price.toFixed(2),
        };
        order.push(newOrder);
      });
    }
  };



  const postOrderDetail = async (id) => {
    await renewOrderDetail();
    if (order.length == orders.length) {
     
      const orderDetailBody = {
        orderId: id,
        sum: "",
        status: "Talep OluÅŸturuldu",
        cargoName: "",
        cargoCode: "",
        isActive: true,
        date: Date.now(),
        orders: order,
      };

      return await postOrdersDetail(orderDetailBody);
    }
  };



  const handleSubmit = async (e) => {
    setLoading(true);
    
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const result = await sendOrders(formData);
      console.log("result is ",result);
      if (result && result.data.status === "success") {
      
       toast.success("Siparişiniz başarıyla oluşturuldu")
       setLoading(false);
     
      } else {
        toast.error("Hata. Lüttfen tekrar deneyiniz")
        setLoading(false);
       
      }

      // Add form submission logic here (e.g., API call)
    } else {
      setErrors(validationErrors);
    }
  };



  return (
    <div className="user-register">
      <form onSubmit={handleSubmit}>
        <Toaster />
        <div className="form-group ">
          <label htmlFor="name">Adınız ve Soyadınız</label>
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
        <FetchProvince
          handleChange={(id, name) => handleProvinceChange(id, name)}
        />
        <FetchDistrict
          provinceId={selectedProvince}
          handleChange={(id, name) => handleDistrictChange(id, name)}
        />
        <FetchNeighborhoods
          districtId={selectedDistrict}
          handleChange={(name) => handleNeighborhood(name)}
        />
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
          {errors.fullAddress && (
            <span className="error">{errors.fullAddress}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="payingMethod">Ödeme Yöntemi</label>
          <input
            type="payingMethod"
            id="payingMethod"
            name="payingMethod"
            value="Kapıda Ödeme"
            disabled
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Açıklama </label>
          <textarea
            id="summary"
            className="form-control"
            rows="5"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Açıklama giriniz .."
          ></textarea>
         
        </div>
         <button type="submit" disabled={loading} className="submit-button" onClick={handleSubmit}>
            {loading?"İşlem Yapılıyor ...":"Siparişi Tamamla"}
          </button>
        
      </form>
    </div>
  );
};

export default UserInfo;
