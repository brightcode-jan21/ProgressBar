import React from 'react';

import './Styles.scss';

const ProgressBar = (props) => {

    const [currentQuestion, setCurrentQuestion] = React.useState(1);

    const filledStyle = {
        width: `${props.totalCompleted / props.totalQuestions * 100}%`
    }

    return (
        <div className='rectangle-bg'>
            <div className="filledStyle" style={filledStyle}>
            </div>
        </div>
    );
};

export default ProgressBar;