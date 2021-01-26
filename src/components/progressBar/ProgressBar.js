import React from 'react';

import './Styles.scss';

const ProgressBar = (props) => {

    const filledStyle = {
        width: `${props.totalCompleted / props.totalQuestions * 100}%`,
        transition: 'width 1s ease-in-out'
    }

    const chooseStyle = () => {
        if (!props.isComplete) return filledStyle;
        else return {width: '100%', transition: 'width 1s ease-in-out'}
    }

    React.useEffect(() => {
            chooseStyle()
        }
        , [props.totalCompleted]
    )

    return (
        <div className='rectangle-bg'>
            <div className="filledStyle" style={chooseStyle()}>
            </div>
        </div>
    );
};

export default ProgressBar;