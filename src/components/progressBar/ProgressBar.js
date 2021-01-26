import React from 'react';

import './Styles.scss';

const ProgressBar = (props) => {

    const [currentQuestion, setCurrentQuestion] = React.useState(1);

    const filledStyle = {
        width: `${props.totalCompleted / props.totalQuestions * 100}%`
    }

    return (
        <div className='rectangle-bg'>

            {console.log("Completed: " + props.totalCompleted)}
            {console.log("Total: " + props.isComplete)}
            {/*{console.log("Here: " + parseFloat(completed / totalQuestions * 100))}*/}
            <div className="filledStyle" style={filledStyle}>
            </div>
        </div>
    );
};

export default ProgressBar;