import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import classes from "./LessonPage.module.css";
import Audio from "../ui/Audio/Audio";
import MicIcon from "./mic.svg"

const LessonPage = () => {
    const {store} = useContext(Context);
    const mediaRecorder = useRef(null);
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
        }
    }, []);

    const {id} = useParams();

    const [chunks, setChunks] = useState([]);
    const [record, setRecord] = useState(false);
    const [audio, setAudio] = useState(null);

    const handleRecord = () => {
        if (!mediaRecorder.current) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    mediaRecorder.current = new MediaRecorder(stream);
                    mediaRecorder.current.start();
                    setRecord(true);
                    mediaRecorder.current.onstop = stopRecording;
                    mediaRecorder.current.ondataavailable = (e) => {
                        chunks.push(e.data);
                        setChunks(chunks => [...chunks, e.data]);
                    };
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            mediaRecorder.current.stop();
            mediaRecorder.current = null;
            setRecord(false);
        }
    }

    const stopRecording = (e) => {
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus;" });
        setAudio(window.URL.createObjectURL(blob));
        store.sendAudio(blob);
        setChunks([]);
    }


    return (
        <div className={classes.container}>
            <div className={classes.title}>{store.lessons.find(lesson => lesson.id === Number(id)).title}</div>
            {
                store.lessons.find(lesson => lesson.id === Number(id)).audio.map(audio => <Audio key={audio.id} audioUrl={audio.url}/>)
            }
            <img src={MicIcon}/>
        </div>
    );
};

export default LessonPage;
