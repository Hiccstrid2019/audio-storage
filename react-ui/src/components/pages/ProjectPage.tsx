import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import classes from "./ProjectPage.module.css";
import Audio from "../ui/Audio/Audio";
import MicIcon from "./mic.svg"
import MicIconFrame1 from "./mic1.svg"
import MicIconFrame2 from "./mic2.svg"
import MicIconFrame3 from "./mic3.svg"
import EditIcon from "./edit.svg"
import ApplyIcon from "./apply.svg"
import Button from "../ui/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hoc/redux";
import {addAudio, fetchProject, updateProject} from "../../store/reducers/ProjectActions";

const icons = [
    MicIcon,
    MicIconFrame1,
    MicIconFrame2,
    MicIconFrame3,
]

const ProjectPage = () => {
    const {projects} = useAppSelector(state => state.projectReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!projects.length) {
            dispatch(fetchProject(id!));
        }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
        }
    }, []);
    const {id} = useParams<string>();
    const mediaRecorderRef = useRef<MediaRecorder>();
    const [chunks, setChunks] = useState<BlobPart[]>([]);
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState(false);
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timer>();
    const [isEditingTitle, setEditingTitle] = useState(false);
    const [isEditingCategory, setEditingCategory] = useState(false);
    const project = projects.find(project => project.id === id);
    const [title, setTitle] = useState<string>(project?.title!);
    const [category, setCategory] = useState<string>(project?.category!);
    const [widthTitle, setWidthTitle] = useState(0);
    const [widthCategory, setWidthCategory] = useState(0);
    const titleRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}
    const timeCreated = new Date(project?.timeCreated!);
    const timeModified = new Date(project?.timeModified!);

    useEffect(() => {
        setTitle(project?.title!);
        setCategory(project?.category!);
    }, [project]);
    const handleRecord = () => {
        setRecording(recording => !recording);
        if (timerRef.current == undefined) {
            const timerId = setInterval(() => {
                setIndex(index => index + 1);
            }, 500);
            timerRef.current = timerId;
        } else {
            clearInterval(timerRef.current);
            setIndex(0);
            timerRef.current = undefined;
        }

        if (mediaRecorderRef.current == null) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    const newRecorder =  new MediaRecorder(stream);
                    newRecorder.start();
                    newRecorder.onstop = stopRecording;
                    newRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                        setChunks(chunks => [...chunks, e.data]);
                    };
                    mediaRecorderRef.current = newRecorder;
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = undefined;
            setRecording(false);
            setStart(false);
        }
    }

    const stopRecording = () => {
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus;" });
        dispatch(addAudio({blob, lessonId: id+''}));
        setChunks([]);
    }

    useEffect(() => {
        setWidthTitle(titleRef.current?.offsetWidth!);
    },[title]);

    useEffect(() => {
        setWidthCategory(categoryRef.current?.offsetWidth!);
    },[category]);

    const inputHandlerTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(e.target.value);
    }

    const inputHandlerCategory = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setCategory(e.target.value);
    }

    const editInfo = () => {
        setEditingTitle(false);
        setEditingCategory(false);
        dispatch(updateProject({id: project!.id, title, category: category}))
    }
    return (
        <div>
            <div>
                {
                    project?.posterUrl !== null ?
                    <img src={project?.posterUrl} className={classes.poster}/>
                        :
                        <></>
                }
            </div>
            <div className={classes.container}>
                <div className={classes.info}>
                    <div className={classes.block}>
                        Category:&nbsp;
                        {
                            !isEditingCategory ? (
                                <>
                                    <div ref={categoryRef} className={classes.italicBold}>
                                        {category}
                                    </div>
                                    <img src={EditIcon} className={classes.editIcon} onClick={() => setEditingCategory(true)}/>
                                </>
                            ) : (
                                <>
                                    <div ref={categoryRef} style={{position: "absolute", opacity: "0", left: "-99999px"}}>{category}</div>
                                    <input defaultValue={category} className={classes.categoryEdit} style={{width: widthCategory}}
                                           onChange={inputHandlerCategory} autoFocus/>
                                    <img src={ApplyIcon} className={classes.editIcon} onClick={editInfo}/>
                                </>
                            )
                        }
                    </div>
                    <div className={classes.block}>
                        Created: {timeCreated.toLocaleString("ru-RU", options)}
                    </div>
                    <div className={classes.block}>
                        Last modified: {timeModified.toLocaleString("ru-RU", options)}
                    </div>
                </div>
                <div className={classes.main}>
                    <div className={classes.title}>
                        {
                            !isEditingTitle ? (
                                <>
                                    <div ref={titleRef}>
                                        {title}
                                    </div>
                                    <img src={EditIcon} className={classes.editIcon} onClick={() => setEditingTitle(true)}/>
                                </>
                            ) : (
                                <>
                                    <div ref={titleRef} style={{position: "absolute", opacity: "0", left: "-99999px"}}>{title}</div>
                                    <input defaultValue={title} className={classes.titleEdit} style={{width: widthTitle}}
                                           onChange={inputHandlerTitle} autoFocus/>
                                    <img src={ApplyIcon} className={classes.editIcon} onClick={editInfo}/>
                                </>
                            )
                        }
                    </div>
                    {
                        project?.audios?.map(audio => <Audio key={audio.id} audioUrl={audio.url} audioId={audio.id}/>)
                    }
                    <div className={classes.new}>
                        {!start ? <Button text="Add new record" onClick={() => setStart(true)}/> :
                            <>
                                Click mic to {!recording ? 'start' : 'stop'} recording
                                <div className={classes.iconHolder}>
                                    <img src={icons[index % icons.length]}
                                         className={classes.icon}
                                         onClick={handleRecord}/>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
