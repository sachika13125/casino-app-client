import React, { useState, useEffect } from 'react';

export default function Dice() {

//   const [remainingGuesses, setRemainingGuesses] = useState(10);
//   const [score, setScore] = useState(0);
//   const [accumulatedTickets, setAccumulatedTickets] = useState(5);
//   const [previousRoll, setPreviousRoll] = useState("-");
//   const [guess, setGuess] = useState('');
//   const [gameOver, setGameOver] = useState(false);
//   const [rewardsData, setRewardsData] = useState([]);

//   useEffect(() => {
//     fetchRewardsData();
//     checkDiceTickets();
//     updateCurrency();
//   }, []);

//   const fetchRewardsData = () => {
//     fetch('http://localhost:3000/getDiceRewards')
//       .then(response => response.json())
//       .then(data => setRewardsData(data))
//       .catch(error => console.error('Error fetching rewards data:', error));
//   };

//   const checkDiceTickets = () => {
//     fetch('http://localhost:3000/getUsersData')
//       .then(response => response.json())
//       .then(data => {
//         const user = data[newUsername];

//         if (user && user.tickets === 0) {
//           // Disable buttons and add animations
//           // ...
//         } else {
//           // Enable buttons and remove animations
//           // ...
//         }
//       })
//       .catch(error => console.error('Error checking dice tickets:', error));
//   };

//   const updateScore = () => {
//     setScore(score + 1);
//     setAccumulatedTickets(accumulatedTickets + score);

//     fetch('http://localhost:3000/updateUserTickets', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ tickets: accumulatedTickets })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         updateCurrency();
//       })
//       .catch(error => console.error('Error updating user tickets:', error));
//   };
    const [previousRoll, setPreviousRoll] = useState(null);

    const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setPreviousRoll(roll);
    };

    return(
        <div>
            <h1 className='text-white'>Dice Prediction Game</h1>
            <div id="rewards-container" className="bg-gray-100 p-4 rounded-lg mb-4"></div>
            <div id="game" className="bg-white p-4 rounded-lg shadow-lg">
                <p>Remaining Guesses: <span id="remaining-guesses">10</span></p>
                <p>Score: <span id="score">0</span></p>
                <p>Previous Roll: {previousRoll !== null ? <img src={`/images/dice${previousRoll}.png`} alt={`Dice Roll ${previousRoll}`} className='w-1/4 text-center' /> : "-"}</p>                
                <label for="guess" className="block text-gray-700 text-sm font-bold mb-2">Enter your guess (1-6):</label>
                <input type="number" id="guess" min="1" max="6" className="block w-full p-2 border rounded-md" />
                <div className='flex justify-around'>
                <button id="roll-button" onClick={rollDice} className="flex justify-center items-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Roll</button>                    
                <button id="reset-button" className="flex justify-center items-center shadow font-bold py-2 px-4 rounded">Reset</button>
                </div>
              </div>
        </div>
    )
}