import React, {useEffect, useState} from 'react';
import Card from "../ui/Card/Card";
import classes from "./AudioStorage.module.css";
import Modal from "../ui/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../hoc/redux";
import {fetchLessons} from "../../store/reducers/LessonActions";

const AudioStorage = () => {
    const [active, setActive] = useState(false);
    const {lessons} = useAppSelector(state => state.lessonReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLessons());
    }, [])

    return (
        <div className={classes.container}>
            {
                lessons.map((lesson) => <Card key={lesson.id} category={lesson.category} title={lesson.title} id={lesson.id}/>)
            }
            <div className={classes.newLesson} onClick={() => setActive(true)}>
                Add Lesson
            </div>
            {active && <Modal active={active} setActive={setActive}/>}
        </div>
    );
};

export default AudioStorage;
