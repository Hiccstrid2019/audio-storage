import React, {useState} from 'react';
import classes from "./Modal.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Modal = ({active, setActive, addLesson}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const handleForm = () => {
        addLesson(name, category);
        setActive(false);
    }
    return (
        <div className={classes.container} onClick={() => setActive(false)}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <div className={classes.title}>Create new lesson</div>
                <Input text="Enter lesson name" setValue={setName}/>
                <Input text="Enter category name" setValue={setCategory}/>
                <div className={classes.btnRow}>
                    <Button text='Cancel' style={{marginRight: "8px"}} onClick={() => setActive(false)}/>
                    <Button text='Add lesson' type='primary' onClick={handleForm}/>
                </div>
            </div>
        </div>
    );
};

export default Modal;