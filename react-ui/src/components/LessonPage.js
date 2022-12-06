import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Row} from "antd";

const LessonPage = ({store}) => {

    const mediaRecorder = useRef(null);
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support recording!');
        }
    }, []);

    const {id} = useParams();

    let chunks = [];
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
        chunks = [];
    }


    return (
        <Row justify='center' align='middle'>
            <Button type='default' size='middle' onClick={handleRecord}>
                {
                    !record ? <img src='/mic-fill.svg' alt='mic'/> : <img src='/mic-mute.svg' alt='mic'/>
                }
            </Button>
            <audio src={audio} controls/>
        </Row>
    );
};

export default LessonPage;
