import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from "./LessonPage.module.css";
import Audio from "../ui/Audio/Audio";
import MicIcon from "./mic.svg"
import MicIconFrame1 from "./mic1.svg"
import MicIconFrame2 from "./mic2.svg"
import MicIconFrame3 from "./mic3.svg"
import Button from "../ui/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hoc/redux";

const icons = [
    MicIcon,
    MicIconFrame1,
    MicIconFrame2,
    MicIconFrame3,
]

const LessonPage = () => {
    const {lessons} = useAppSelector(state => state.lessonReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
        }
    }, []);

    const {id} = useParams();

    // const [{mediaRecorder}, setMediaRecorder] = useState<Recorder>({} as Recorder);
    const mediaRecorderRef = useRef<MediaRecorder>();
    const [chunks, setChunks] = useState<BlobPart[]>([]);
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState(false);
    const [index, setIndex] = useState(0);
    // const [{timer}, setTimer] = useState({});
    const timerRef = useRef<NodeJS.Timer>();

    const handleRecord = () => {
        setRecording(recording => !recording);
        if (timerRef.current == undefined) {
            const timerId = setInterval(() => {
                setIndex(index => index + 1);
            }, 500);
            timerRef.current = timerId;
            // setTimer(() => ({timer: newTimer}));
        } else {
            // setTimer(prevState => {
            //     let {timer} = prevState;
            //     clearInterval(timer);
            //     setIndex(0);
            //     return {timer: null};
            // })
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
                        // chunks.push(e.data);
                        setChunks(chunks => [...chunks, e.data]);
                    };
                    // setMediaRecorder(() => ({mediaRecorder: newRecorder}));
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
        // store.sendAudio(blob, id);
        setChunks([]);
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>{lessons?.find(lesson => lesson.id === id)?.title}</div>
            {
                lessons?.find(lesson => lesson.id === id)?.audios?.map(audio => <Audio key={audio.id} audioUrl={audio.url}/>)
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
