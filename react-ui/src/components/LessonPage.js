import React from 'react';
import {useParams} from "react-router-dom";

const LessonPage = () => {
    const {id} = useParams();
    return (
        <div>
            {id}
        </div>
    );
};

export default LessonPage;
