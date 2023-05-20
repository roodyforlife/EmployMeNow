import React from 'react'
import cl from './Input.module.css'
export default function Input(props) {
  return (
    <div className={cl.block} {...props}>
        <span className={cl.holder}>{props.holder}</span>
        <input className={[(props.validation && cl.error)].join(' ')} {...props} />
        {
            props.validation &&
            <span className={cl.validation}>{props.validation}</span>
        }
    </div>
  )
}
