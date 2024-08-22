const endpoint = "https://turkiyeapi.dev/api/v1/provinces"
const axios = require("axios");
module.exports.ProvinceFetcher = async()=>{
    const result = await axios.get(endpoint);
    return result.data



}