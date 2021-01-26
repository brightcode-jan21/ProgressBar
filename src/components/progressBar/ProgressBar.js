import React from 'react';

import './Styles.scss';

const ProgressBar = ({progress, isComplete})=>{ 

  let barStyle = isComplete?  {width: `100%`,  borderRadius: "8px"} : {width: `${progress}%`};

  return(
    <>  
      {progress >0 && 
          <div className="progressBarContainer">
            <div className="progressBarContainer__bar">
              <div className="progressBarContainer__bar--top" style={barStyle}></div>
            </div>
            <div className="progressBarContainer__circle"></div>
          </div>
      } 
    </>
    );

}

export default ProgressBar;