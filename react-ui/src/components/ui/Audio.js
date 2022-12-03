import React from 'react';
import {Button} from "antd";
import {PlayCircleFilled, PlayCircleOutlined} from "@ant-design/icons";

const Audio = ({audio}) => {
    return (
        <div style={{margin: "15px"}}>
            <Button type='primary' shape='circle' size='middle'>
                <PlayCircleOutlined style={{fontSize: '150%'}}/>
            </Button>
        </div>
    );
};

export default Audio;
