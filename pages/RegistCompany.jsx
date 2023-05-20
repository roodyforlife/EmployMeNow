import jwt_decode from 'jwt-decode';
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import Button from "../components/UI/Button/Button";
import Form from "../components/UI/Form/Form";
import Input from "../components/UI/Input/Input";
import { googleLogin, registCompany } from "../http/authAPI";
import { GOOGLE_REGIST_COMPANY_ROUTE, MAIN_ROUTE } from "../utils/consts";
import mapJwtClaims from '../utils/mapJwtClaims';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from '../components/UI/GoogleButton/GoogleButton';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

 const RegistCompany = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({email: "",password: "",companyName: "",address: "",description: "",});

  const regist = useGoogleLogin({
    onSuccess: async response => {
      try {
        const {data} = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${response.access_token}`
          }
        })
        
        await googleLogin(data.email).then(result => {
            if(result.successed){
                localStorage.setItem('token', result.jwtToken)
                user.setUser(mapJwtClaims(jwtDecode(result.jwtToken)));
                user.setIsAuth(true);
                navigate(MAIN_ROUTE);
            } else {
                if(result.errors.email){
                localStorage.setItem('googleData', JSON.stringify(data))
                navigate(GOOGLE_REGIST_COMPANY_ROUTE);
                } else if(result.errors.banned) {
                    alert(result.errors.banned[0])
                }
            }

        }).catch(error => {
            console.log(error)
        })

      } catch (error) {
        console.log(error)
      }
    }
  });
 
  const click = async (event) => {
    event.preventDefault();
        await registCompany(form).then((data) => {
            if (data.successed) {
              localStorage.setItem("token", data.jwtToken);
              user.setUser(mapJwtClaims(jwt_decode(data.jwtToken)));
              user.setIsAuth(true);
              navigate(MAIN_ROUTE);
            }
            // else {
            //   Object.values(data.errors).map(item => {
            //       alert(item)
            //   })
            // }
          })
        //   .catch((data) => {
        //     var ErrorString = '';
        //     Object.keys(data.response.data.errors).map(item => {
        //         ErrorString += `${item} - ${data.response.data.errors[item]}\n`
        //     })
            
        //     alert(ErrorString);
        // })
  };
  return (
    <div>
       
      <Form title="Create company">
        <Input
          type="email"
          holder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value})}
        />
        <Input
          type="password"
          holder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value})}
        />
        <Input
          type="text"
          holder="Company name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value})}
        />
        <Input
          type="text"
          holder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value})}
        />
        <Input
          type="text"
          holder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value})}
        />
        <Button onClick={click}>
          Create
        </Button>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, width: '100%'}}>
       <GoogleButton onClick={(event) => {
        event.preventDefault();
        regist()
       }}>
          Sign up with Google
       </GoogleButton>
        </div>
      </Form>
    </div>
  );
}

export default RegistCompany;