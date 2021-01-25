import React from "react";
import "./Styles.scss";

export const ProgressBar = ({ currentQuestionId, totalQuestions }) => {
	const dynamicWidth = `${(currentQuestionId+1) * 25 }%`;
	return (
		<div className='progressBar'>
			<div className='progressBar__value' style={{ width: dynamicWidth }}></div>
		</div>
	);
};
