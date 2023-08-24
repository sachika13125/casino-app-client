import React, { useState, useEffect } from 'react';

export default function Dice() {

  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [score, setScore] = useState(0);
//   const [accumulatedTickets, setAccumulatedTickets] = useState(5);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
//   const [rewardsData, setRewardsData] = useState([]);
  const [previousRoll, setPreviousRoll] = useState(null);

  const updateScore = () => setScore(score + 1);
  const updateRemainingGuesses = () => setRemainingGuesses(remainingGuesses - 1);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPreviousRoll(roll);
  };

  const handleRollClick = () => {
    if (!gameOver && remainingGuesses > 0) {
      const roll = rollDice();
      if (parseInt(guess) === roll) {
        updateScore();
      }
      updateRemainingGuesses(remainingGuesses - 1);
      if (remainingGuesses === 1) {
        setGameOver(true);
      }
    }
  };

  const handleResetClick = () => {
    setRemainingGuesses(3);
    setScore(0);
    setPreviousRoll("-");
    setGuess('');
    setGameOver(false);
  };




    return(
        <div>
            <h1 className='text-white'>Dice Prediction Game</h1>
            <div id="rewards-container" className="bg-gray-100 p-4 rounded-lg mb-4"></div>
            <div id="game" className="p-4 rounded-lg shadow-lg">
                <p className='text-white'>Remaining Guesses: <span id="remaining-guesses">{remainingGuesses}</span></p>
                <p className='text-white'>Score: <span id="score">0</span></p>
                <p className='text-white'>Previous Roll: {previousRoll !== null ? <img src={`/images/dice${previousRoll}.png`} alt={`Dice Roll ${previousRoll}`} className='w-1/4 text-center' /> : "-"}</p>                
                <label htmlFor="guess" className="block text-white text-sm font-bold mb-2">Enter your guess (1-6):</label>
                <input type="number" id="guess" min="1" max="6" className="block w-full p-2 border rounded-md" />
                <div className='flex justify-around'>
                <button id="roll-button" 
                        onClick={handleRollClick} 
                        className="flex justify-center items-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Roll</button>                    
                <button id="reset-button" className="flex justify-center items-center shadow font-bold py-2 px-4 rounded">Reset</button>
                </div>
              </div>
        </div>
    )
}