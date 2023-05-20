import React from 'react'
import cl from './Form.module.css'

export default function Form(props) {
  return (
    <div className={cl.login}>
        <div className={cl.content}>
          <h2 className={cl.title}>
            {props.title}
          </h2>
          <form className={cl.form}>
            {props.children}
          </form>
        </div>
    </div>
  )
}
