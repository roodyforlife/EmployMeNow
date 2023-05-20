import React from 'react'
import cl from'./GoogleButton.module.css'

export default function GoogleButton(props) {
  return (
    <button {...props} className={cl.login} >
        {props.children}
    </button>
  )
}
