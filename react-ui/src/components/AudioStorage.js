import React, {useContext} from 'react';
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Row} from "antd";
import {Context} from "../index";
import Lesson from "./ui/Lesson";

const AudioStorage = () => {
    const {store} = useContext(Context);
    return (
        <>
            {
                store.lessons.map((lesson) => <Lesson key={lesson.id} lesson={lesson}/>)
            }
            <Row justify="center" align='middle'>
                <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size='large' style={{margin: "20px", width: "30%"}}>
                    Add tracking
                </Button>
            </Row>
        </>
    );
};

export default AudioStorage;
