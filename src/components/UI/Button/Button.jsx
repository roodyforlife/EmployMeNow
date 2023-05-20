import React from 'react'
import cl from './Button.module.css'

export default function Button(props) {
  return (
    <button className={cl.button} {...props}>{props.children}</button>
  )
}
