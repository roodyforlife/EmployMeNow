import React from 'react'
import Button from '../../Button/Button'
import Form from '../../Form/Form'
import Input from '../../Input/Input'
import cl from '../MyModal.module.css'

const SkillCreateModal = (({show, onHide, title, create, newName, setNewName}) => {
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
          <Form title="Write a name for tag">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" holder="Name" />
            <Button onClick={create}>Create</Button>
          </Form>
      </div>
    </div>
  </div>
  )
});

export default SkillCreateModal;