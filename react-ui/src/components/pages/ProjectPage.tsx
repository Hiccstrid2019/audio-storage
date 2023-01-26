import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
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
import {addAudio} from "../../store/reducers/ProjectActions";

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
    const [isEditing, setEditing] = useState(false);

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
    // const title = projects?.find(project => project.id === id)?.title;
    const [title, setTitle] = useState(projects?.find(project => project.id === id)?.title);
    const [width, setWidth] = useState(0);
    const titleRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log(titleRef.current?.offsetWidth!)
        setWidth(titleRef.current?.offsetWidth!);
    },[title]);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(e.target.value);
    }

    const editedTitle = () => {
        setEditing(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                {
                    !isEditing ? (
                        <>
                            <div ref={titleRef}>
                                {title}
                            </div>
                            <img src={EditIcon} className={classes.editIcon} onClick={() => setEditing(true)}/>
                        </>
                    ) : (
                        <>
                            <div ref={titleRef} style={{position: "absolute", opacity: "0"}}>{title}</div>
                            <input defaultValue={title} className={classes.titleEdit} style={{width}}
                            onChange={inputHandler} autoFocus/>
                            <img src={ApplyIcon} className={classes.editIcon} onClick={editedTitle}/>
                        </>
                    )
                }
            </div>
            {
                projects.find(project => project.id === id)?.audios?.map(audio => <Audio key={audio.id} audioUrl={audio.url}/>)
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
    );
};

export default ProjectPage;
