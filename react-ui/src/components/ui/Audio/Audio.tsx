import React, {useEffect, useRef, useState} from 'react';
import AudioWave from "../AudioWave/AudioWave";
import PlayIcon from './play.svg';
import PauseIcon from './pause.svg'
import TrashIcon from './trash.svg'
import classes from "./Audio.module.css";
import {useAppDispatch} from "../../../hoc/redux";
import {deleteAudio} from "../../../store/reducers/ProjectActions";

interface AudioProps {
    audioUrl: string;
    audioId: string;
}

const Audio = ({audioUrl, audioId}: AudioProps) => {
    useEffect(() => {
        setLoading(true);
        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => refAudioContext.current.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                refAudioBuffer.current = audioBuffer;
                setLoading(false);
                durationRef.current = new Date(audioBuffer.duration * 1000);
                setMinutes(durationRef.current?.getMinutes());
                setSeconds(durationRef.current?.getSeconds());
            });
    },[]);

    const refAudioContext = useRef<AudioContext>(new (window.AudioContext || window.webkitAudioContext)());
    const refAudioBuffer = useRef<AudioBuffer>();
    const refSource = useRef<AudioBufferSourceNode>();
    const [loading, setLoading] = useState(true);
    const durationRef = useRef<Date>();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [play, setPlay] = useState(false);
    const [pausedAt, setPausedAt] = useState(0);
    const [startedAt, setStartedAt] = useState(0);
    const timerRef = useRef<NodeJS.Timer>();
    const dispatch = useAppDispatch();

    const playTrack = () => {
        const audioContext = refAudioContext.current;
        if (!play) {
            const newSource = audioContext.createBufferSource();
            newSource.connect(audioContext.destination);
            if (refAudioBuffer.current) {
                newSource.buffer = refAudioBuffer.current;
            }
            newSource.onended = () => {
                setPlay(false);
                clearInterval(timerRef.current);
            };
            setSeconds(pausedAt);
            timerRef.current = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            newSource.start(0, pausedAt);
            refSource.current = newSource;
            setStartedAt(startedAt => audioContext.currentTime - pausedAt);
            setPausedAt(0);
        } else {
            setPausedAt(audioContext.currentTime - startedAt);
            setStartedAt(0);
            clearInterval(timerRef.current);
            refSource.current?.disconnect();
            refSource.current?.stop();
            refSource.current = undefined;
        }
        setPlay(!play);
    }

    const handleDeleteAudio = () => {
        dispatch(deleteAudio(audioId));
    }

    return (
        <div className={classes.audio}>
            {!play ? <img className={classes.icon} src={PlayIcon} onClick={playTrack}/> : <img className={classes.icon} src={PauseIcon} onClick={playTrack}/>}

            {loading ? (
                <div className={classes.preloader}></div>
            ) : (
                    <>
                        <AudioWave audioBuffer={refAudioBuffer.current!}/>
                        <span className={classes.duration}>{minutes}:{(Math.round(seconds) >= 10) ? Math.round(seconds) : '0' + Math.round(seconds)}</span>
                    </>
            )}
            <img src={TrashIcon} className={classes.trashIcon} onClick={handleDeleteAudio}/>
        </div>
    );
};

export default Audio;
