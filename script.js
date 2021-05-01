/**
 * Course: COMP 426
 * Assignment: Final Project
 * Author: Chris Kong
 *
 *  This is the final project for the COMP 426 course I was enrolled in (Spring 2021).
 *  The general gist is that this is an rhythm-based game that is coded as a web app.
 * 
 */

// These are a list of global variables that will be utilized throughout the game.
let isHolding = {
    left: false,
    up: false,
    down: false,
    right: false,
}
let hits = {
    perfect: 0,
    good: 0, 
    okay: 0,
    miss: 0,
}
const score_multiplier = {
    combo30: 1.05,
    combo50: 1.10,
    perfect: 1,
    good: 0.8,
    bad: 0.5,
    miss: 0,
} 
let isPlaying = false;
let combo = 0;
let maxCombo = 0;
let score = 0;
let startTime = 0.0;

// This is the main function that renders the initial game and handles all event handlers. 
const loadGame = function () {
    const $root = $("#root");
    $root.append(renderInitialScreen())
    renderNotes();
    $root.on("click","#play-button", renderGameStart);
    $root.on("click","#leaderboard-button", renderLeaderboard);
    $root.on("click","#controls-button", renderControls);
    $root.on("click", "#back-button", renderControlsBackMenu);
    $root.on("click","#back-button", renderLeaderboardBackMenu)
    $root.on("click","#back-button", renderGameBackMenu);
    $root.on("click", "#pause-button", pauseNotes);
    $root.on("click", "#resume-button", resumeNotes);
}

// Renders the main menu and game.
const renderInitialScreen = function (){
    const gameScreen =
    `<div class="menu-container">
        <div class="initial-view">
            <h1 id="game-title">&#9835 Rameses' Rhythm Rally &#9835 </h1>
            <p id="author-tag"> by Chris Kong </p>
            <div class="main-menu">
                <button type="button" class="menu-button" id="play-button">Play Game!</button>
                <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                <button type="button" class="menu-button" id="controls-button">Controls</button>
                <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            </div>
        </div>
    </div>
    <div class = "game-container">
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
            <div class="track"></div>
            <div class="track"></div>
            <div class="track"></div>
            <div class="track"></div>
        </div>
    </div>`;
    return gameScreen;
}

// This will render the leaderboard of the game. Not yet implemented but will contact firebase to allow user
// to see who is leading, but they can also sign-up and register their score. 
const renderLeaderboard = function(){
    $(".main-menu").fadeOut("slow", function(){
        $(".main-menu").replaceWith(
            `<div class = "leaderboard-menu">
            <p id="leaderboard-tag">Will be implemented soon</p>
            <button type="button" class="menu-button" id="back-button">Back to Menu</button>
            </div>`);
        $(".leaderboard-menu").fadeTo("slow",1);
    });
}

// This will render the controls of the game as well as a back button that will take the user back to the main menu
const renderControls = function(){
    $(".main-menu").fadeOut("slow", function(){
        $(".main-menu").replaceWith(
            `<div class = "controls-menu">
            <p id="controls-tag"> Use the arrow keys to hit the note when it approaches the keys at the top of the screen!</p>
            <button type="button" class="menu-button" id="back-button">Back to Menu</button>
        </div>`);
        $(".controls-menu").fadeTo("slow",1);
    });
}

// This will render that start such that the notes will begin to fall and the user will need to start
// AKA this changes the animation-play-state of the notes from "paused" to "running" 
const renderGameStart = function (){
    $("#game-title").fadeOut("slow");
    $("#author-tag").fadeOut("slow");
    $(".main-menu").fadeOut("slow", function(){
        $(".main-menu").replaceWith(`<div class="game-menu">
        <h1 id="game-time">TIME</h1>
        <button type="button" class="menu-button" id="back-button">Back to Menu</button>
        <button type="button" class="menu-button" id="pause-button">Pause</button>
        </div>`);
        $(".game-menu").fadeTo("slow",1);
        $(".note").css("animation-play-state","running");

        startTimer(song.duration);
        document.getElementById("audio").play();
    });
}

// Renders back the main menu if the user wishes to return from the game to the main menu.
const renderGameBackMenu = function (){
    $(".game-menu").fadeOut("slow", function(){
        $("#game-title").fadeIn("slow");
        $("#author-tag").fadeIn("slow", function(){
            $(".game-menu").replaceWith(
                `<div class="main-menu">
                    <button type="button" class="menu-button" id="play-button">Play Game!</button>
                    <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                    <button type="button" class="menu-button" id="controls-button">Controls</button>
                    <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
                </div>`);
            $(".main-menu").fadeIn("slow");
        });
    });
    $(".note").fadeOut("slow", renderNotes);
    document.getElementById('audio').pause();
    document.getElementById('audio').currentTime = 0;
}

// Returns the user back to the main menu if they would like to return from the leaderboard.
const renderLeaderboardBackMenu = function (){
    $(".leaderboard-menu").fadeOut("slow", function(){
        $(".leaderboard-menu").replaceWith(
            `<div class="main-menu">
                <button type="button" class="menu-button" id="play-button">Play Game!</button>
                <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                <button type="button" class="menu-button" id="controls-button">Controls</button>
                <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            </div>`);
        $(".main-menu").fadeTo("slow",1);
    });
}

// Returns the user back to the main menu if they would like to return from the controls. 
const renderControlsBackMenu = function (){
    $(".controls-menu").fadeOut("slow", function(){
        $(".controls-menu").replaceWith(
            `<div class="main-menu">
                <button type="button" class="menu-button" id="play-button">Play Game!</button>
                <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                <button type="button" class="menu-button" id="controls-button">Controls</button>
                <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            </div>`);
        $(".main-menu").fadeTo("slow",1);
    });
}

// Will render all the notes of the song first with them being initiall hidden but all the animations have been pre-rendered. 
const renderNotes = function () {
    $('.track-container').empty();
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
                "animation-play-state": "paused",
            });
            $addTrack.append($addNote);
        });
        $(".track-container").append($addTrack);
    });
}

const pauseNotes = function (){
    $(".note").css("animation-play-state","paused");
    $("#pause-button").replaceWith(`<button type="button" class="menu-button" id="resume-button">Resume</button>`);
    document.getElementById("audio").pause();
}

const resumeNotes = function(){
    $(".note").css("animation-play-state","running");
    $("#resume-button").replaceWith(`<button type="button" class="menu-button" id="pause-button">Pause</button>`);
    document.getElementById("audio").play();
}

const startTimer = function (duration){
    let $timerDisplay = $(`<div class=timer></div>`);
    let timeDuration = duration;
    let minutes = 0;
    let seconds = 0;

    $('#game-time').replaceWith($timerDisplay);

    const songDuration = setInterval(function(){
        minutes = Math.floor(timeDuration / 60);
        seconds = timeDuration % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        const newTime = minutes + ":" + seconds;
        $timerDisplay.text(newTime);
        if (--timeDuration < 0){
            clearInterval(songDuration);
        }
    },1000);
    
}

// On window load, this will render the initial state. 
$(function () {
    loadGame();
});