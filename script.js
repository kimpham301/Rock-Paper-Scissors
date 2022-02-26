const choices = ['Paper', 'Rock', 'Scissors'];
let computerPoints = 0;
let playerPoints = 0;
let outcome;


document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', onClickEvent);
});


function onClickEvent(e) {

    const value = e.target.value;
    const gameContainer = document.querySelector('#gameContainer');
    const winnerStr = document.querySelector('#winnerStr');
    const playerScoreDiv = document.querySelector('#playerScore');
    const computerScoreDiv = document.querySelector('#computerScore');

    if (choices.indexOf(value) !== -1) {

        gameContainer.style.visibility = 'visible';
        outcome = playRound(value, computerPlay())

        if (outcome.outcome !== 't') {
            if (outcome.outcome === 'p') {
                playerPoints++; 
            }
            else {
                computerPoints++;
            }
        } 
    }


    else if (value === 'restart') {
        
        playerPoints = 0;
        computerPoints = 0;
        winnerStr.textContent = ''
        
    }

    playerScoreDiv.innerHTML = playerPoints;
    computerScoreDiv.innerHTML = computerPoints;
    winnerStr.textContent = outcome.winnerStr;


    /* adjusted to restart button
    if (playerPoints === 5 || computerPoints === 5) {
        const winner = playerPoints > computerPoints ? 'win' : 'lose';
        div.innerHTML = `<br><br>You ${winner}! ${playerPoints} : ${computerPoints}`
        playerPoints = 0;
        computerPoints = 0;
    }
    */

}



function computerPlay() {
    
    const randomNum = Math.floor(Math.random() * choices.length);
    return choices[randomNum];
}

function playRound(playerSelection, computerSelection) {

    const playerSelectionIndex = choices.indexOf(playerSelection);
    const computerSelectionIndex = choices.indexOf(computerSelection);

    const outcomes = [
        ['t', 'c', 'p'],
        ['p', 't', 'c'],
        ['c', 'p', 't']
    ];

    const outcomeMap = {
        't': `It's a tie! You both selected ${playerSelection}`,
        'c': `You Lose! ${computerSelection} beats ${playerSelection}`,
        'p': `You Win! ${playerSelection} beats ${computerSelection}`
    };

    const outcome = outcomes[playerSelectionIndex][computerSelectionIndex];
    
    return {
        'outcome': outcome,
        'winnerStr': outcomeMap[outcome]
        };
}

function game() {

    const numRounds = 5;
    
    var computerPoints = 0;
    var playerPoints = 0;

    for (let i = 0; i < numRounds; i++) {

        let playerSelection;

        while (choices.indexOf(playerSelection) === -1) {
            playerSelection = prompt('Select a move (type rock, paper or scissors): ');
        }
        
        const computerSelection = computerPlay();

        const result = playRound(playerSelection, computerSelection);
        console.log(result.winnerStr)
        const outcome = result.outcome;

        if (outcome !== 't') {
            if (outcome === 'p') {
                playerPoints++; 
            }
            else {
                computerPoints++;
            }
        }
    }

    if (playerPoints > computerPoints) {
        alert(`P${playerPoints} : C${computerPoints} - You Win!`)
    }
    else if (playerPoints < computerPoints) {
        alert(`P${playerPoints} : C${computerPoints} - You Lose!`)
    }
    else {
        alert("It's a tie!")
    }

}
