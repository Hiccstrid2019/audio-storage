import React, {useEffect, useState} from 'react';
import AudioWave from "../AudioWave/AudioWave";
import PlayIcon from './play.svg';
import PauseIcon from './pause.svg'
import classes from "./Audio.module.css";

interface AudioProps {
    audioUrl: string
}

interface AudioSource {
    source: AudioBufferSourceNode
}

interface ArrayAudioBuffer {
    audioBuffer: AudioBuffer
}

interface Duration {
    duration: Date
}

const Audio = ({audioUrl}: AudioProps) => {
    useEffect(() => {
        setLoading(true);
        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                setAudioBuffer(state => ({...state, audioBuffer}));
                setLoading(false);
                setDuration(duration => ({...duration, duration: new Date(audioBuffer.duration * 1000)}));
            });
    },[]);

    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // const source = audioContext.createBufferSource();
    const [{audioContext}, setAudioContext] = useState({audioContext: new (window.AudioContext || window.webkitAudioContext)()})
    const [{audioBuffer}, setAudioBuffer] = useState<ArrayAudioBuffer>({} as ArrayAudioBuffer);
    const [{source}, setSource] = useState<AudioSource>({} as AudioSource);
    const [loading, setLoading] = useState(true);
    const [{duration}, setDuration] = useState<Duration>({} as Duration);
    const [play, setPlay] = useState(false);
    const [pausedAt, setPausedAt] = useState(0);
    const [startedAt, setStartedAt] = useState(0);

    const playTrack = () => {
        if (!play) {
            const newSource = audioContext.createBufferSource();
            newSource.connect(audioContext.destination);
            newSource.buffer = audioBuffer;
            newSource.onended = () => {
                setPlay(false);
            };
            console.log(pausedAt)
            newSource.start(0, pausedAt);
            setSource(source => ({...source, source: newSource}));
            setStartedAt(startedAt => audioContext.currentTime - pausedAt);
            setPausedAt(0);
        } else {
            setPausedAt(audioContext.currentTime - startedAt);
            setStartedAt(0);
            source!.disconnect();
            source!.stop();
            setSource({} as AudioSource);
        }
        setPlay(!play);
    }

    return (
        <div className={classes.audio}>
            {!play ? <img className={classes.icon} src={PlayIcon} onClick={playTrack}/> : <img className={classes.icon} src={PauseIcon} onClick={playTrack}/>}

            {loading ? ('Loading'
            ) : (
                    <>
                        <AudioWave audioBuffer={audioBuffer}/>
                        <span className={classes.duration}>{duration!.getMinutes() + ':' + duration!.getSeconds()}</span>
                    </>
            )}
        </div>
    );
};

export default Audio;
