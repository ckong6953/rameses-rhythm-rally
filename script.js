// The function called to render the main menu for the game.
const renderMainMenu = function () {
    const mainMenu =
        `<div class="card" id="main-menu">
        <header class="card-header>
            <p class="card-header-title">
                Rameses' Rhythm Rally
            </p>
        </header>
        <div class="card-content" id="main-menu-content">
            <div class="content">
                <button class="button main-menu-button" id="play-button">Play Game</button>
                <button class="button main-menu-button" id="leaderboard-button">Leaderboard</button>
                <button class="button main-menu-button" id="about-button">About</button>
            </div>
        </div>
    </div>`;
    return mainMenu;
}

// This is function that renders the description/controls of the game. 
const renderDescription = function () {
    const description =
        `<div class="card-content" id="main-menu-content">
        <div class="content">
            <p> It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            <button class="button main-menu-button" id="back-button">Back</button>
        </div>
    </dv>`;

    $("#main-menu-content").replaceWith(description);
}



// This is the main function that renders the initial game and handles all event handlers. 
const loadGame = function () {
    const $root = $("#root");
    $root.append(renderMainMenu());
    $root.on("click", "#play-button", renderGame);
    $root.on("click", "#about-button", renderDescription);
    $root.on("click", "#back-button", function () {
        $('#main-menu').replaceWith(renderMainMenu());
    });
    // $root.on("click","#leaderboard-button", renderLeaderboard);
}

// When the user would like to play game, this renders the initial state of the game as in the board and the notes to be played.
const renderGame = function () {
    const gameState =
    `<div class = "game-container">
        <div class = "key-container">
            <div class="key" id="left-key">
                <p>&#8592</p>
            </div>
            <div class="key" id="up-key">
                <p>&#8593</p>
            </div>
            <div class="key" id="down-key">
                <p>&#8595</p>
            </div>
            <div class="key" id="right-key">
                <p>&#8594</p>
            </div>
        </div>
        <div class = "track-container">
        </div>
    </div>`;
    $("#main-menu").replaceWith(gameState);
    renderNotes();
}

const renderNotes = function () {
    song.tracks.forEach(function (track, trackIndex) {
        const $addTrack =
            $(`<div class="track" id="track-${trackIndex}">
            </div>`);
        track.notes.forEach(function(note, noteIndex){
            const $addNote =
            $(`<div class="note" id="note-${noteIndex}"></div>`);
            $addNote.css({
                "background-color": `${track.color}`,
                "animation-name": "moveUp",
                "animation-timing-function": "linear",
                "animation-duration": `${note.duration}` + "s",
                "animation-delay": `${note.delay}` + "s",
                "animation-play-state": "running",
            });
            $addTrack.append($addNote);
        });
        $(".track-container").append($addTrack);
    });
}

// On window load, this will render the initial state. 
$(function () {
    loadGame();
});