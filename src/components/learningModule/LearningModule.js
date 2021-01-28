import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';
import ProgressBar from '../progressBar/ProgressBar';

import './Styles.scss';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);

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
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }

  // update progress status for ProgressBar Component 
  let progress = 0; 
  if(quizData.totalQuestions){
    progress = (Math.round((currentQuestionId+1)*100/(quizData.totalQuestions+1)));
  }if(isComplete){
    progress=100;
  }

  return (
    <div className="learningModule">
    <ProgressBar progress={progress} />
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
