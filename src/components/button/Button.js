import React from 'react';

import './Styles.scss';

const Button = (props) => {

  return (
    <div className={"submitButton " + (props.inactive ? "submitButton--inactive" : "")} onClick={props.handleSubmit} >
      {props.label}
    </div>
  )
}

export default Button;