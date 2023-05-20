import React from "react";
import cl from "./Select.module.css";

export default function Select(props) {
  return (
    <div className={cl.block} {...props}>
      <span className={cl.holder}>{props.holder}</span>
        <select {...props}>
            {props.children}
        </select>
    </div>
  );
}
