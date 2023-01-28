import React, {MouseEventHandler, useState} from 'react';
import classes from "./Card.module.css";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../hoc/redux";
import {deleteProject} from "../../../store/reducers/ProjectActions";
import TrashIcon from './trash.svg'
import EditIcon from './edit.svg'

interface CardProps {
    category: string,
    title: string,
    id: string
}

const Card = ({category, title, id} : CardProps) => {
    const dispatch = useAppDispatch();
    const [hovered, setHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(deleteProject(id));
    }

    return (
        <Link className={classes.link} to={`/project/${id}`}
        >
            <div className={classes.card}
                 onMouseEnter={() => setHovered(hovered => !hovered)}
                 onMouseLeave={() => setHovered(hovered => !hovered)}>
                <img src={EditIcon} className={hovered ? classes.editWall : classes.noEditWall}/>
                <div className={classes.fill}></div>
                <div className={classes.info}>
                    <div>{category}</div>
                    <div className={classes.title}>{title}</div>
                </div>

                <img src={TrashIcon} className={hovered ? classes.trash : classes.noTrash}
                    onClick={handleClick}/>

            </div>
        </Link>
    );
};

export default Card;
