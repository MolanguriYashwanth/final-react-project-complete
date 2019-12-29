import React from "react";
import classes from "./Button.module.css";

const button = (props)=>(
    <button 
    className={[classes.Button,classes[props.btnType]].join(' ')}
    disabled={props.formIsValid?!props.formIsValid:false}
    onClick={props.clicked}>{props.children}</button>
)

export default button;