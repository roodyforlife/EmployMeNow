import jwtDecode from 'jwt-decode';
import React, {  useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';
import Form from '../components/UI/Form/Form';
import Input from '../components/UI/Input/Input';
import {googleLogin, defaultLogin} from '../http/authAPI';
import { GOOGLE_REGIST_COMPANY_ROUTE, MAIN_ROUTE } from '../utils/consts';
import mapJwtClaims from '../utils/mapJwtClaims';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from '../components/UI/GoogleButton/GoogleButton';
import axios from 'axios';

export default function Login() {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [form, setForm] = useState({login: '', password: ''});
    const click = async (event) => {
        event.preventDefault();
        try {
            await defaultLogin(form).then(data => {
               if(data.successed) {
                localStorage.setItem('token', data.jwtToken)
                user.setUser(mapJwtClaims(jwtDecode(data.jwtToken)));
                user.setIsAuth(true);
                navigate(MAIN_ROUTE)
               } else {
                alert(data.errors.password[0])
               }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const login = useGoogleLogin({
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

  return (
    <div>
        <Form title='Login'>
            <Input type="text" holder='Login' value={form.login} onChange={(e) => setForm({...form, login: e.target.value})} />
            <Input type="password" holder='Password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            <Button onClick={(event) => click(event)}>Login</Button>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, width: '100%'}}>
       <GoogleButton onClick={(event) => {
        event.preventDefault();
        login();
       }}>
          Sign in with Google
       </GoogleButton>
        </div>
        </Form>
    </div>
  )
}
