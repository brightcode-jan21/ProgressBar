import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';

import './Styles.scss';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isAnimateEnd, setIsAnimateEnd] = React.useState(false);
  
  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  
  React.useEffect(()=>{
    getQuizData();
  },[]);

  React.useEffect(()=>{
    console.log(gameStatus);
  },[gameStatus]);


  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions-1){
      console.log(currentQuestionId)
      setCurrentQuestionId(currentQuestionId+1);
    } else if (!isComplete) {
      setIsComplete(true);
    } else {
      setCurrentQuestionId(0);
      setIsComplete(false);
      setGameStatus('new');
    }
	setIsAnimateEnd(false);
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }

  const progress = isComplete ? 100 : ((currentQuestionId + 1) / (quizData.totalQuestions + 1)) * 100 || 0;
  const prevProgress = progress - (1 / (quizData.totalQuestions + 1)) * 100 || 0;
  return (
    <div className="learningModule">
      <div className="learningModule__progressBar">
          <div className="learningModule__progressBar--background" />
          <div className="learningModule__progressBar--ends">
            <span />
            <span />
          </div>
          <div
            className={`learningModule__progressBar--progress ${
               isAnimateEnd ? "" : " animate"
            }`}
            style={{
               "--progress": `${progress}%`,
               "--prevProgress": `${prevProgress}%`,
               "--displayProgress": `${
                  isAnimateEnd ? progress : prevProgress
               }%`,
            }}
            onAnimationEnd={() => {
               setIsAnimateEnd(true);
            }}
          />
      </div>
      { currentQuestion.title && !isComplete &&
        <>
          <div className="learningModule__header">
            <div className="learningModule__title">
              { currentQuestion.title }
            </div>
            <div className="learningModule__subHeader">
              { currentQuestion.additionalInfo }
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">
              { possibleAnswers }
            </div>
            <div className="learningModule__submitButtonContainer">
              <Button label="Submit" inactive handleSubmit={ handleSubmit } />
            </div>
          </div>
        </>
      }
      {isComplete &&
        <Intro message="Congratulations. You've completed this level!" buttonLabel="Play again"  buttonClick={handleSubmit} />
      }
    </div>
  )
}

export default LearningModule;
