import React, { useState } from 'react'
import Button from '../../Button/Button';
import Form from '../../Form/Form'
import Input from '../../Input/Input';
import cl from '../MyModal.module.css'

export default function EditCompany({show, onHide, title, company, edit}) {
    const [form, setForm] = useState({companyName: company.companyName, address: company.address, description: company.description});
  return (
    <div
    className={cl.modal}
    style={show ? { display: "flex" } : { display: "none" }}
    onClick={onHide}
  >
    <div className={cl.container} onClick={(e) => e.stopPropagation()}>
      <div className={cl.title}>
        <h3>{title}</h3>
        <span onClick={onHide} className={cl.close}>
          &times;
        </span>
      </div>
      <hr />
      <div className={cl.content}>
         <Form>
            <Input type="text" holder='Name' value={form.companyName} onChange={(e) => setForm({...form, companyName: e.target.value})}></Input>
            <Input type="text" holder='Address' value={form.address} onChange={(e) => setForm({...form, address: e.target.value})}></Input>
            <Input type="text" holder='Description' value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}></Input>
            <Button onClick={(event) => edit(event, form)}>Edit</Button>
         </Form>
      </div>
    </div>
  </div>
  )
}
