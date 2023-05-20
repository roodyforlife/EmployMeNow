import React from 'react'
import cl from './Filtration.module.css'

export default function Filtration(props) {
  return (
    <div className={cl.filtration}>
      <div className={cl.title}>Filtration</div>
        {props.children}
    </div>
  )
}
