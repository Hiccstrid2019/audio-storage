import classes from "./Input.module.css"
import React from "react";

interface InputProps {
    text: string,
    setValue: React.Dispatch<string>
}
const Input = ({text, setValue}: InputProps) => {
    return (
        <div>
            <input className={classes.input} placeholder={text} onChange={event => setValue(event.target.value)}/>
        </div>
    );
};

export default Input;
