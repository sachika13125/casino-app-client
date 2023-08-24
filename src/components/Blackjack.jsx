import React, { useState, useEffect } from 'react';
import './Blackjack.css';
import UserProfile from './UserProfile';
import {
    buildDeck,
    shuffleDeck,
    startGame,
    hit,
    stay,
    reduceAce,
    restartGame,
    getValue,
    checkAce,
    checkGameResult
} from './BlackjackLogic';

export default function Blackjack() {
    const [stayClicked, setStayClicked] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        buildDeck();
        shuffleDeck();
        startGame();
        restartGame();
    }, []);

    function handleStayClick() {
        stay();
        setStayClicked(true);
    }

    return (
        <div className='modal'>
            <div id="blackjack-game" className="blackjack-game">
                <h2>Dealer: <span id="dealer-sum"></span></h2>
                <div id="dealer-cards">
                    <img id="hidden" src="./images/cards/BACK.png"/>
                </div>
                <h2>You: <span id="your-sum"></span></h2>
                <div id="your-cards"></div>
                <div className='blackjack-buttons'>
                    <button id="hit" onClick={hit}>Hit</button>
                    <button id="restart" onClick={restartGame}>&#8634;</button>
                    <button id="stay" onClick={handleStayClick}>Stay</button>
                </div>
                <UserProfile shouldUpdateProfile={stayClicked} />
                <p id="results"></p>
            </div>
        </div>
    );
}
