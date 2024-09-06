import { error } from "console";
import { verifyToken } from "../../../api/api"
const verifyToken =async(token)=>{
    const result = await verifyToken(token);
    if(result){
        return true
    }
    else {
        throw new Error(result.data.message)
    }
    


}