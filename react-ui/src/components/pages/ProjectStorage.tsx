import React, {useEffect, useState} from 'react';
import Card from "../ui/Card/Card";
import classes from "./ProjectStorage.module.css";
import Modal from "../ui/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../hoc/redux";
import {addProject, fetchProjects} from "../../store/reducers/ProjectActions";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";

const ProjectStorage = () => {
    const [active, setActive] = useState(false);
    const {projects} = useAppSelector(state => state.projectReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProjects());
    }, [])

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const handleForm = () => {
        setActive(false);
        dispatch(addProject({title, category}));
    }

    return (
        <div className={classes.container}>
            {
                projects.map((project) => <Card key={project.id} category={project.category} title={project.title} id={project.id} posterUrl={project.posterUrl}/>)
            }
            <div className={classes.newLesson} onClick={() => setActive(true)}>
                Add Project
            </div>
            {active &&
                <Modal setActive={setActive}>
                    <div className={classes.title}>Create new project</div>
                    <Input text="Enter project name" setValue={setTitle}/>
                    <Input text="Enter category name" setValue={setCategory}/>
                    <div className={classes.btnRow}>
                        <Button text='Cancel' style={{marginRight: "8px"}} onClick={() => setActive(false)}/>
                        <Button text='Add project' type='primary' onClick={handleForm}/>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default ProjectStorage;
