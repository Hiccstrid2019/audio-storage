import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import Card from "../ui/Card/Card";
import classes from "./AudioStorage.module.css";
import Modal from "../ui/Modal/Modal";

const AudioStorage = () => {
    const {store} = useContext(Context);
    const [active, setActive] = useState(false);
    return (
        <div className={classes.container}>
            {
                store.lessons.map((lesson) => <Card key={lesson.id} category={lesson.category} title={lesson.title} id={lesson.id}/>)
            }
            <div className={classes.newLesson} onClick={() => setActive(true)}>
                Add Lesson
            </div>
            {active && <Modal active={active} setActive={setActive} addLesson={store.addLesson.bind(store)}/>}
        </div>
    );
};

export default AudioStorage;
