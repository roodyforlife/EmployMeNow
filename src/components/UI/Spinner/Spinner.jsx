import React from "react";
import cl from './Spinner.module.css'

export default function Spinner() {
  return (
   <div className={cl.container}>
     <div className={cl.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
   </div>
  );
}
