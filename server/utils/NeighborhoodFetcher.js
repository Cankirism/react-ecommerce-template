const endpoint = "https://turkiyeapi.dev/api/v1/"
const axios = require("axios");
module.exports.Neighborhoods = async(districtId)=>{
    const result = await axios.get(`${endpoint}/districts/${districtId}`);
   
    return result.data.data;

}