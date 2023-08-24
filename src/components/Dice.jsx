import React, { useState } from 'react';

export default function Dice() {

  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [previousRoll, setPreviousRoll] = useState(null);
  const [score, setScore] = useState(0);

  const updateRemainingGuesses = () => setRemainingGuesses(remainingGuesses - 1);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPreviousRoll(roll);
    return roll;
  };

  const handleRollClick = () => {
    if (!gameOver && remainingGuesses > 0) {
      const roll = rollDice();
      console.log(guess)
      if (parseInt(guess) === roll) {
        setScore(score + 20);
      }
      updateRemainingGuesses();
      if (remainingGuesses === 1) {
        setGameOver(true);
      }
    }
  };

  const handleResetClick = () => {
    setRemainingGuesses(10);
    setScore(0);
    setPreviousRoll(null);
    setGuess('');
    setGameOver(false);
  };

//   const updateScore = () => {
//     fetch('/getDiceRewards')
//       .then(response => response.json())
//       .then(data => {
//         const scoreFromServer = data.length > 0 ? data[0].reward : 0;
//         setScores(scores + scoreFromServer);
//       })
//       .catch(error => console.error('Error fetching score:', error));
//   };


    return(
        <div>
            <h1 className='text-white'>Dice Prediction Game</h1>
            <div id="rewards-container" className="bg-gray-100 p-4 rounded-lg mb-4 w-1/2 mx-auto"></div>
            <div id="game" className="p-4 rounded-lg">
                <p className='text-white'>Remaining Guesses: <span id="remaining-guesses">{remainingGuesses}</span></p>
                <p className='text-white'>Score: <span id="score" className='text-lg font-bold'>{score}</span></p>
                <p className='text-white flex justify-center items-center'>Previous Roll: {previousRoll !== null ? <img src={`/images/dice${previousRoll}.png`} alt={`Dice Roll ${previousRoll}`} className='w-1/4 text-center' /> : "-"}</p>                
                <label htmlFor="guess" className="block text-white text-sm font-bold mb-2">Enter your guess (1-6):</label>
                <input type="number" id="guess" min="1" max="6" value={guess}
                        onChange={event => setGuess(event.target.value)} 
                        className="block w-full p-2 border rounded-md w-1/6 mx-auto mb-4" />
                <div className='flex justify-around'>
                <button id="roll-button" 
                        onClick={handleRollClick} 
                        className="flex justify-center items-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Roll</button>                    
                <button id="reset-button" 
                        onClick={handleResetClick}
                        className="flex justify-center items-center shadow font-bold py-2 px-4 rounded">Reset</button>
                </div>
              </div>
        </div>
    )
}