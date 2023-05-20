import React from 'react'
import cl from './CheckBox.module.css'

export default function CheckBox({check, title, style, checked}) {
  return (
    <div className={cl.box} style={style}>
        <div className={cl.title}>{title}</div>
        <label className={cl.toggle} htmlFor="myToggle">
        <input className={cl.toggle__input} onChange={(event) => check(event)} checked={checked} type="checkbox" id="myToggle" />
        <div className={cl.toggle__fill}></div>
        </label>
    </div>
  )
}
