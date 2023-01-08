import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import classes from "./LessonPage.module.css";
import Audio from "../ui/Audio/Audio";
import MicIcon from "./mic.svg"
import MicIconFrame1 from "./mic1.svg"
import MicIconFrame2 from "./mic2.svg"
import MicIconFrame3 from "./mic3.svg"
import Button from "../ui/Button/Button";
import {observer} from "mobx-react-lite";

const icons = [
    MicIcon,
    MicIconFrame1,
    MicIconFrame2,
    MicIconFrame3,
]

const LessonPage = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
        }
    }, []);

    const {id, intId = +id} = useParams();

    const [{mediaRecorder}, setMediaRecorder] = useState({});
    const [chunks, setChunks] = useState([]);
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState(false);
    const [index, setIndex] = useState(0);
    const [{timer}, setTimer] = useState({});

    const handleRecord = () => {
        setRecording(recording => !recording);
        if (timer == null) {
            let newTimer = setInterval(() => {
                setIndex(index => index + 1);
            }, 500);
            setTimer(() => ({timer: newTimer}));
        } else {
            setTimer(prevState => {
                let {timer} = prevState;
                clearInterval(timer);
                setIndex(0);
                return {timer: null};
            })
        }

        if (mediaRecorder == null) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    let newRecorder =  new MediaRecorder(stream);
                    newRecorder.start();
                    newRecorder.onstop = stopRecording;
                    newRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                        setChunks(chunks => [...chunks, e.data]);
                    };
                    setMediaRecorder(() => ({mediaRecorder: newRecorder}));
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            mediaRecorder.stop();
            setMediaRecorder({});
            setRecording(false);
            setStart(false);
        }
    }

    const stopRecording = (e) => {
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus;" });
        store.sendAudio(blob, intId);
        setChunks([]);
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>{store.lessons.find(lesson => lesson.id === Number(id)).title}</div>
            {
                store.lessons.find(lesson => lesson.id === intId).audio.map(audio => <Audio key={audio.id} audioUrl={audio.url}/>)
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

export default observer(LessonPage);
