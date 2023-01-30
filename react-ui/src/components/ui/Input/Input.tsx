import classes from "./Input.module.css"
import React from "react";

interface InputProps {
    text: string,
    setValue: React.Dispatch<string>
    [props: string]: any;
}
const Input = ({text, setValue, ...rest}: InputProps) => {
    return (
        <div>
            <input className={classes.input} placeholder={text} onChange={event => setValue(event.target.value)} {...rest}/>
        </div>
    );
};

export default Input;
