import React, {useState} from 'react';
import classes from "./Card.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hoc/redux";
import {addPoster, deleteProject} from "../../../store/reducers/ProjectActions";
import TrashIcon from './trash.svg'
import EditIcon from './edit.svg'
import Modal from "../Modal/Modal";

interface CardProps {
    category: string,
    title: string,
    id: string;
    posterUrl?: string;
}

const Card = ({category, title, id, posterUrl} : CardProps) => {
    const dispatch = useAppDispatch();
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(deleteProject(id));
    }

    const openModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setHovered(false);
        setActive(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (!e.target.files) return;

        dispatch(addPoster({projectId: id, fileImg: e.target.files[0]}));
        setActive(false);
    }
    return (
        <>
            <Link className={classes.link} to={`/project/${id}`}>
                <div className={classes.card}
                     onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}>
                    <img src={EditIcon} className={hovered ? classes.editWall : classes.noEditWall} onClick={openModal}/>
                    <div className={classes.fill} style={posterUrl ? {backgroundImage: `url(${posterUrl})`} : {}}></div>
                    <div className={classes.info}>
                        <div>{category}</div>
                        <div className={classes.title}>{title}</div>
                    </div>

                    <img src={TrashIcon} className={hovered ? classes.trash : classes.noTrash}
                         onClick={handleClick}/>
                </div>
            </Link>
            {active &&
                <Modal setActive={setActive}>
                    <input type='file' accept="image/png, image/jpeg" onChange={handleChange}/>
                    <div className={classes.hintModal}>Images wider than 1500 pixels will be displayed better</div>
                </Modal>
            }
        </>
    );
};

export default Card;
