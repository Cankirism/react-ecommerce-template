import { replace, useFormik } from "formik";
import bcrypt from "bcryptjs-react"
import { loginn } from "../api/api";
import { HttpStatusCode } from "axios";
import {useHistory} from "react-router-dom"
import toast,{ Toaster } from "react-hot-toast";
const Login = () => {
  const history= useHistory();
  
    const formik = useFormik({
        initialValues:{
            Email:"",
            Password:""
        },onSubmit: async (values)=>{
            try{
                console.log("values is ",values);
                if(values.Email==""||values.Password==""){
                  toast.error("Lütfen alanları doldurunuz")
                }
                else {
                  const apiResult =  await loginn(values);
                 console.log("api result is ",apiResult);
                 if(apiResult.status===HttpStatusCode.Ok){
                    sessionStorage.setItem("isLogged",true);
                    localStorage.setItem("accessToken",apiResult.data.accessToken);
                    history.push("/admin");
                 }
                 else {
                   throw new Error(apiResult.data.message)
                 }

                }
                // const hashedPassword = await bcrypt.hashSync(values.Password);
                // let valuess =  values;
                //valuess.Password=hashedPassword;
                 

            }
            catch(err){
              toast.error(err.message)
            }
          
            
        }
    })
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <form id="loginForm" onSubmit={formik.handleSubmit}>
        <h3>Sisteme Giriş</h3>
       <Toaster/>
        <div className="mb-3">
          <label>Email </label>
          <input
            type="email"
            id="Email"
            className="form-control"
            placeholder="Enter email"

            onChange={formik.handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label>Parola</label>
          <input
            type="password"
            id="Password"
            className="form-control"
            placeholder="Enter password"
            onChange={formik.handleChange}
          />
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Giriş
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="#">parolamı unuttum</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
