let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true; //while yourSum <= 21

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    if (deck.length < 4) {
        buildDeck();
        shuffleDeck();
    }
    
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
        checkGameResult(false);
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./images/cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        checkGameResult(false);
    }
    else if (dealerSum > 21) {
        message = "You win!";
        checkGameResult(true);
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        checkGameResult(true);
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        checkGameResult(false);
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

//POST METHOD TO WRITE USER TICKETS TO JSON FILE
function checkGameResult(playerWin) {
    const resultMessage = playerWin ? "win" : "lose";
  
    //writeGameResultToCSV(resultMessage);
  
    fetch('http://localhost:3000/updateTickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result: resultMessage, username: 'player' })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error requesting fetch: ", error);
      });
  }

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function restartGame() {
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    hidden = "";
    canHit = true;

    var blackjackGameContainer = document.getElementById("blackjack-game");
    blackjackGameContainer.innerHTML = "";

    var initialContent = `
        <h2>Dealer: <span id="dealer-sum"></span></h2>
        <div id="dealer-cards">
            <img id="hidden" src="./images/cards/BACK.png">
        </div>
        <h2>Player: <span id="your-sum"></span></h2>
        <div id="your-cards"></div>
        <h2 id="results"></h2>
        <div class="blackjack-buttons">
            <button id="hit">Hit</button>
            <button id="restart">&#8634;</button>
            <button id="stay">Stand</button>
        </div>
    `;
    blackjackGameContainer.innerHTML = initialContent;

    document.getElementById("restart").addEventListener("click", restartGame);

    startGame();
}

export {
    buildDeck,
    shuffleDeck,
    startGame,
    hit,
    stay,
    restartGame,
    getValue,
    checkAce,
    reduceAce,
    checkGameResult
};



