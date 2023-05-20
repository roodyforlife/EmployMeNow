import React from 'react'
import cl from './CheckBoxV2.module.css';

export default function Checkbox({checked, children, style}) {
  return (
    <div className={cl.content}>
        <input checked={checked} type="checkbox" className={cl.checkbox} />
        <label style={style}>{children}</label>
    </div>
  )
}
