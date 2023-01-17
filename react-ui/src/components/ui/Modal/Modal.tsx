import React, {useState} from 'react';
import classes from "./Modal.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useAppDispatch} from "../../../hoc/redux";
import {addLesson} from "../../../store/reducers/LessonActions";

interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<boolean>;
}

const Modal = ({active, setActive}: ModalProps) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useAppDispatch();
    const handleForm = () => {
        // addLesson(name, category);
        setActive(false);
        dispatch(addLesson({title, category}));
    }
    return (
        <div className={classes.container} onClick={() => setActive(false)}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <div className={classes.title}>Create new lesson</div>
                <Input text="Enter lesson name" setValue={setTitle}/>
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
