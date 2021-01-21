import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Intro from './components/intro/Intro';
import LearningModule from './components/learningModule/LearningModule';

import './styles/App.scss';

function App() {
  const [gameStatus, setGameStatus] = React.useState('new');

  return (
    <div>
      <Navbar />
      <div id="mainWrapper">
        { gameStatus == 'new' && 
          <Intro message="Welcome to CodeTyke" buttonLabel="Start" buttonClick={() => setGameStatus('inProgress')} />
        }
        
        { gameStatus =="inProgress" &&
          <LearningModule gameStatus={gameStatus} setGameStatus={setGameStatus}/>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
