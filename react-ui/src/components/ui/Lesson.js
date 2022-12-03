import React from 'react';
import {Card, List, Row} from "antd";
import {Link} from "react-router-dom";
import {toJS} from "mobx";
import Audio from "./Audio";

const Lesson = ({lesson}) => {
    return (
       <Row justify='center' align='middle' style={{padding: "20px"}}>
           <Card title={lesson.title} extra={<Link to={`${lesson.id}`}>More</Link>} style={{width: "40%"}}>
               {
                   lesson.audio.map((audio) => (
                       <Audio audio={audio}/>
                   ))
               }
           </Card>
       </Row>
    );
};

export default Lesson;