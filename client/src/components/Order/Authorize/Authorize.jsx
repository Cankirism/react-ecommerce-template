import {useJwt} from "react-jwt"
import { useHistory } from "react-router-dom";
import { verifyToken } from "../../../api/api";
const Authorize = ({children})=>{
    const token = localStorage.getItem("accessToken");
    const jwt = useJwt(token);
    const history = useHistory();
    if(!token||token==""||jwt.isExpired||!verifyToken(token)){
        history.push("/login")
    }
    return children;
}
export default Authorize;
