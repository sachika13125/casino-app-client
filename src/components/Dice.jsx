import React, { useState, useEffect } from 'react';
import Button from './Button';

export default function Dice() {

  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [previousRoll, setPreviousRoll] = useState(null);
  const [score, setScore] = useState(0);
  const [rewardsData, setRewardsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getDiceRewards')
      .then(response => response.json())
      .then(data => {
        setRewardsData(data);
      })
      .catch(error => console.error("Error fetching rewards:", error));
  }, []);

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
        const reward = rewardsData.find(reward => reward.number === roll);
        if (reward) {
          setScore(score + reward.reward);
          fetch('http://localhost:3000/updateUserTickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tickets: score + reward.reward }),
        })
          .then(response => response.text())
          .then(data => {
            console.log('Tickets actualizados:', data);
          })
          .catch(error => {
            console.error('Error al actualizar los tickets:', error);
          });
        }
        // setScore(score + 20);
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


    return(
        <div>
            <h1 className='text-white'>Dice Prediction Game</h1>
            <div id="rewards-container" className="bg-gray-100 p-4 rounded-lg mb-4 w-1/2 mx-auto">
                <p className='text-black'>Score: <span id="score" className='text-lg font-bold'>{score}</span></p>
            </div>
            <div id="game" className="p-4 rounded-lg">
                <p className='text-white'>Remaining Guesses: <span id="remaining-guesses">{remainingGuesses}</span></p>
                <p className='text-white flex justify-center items-center'>Previous Roll: {previousRoll !== null ? <img src={`/images/dice${previousRoll}.png`} alt={`Dice Roll ${previousRoll}`} className='w-1/4 text-center' /> : "-"}</p>                
                <label htmlFor="guess" className="block text-white text-sm font-bold mb-2">Enter your guess (1-6):</label>
                <input type="number" id="guess" min="1" max="6" value={guess}
                        onChange={event => setGuess(event.target.value)} 
                        className="block w-[300px] p-2 border rounded-md w-1/6 mx-auto mb-4" />
                <div className='flex justify-around'>
                <Button label="Roll" 
                        onClick={handleRollClick} 
                        className="bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white" />                   
                <Button label="Reset" 
                        onClick={handleResetClick}
                        className="" />
                </div>
              </div>
        </div>
    )
}