const axios = require("axios");
const endpoint = "https://turkiyeapi.dev/api/v1"
module.exports.Districts = async (provinceId)=>{
    
    // ilin id değerine göre ilçe listesini getirir
    const result =await axios.get(`${endpoint}/provinces/${provinceId}`);
    return result.data.data;

}