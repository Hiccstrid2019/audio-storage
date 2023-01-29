import React from 'react';
import classes from "./Modal.module.css";

interface ModalProps {
    setActive: React.Dispatch<boolean>;
    children?: React.ReactNode;
}

const Modal = ({setActive, children}: ModalProps) => {

    return (
        <div className={classes.container} onClick={() => setActive(false)}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
