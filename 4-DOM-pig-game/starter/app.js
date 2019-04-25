/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

//scores = { firstPlayer: 0, secondPlayer: 0 };
//activePlayer = Object.keys(scores)[0];
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

(function init() {
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
})();

let x = document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').addEventListener('click', () => {
    // get random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // update the round score
    dice != 1 ? updateRoundScore(dice) : getNextPlayer();
});

function updateRoundScore(dice) {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function getNextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    resetRoundScore();

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function resetRoundScore() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
}

function handleWinner() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

document.querySelector('.btn-hold').addEventListener('click', () => {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    scores[activePlayer] >= 10 ? handleWinner() : getNextPlayer();

})