import React, {useEffect, useState} from 'react';
import Card from "../ui/Card/Card";
import classes from "./ProjectStorage.module.css";
import Modal from "../ui/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../hoc/redux";
import {fetchProjects} from "../../store/reducers/ProjectActions";

const ProjectStorage = () => {
    const [active, setActive] = useState(false);
    const {projects} = useAppSelector(state => state.projectReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProjects());
    }, [])

    return (
        <div className={classes.container}>
            {
                projects.map((project) => <Card key={project.id} category={project.category} title={project.title} id={project.id}/>)
            }
            <div className={classes.newLesson} onClick={() => setActive(true)}>
                Add Project
            </div>
            {active && <Modal active={active} setActive={setActive}/>}
        </div>
    );
};

export default ProjectStorage;
