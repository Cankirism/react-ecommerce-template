import { useEffect, useState } from "react";
import { fetchProvinces } from "../../../api/api";
import FetchDistrict from "./FetchDistrict";
import "../UserRegister.css";
const FetchProvince = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedProvince, setSelectedProvince] = useState(0);
  useEffect(() => {
    const getProvinces = async () => {
      const result = await fetchProvinces();
      if (result) {
        props.handleChange(
          result.data.provinces.data[0].id,
          result.data.provinces.data[0].name
       );

        setProvinces(result.data.provinces.data);
      }
    };

    getProvinces();
  }, []);

  const handleProvinceChange = (e) => {
    const val = e.target.value.split("-");

    setSelectedOption(e.target.value);
    props.handleChange(val[0], val[1]);
  };

  return (
    <div>
      <h6>Şehir Seçiniz </h6>
      <select
        id="province-select"
        value={selectedOption}
        onChange={handleProvinceChange}
        className="select-options"
      >
        {provinces.map((option) => (
          <option key={option._id} value={`${option.id}-${option.name}`}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FetchProvince;
