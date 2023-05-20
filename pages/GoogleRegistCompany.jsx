import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';
import Form from '../components/UI/Form/Form'
import Input from '../components/UI/Input/Input'
import { googleRegistCompany } from '../http/authAPI';
import { MAIN_ROUTE } from '../utils/consts';
import mapJwtClaims from '../utils/mapJwtClaims';

export default function GoogleRegistCompany() {
  const [form, setForm] = useState({companyName: "", address: "", description: "", email: JSON.parse(localStorage.getItem('googleData')).email });
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const click = async (event) => {
    event.preventDefault();
    await googleRegistCompany(form).then((data) => {
        if (data.successed) {
        localStorage.setItem('token', data.jwtToken);
        user.setUser(mapJwtClaims(jwtDecode(data.jwtToken)));
        user.setIsAuth(true);
        localStorage.removeItem('googleData');
        navigate(MAIN_ROUTE);
        }
        // else {
        //     Object.values(data.errors).map(item => {
        //         alert(item)
        //     })
        // }
    })
    // .catch((data) => {
    //     var ErrorString = '';
    //         Object.keys(data.response.data.errors).map(item => {
    //             ErrorString += `${item} - ${data.response.data.errors[item]}\n`
    //         })
            
    //         alert(ErrorString);
    // })
  }

  return (
    <div>
        <Form>
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
        <Button onClick={click}>Create</Button>
        </Form>
    </div>
  )
}
