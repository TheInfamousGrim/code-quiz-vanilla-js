/* -------------------------------- selectors ------------------------------- */

const highScoresList = document.querySelector('.high-scores-list');
const clearHighScoresBtn = document.getElementById('clearHighScores');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/* --------------------- add the high scores to the list -------------------- */

highScores.map((playerCard) => {
    const playerHighScoreCard = `
    <li class="player-card">
        <span id="playerName">${playerCard.name}</span> - <span id="playerScore">${playerCard.score}</span>
    </li>
    `;
    return (highScoresList.innerHTML += playerHighScoreCard);
});

/* ------------------ remove all element children function ------------------ */

function removeAllChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/* ---------------------------- clear high scores --------------------------- */

clearHighScoresBtn.addEventListener('click', () => {
    localStorage.clear();
    removeAllChildElements(highScoresList);
});
