import React, {useContext} from 'react';
import {Context} from "../index";
import Card from "./ui/Card/Card";
import classes from "./AudioStorage.module.css";

const AudioStorage = () => {
    const {store} = useContext(Context);
    return (
        <div className={classes.container}>
            {
                store.lessons.map((lesson) => <Card key={lesson.id} category={lesson.category} title={lesson.title} id={lesson.id}/>)
            }
        </div>
    );
};

export default AudioStorage;
