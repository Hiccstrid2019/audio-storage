import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import classes from "./LessonPage.module.css";
import Audio from "../ui/Audio/Audio";
import MicIcon from "./mic.svg"
import MicIconFrame1 from "./mic1.svg"
import MicIconFrame2 from "./mic2.svg"
import MicIconFrame3 from "./mic3.svg"
import Button from "../ui/Button/Button";

const icons = [
    MicIcon,
    MicIconFrame1,
    MicIconFrame2,
    MicIconFrame3,
]

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
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState(false);
    const [audio, setAudio] = useState(null);
    const [index, setIndex] = useState(0);
    const [{timer}, setTimer] = useState({timer: null});

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

        // setInterval(() => {
        //     console.log("frame");
        //     console.log("index: "+ index)
        //     // setIcon(icons[index % 2]);
        //     setIndex(index => index + 1);
        // }, 1000)
        // if (!mediaRecorder.current) {
        //     navigator.mediaDevices.getUserMedia({audio: true})
        //         .then((stream) => {
        //             mediaRecorder.current = new MediaRecorder(stream);
        //             mediaRecorder.current.start();
        //             mediaRecorder.current.onstop = stopRecording;
        //             mediaRecorder.current.ondataavailable = (e) => {
        //                 chunks.push(e.data);
        //                 setChunks(chunks => [...chunks, e.data]);
        //             };
        //         })
        //         .catch((err) => {
        //             console.error(err);
        //         })
        // } else {
        //     mediaRecorder.current.stop();
        //     mediaRecorder.current = null;
        //     setRecording(false);
        // }
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
                // store.lessons.find(lesson => lesson.id === Number(id)).audio.map(audio => <Audio key={audio.id} audioUrl={audio.url}/>)
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

export default LessonPage;
