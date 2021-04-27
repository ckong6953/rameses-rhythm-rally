// The function called to render the main menu for the game.
const renderMainMenu = function(){
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
                <button class="button main-menu-button"id="leaderboard-button">Leaderboard</button>
                <button class="button main-menu-button" id="about-button">About</button>
            </div>
        </div>
    </div>`;
    return mainMenu;
}

const renderDescription = function (){
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
const loadGame = function(){
    const $root = $("#root");
    $root.append(renderMainMenu());
    // $root.on("click","#play-button", renderGame);
    $root.on("click","#about-button", renderDescription);
    $root.on("click", "#back-button", function(){
        $('#main-menu').replaceWith(renderMainMenu());
    });
    // $root.on("click","#leaderboard-button", renderLeaderboard);
}


// On window load, this will render the initial state. 
$(function (){
    loadGame();
});