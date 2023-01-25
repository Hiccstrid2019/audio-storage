import React, {MouseEventHandler, useState} from 'react';
import classes from "./Card.module.css";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../hoc/redux";
import {deleteLesson} from "../../../store/reducers/LessonActions";
import TrashIcon from './trash.svg'

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
        dispatch(deleteLesson(id));
    }

    return (
        <Link className={classes.link} to={`/audio/${id}`}
        onMouseEnter={() => setHovered(hovered => !hovered)}
        onMouseLeave={() => setHovered(hovered => !hovered)}>
            <div className={classes.card}>
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
