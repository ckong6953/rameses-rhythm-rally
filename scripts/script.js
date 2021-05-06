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
let hits = {
    perfect: 0,
    good: 0,
    okay: 0,
    miss: 0,
}
const score_multiplier = {
    combo30: 2,
    combo50: 3,
    perfect: 1.5,
    good: 1.0,
    okay: 0.8,
    miss: 0.0,
}
let combo = 0;
let maxCombo = 0;
let score = 0;
let startTime = 0.0;
let isEnded = false;

// This is the main function that renders the initial game and handles all event handlers. 
const loadGame = function () {
    const $root = $("#root");
    $root.append(renderInitialScreen())
    renderNotes();
    $root.on("click", "#play-button", renderGameStart);
    $root.on("click", "#leaderboard-button", renderLeaderboard);
    $root.on("click", "#controls-button", renderControls);
    $root.on("click", "#back-button", renderControlsBackMenu);
    $root.on("click", "#back-button", renderLeaderboardBackMenu)
    $root.on("click", "#back-button", renderGameEndMenu);
    $root.on("change", "#volume-slider", handleVolumeControl);
    $root.on("click", "#login-button", loginUser);
    $root.on("click", "#end-button", endGame);
    calculateMiss();
    handleKeys();
}

const endGame = function() {
    isEnded = true;
}

// Renders the main menu and game.
const renderInitialScreen = function () {
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
        <div class = "hit-display">
            <div class="countdown"></div>
            <div class="hit-combo"></div>
            <div class="hit-accuracy"></div>
        </div>
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
const renderLeaderboard = function () {
    $(".main-menu").fadeOut("slow", function () {
        $(".main-menu").replaceWith(
            `<div class = "leaderboard-menu">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="email">Email:</label>
            <input type="text" id="email" name="email"><br><br>
            <button type="button" class="menu-button" id="login-button">Login</button>
            <button type="button" class="menu-button" id="back-button">Back to Menu</button>
            </div>`);
        $(".leaderboard-menu").fadeTo("slow", 1);
    });
}

// This will render the controls of the game as well as a back button that will take the user back to the main menu
const renderControls = function () {
    $(".main-menu").fadeOut("slow", function () {
        $(".main-menu").replaceWith(
            `<div class = "controls-menu">
            <p id="controls-tag"> Use the arrow keys to hit the note when it approaches the keys at the top of the screen!</p>
            Music Volume: <input type="range" id="volume-slider" value="${parseInt(document.getElementById("audio-song").volume * 100)}">
            <button type="button" class="menu-button" id="back-button">Back to Menu</button>
        </div>`);
        $(".controls-menu").fadeTo("slow", 1);
    });
}

// This will render that start such that the notes will begin to fall and the user will need to start
// AKA this changes the animation-play-state of the notes from "paused" to "running" 
const renderGameStart = function () {
    $("#game-title").fadeOut("slow");
    $("#author-tag").fadeOut("slow");
    $(".main-menu").fadeOut("slow", function () {
        $(".main-menu").replaceWith(
            `<div class="game-menu">
            <h1 class="timer"></h1>
            <button type="button" class="game-button" id="end-button">End Game</button>
            <img id="rameses-dance" src="../other/rameses.gif">
            <div class="results"></div>
        </div>`);
        $(".game-menu").fadeTo("slow", 1);
        $(".note").css("animation-play-state", "running");

        startTimer(song.duration);
    });
}

// Once the game ends, i.e. the timer interval is cleared, this will render the results from the
// user's performance. 
const renderGameEndMenu = function () {
    $(".game-menu").fadeOut("slow", function () {
        $("#rameses-dance").fadeOut("slow");
        $("#game-title").fadeIn("slow");
        $("#author-tag").fadeIn("slow", function () {
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
    song.tracks.forEach(function (track) {
        track.next = 0;
    });
    combo = 0;
    maxCombo = 0;
    score = 0;
    isEnded = false;
    hits = {
        perfect: 0,
        good: 0,
        okay: 0,
        miss: 0,
    }
}

// Returns the user back to the main menu if they would like to return from the leaderboard.
const renderLeaderboardBackMenu = function () {
    $(".leaderboard-menu").fadeOut("slow", function () {
        $(".leaderboard-menu").replaceWith(
            `<div class="main-menu">
                <button type="button" class="menu-button" id="play-button">Play Game!</button>
                <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                <button type="button" class="menu-button" id="controls-button">Controls</button>
                <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            </div>`);
        $(".main-menu").fadeTo("slow", 1);
    });
}

// Returns the user back to the main menu if they would like to return from the controls. 
const renderControlsBackMenu = function () {
    $(".controls-menu").fadeOut("slow", function () {
        $(".controls-menu").replaceWith(
            `<div class="main-menu">
                <button type="button" class="menu-button" id="play-button">Play Game!</button>
                <button type="button" class="menu-button" id="leaderboard-button">Leaderboard</button>
                <button type="button" class="menu-button" id="controls-button">Controls</button>
                <p id="about-tag"> About: It’s the night of the big game, and Rameses needs to get the crowd pumped up! Hit the arrow keys on rhythm to get the best score! </p>
            </div>`);
        $(".main-menu").fadeTo("slow", 1);
    });
}

// Will render all the notes of the song first with them being initiall hidden but all the animations have been pre-rendered. 
const renderNotes = function () {
    $('.track-container').empty();
    song.tracks.forEach(function (track, trackIndex) {
        const $addTrack =
            $(`<div class="track" id="track-${trackIndex}">
            </div>`);
        track.notes.forEach(function (note, noteIndex) {
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

// This function loads the timer and handles events for when the user misses a note and presses a key for a note.
const startTimer = function (duration) {
    startTime = Date.now();
    let $timer = $('.timer');
    let timeDuration = duration;
    let minutes = 0;
    let seconds = 0;

    const songDuration = setInterval(function () {
        minutes = Math.floor(timeDuration / 60);
        seconds = timeDuration % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        const newTime = minutes + ":" + seconds;
        $timer.text(newTime);
        timeDuration--;
        if (timeDuration < 0 || isEnded) {
            clearInterval(songDuration);
            renderNotes();
            document.getElementById('audio-song').pause();
            document.getElementById('audio-song').currentTime = 0;
            const results =
                `<div class ="results-summary"> Results Summary: </div>
                    <div class = "score">Score: ${score}</div>
                    <div class = "max-combo">Max Combo: ${maxCombo}</div>
                    <div class = "perfect-hit">Perfect: ${hits.perfect}</div>
                    <div class = "good-hit">Good: ${hits.good}</div>
                    <div class = "okay-hit">Okay: ${hits.okay}</div>
                    <div class = "miss-hit">Miss: ${hits.miss}</div>`;
            renderCrowd();
            $('.results').append(results);
            $('.game-menu').append(`<button type="button" class="menu-button" id="back-button">Back to Menu</button>`);
            $(`#rameses-dance`).fadeOut("slow")
            $(`#end-button`).fadeOut("slow", function(){
                $('.results').fadeIn("slow");
            $('#back-button').fadeIn("slow");
            $timer.fadeOut('slow', function () {
                $('.hit-display').fadeOut("slow", function () {
                    $(`.hit-display`).replaceWith(`<div class = "hit-display">
                            <div class="countdown"></div>
                            <div class="hit-combo"></div>
                            <div class="hit-accuracy"></div>
                            </div>`);
                });
            });
            });
        }
    }, 1000);
    document.getElementById("audio-song").play();
    $("#rameses-dance").fadeTo("slow", 1);
    $("#end-button").fadeTo("slow", 1);
}

// function utilized to determine what key is pressed. 
const handleKeys = function () {
    $(document).on("keydown", function (keyEvent) {
        let keyPressed = findKeyIndex(keyEvent.key);

        if ($(`#track-${keyPressed}`).children().length > 0) {
            calculateHit(keyPressed);
        }
    });
}

// Helper method to determine what key pressed corresponds to song object. 
const findKeyIndex = function (keyPressed) {
    if (keyPressed === "ArrowLeft") {
        return 0;
    }
    else if (keyPressed === "ArrowUp") {
        return 1;
    }
    else if (keyPressed === "ArrowDown") {
        return 2;
    }
    else {
        return 3;
    }
}

//
const renderAccuracyDisplay = function (hit) {
    $('.hit-accuracy').attr('id', `accuracy-${hit}`);
    $('.hit-accuracy').text(`${hit}`);
}

// Used to catch all missed notes within the game
const calculateMiss = function () {
    $(`.track-container`).on("animationend", function (event) {
        const keyIndex = $(event.target).parent().attr('id').charAt(6);
        renderAccuracyDisplay('miss');
        updateHits('miss');
        updateCombo('miss');
        updateMaxCombo();
        updateNextNote(keyIndex);
        event.target.remove();
    });
}

// Used to determine various properties of the user's action. 
const calculateHit = function (keyIndex) {
    const timeCalc = (Date.now() - startTime) / 1000;
    const nextNoteIndex = song.tracks[keyIndex].next;
    const nextNote = song.tracks[keyIndex].notes[nextNoteIndex];
    const perfectTime = nextNote.duration + nextNote.delay;
    const accuracy = Math.abs(timeCalc - perfectTime);

    if (accuracy > (nextNote.duration) / 4) {
        return;
    }

    const hitCalculation = judgeHitPrecision(accuracy);
    renderAccuracyDisplay(hitCalculation);
    updateHits(hitCalculation);
    updateCombo(hitCalculation);
    updateMaxCombo();
    calculateScore(hitCalculation);
    $(`#track-${keyIndex}`).children(`#note-${nextNoteIndex}`).remove();
    updateNextNote(keyIndex);
}

// Determines how on-beat a keystroke is to the notes of teh game.
const judgeHitPrecision = function (accuracy) {
    if (accuracy < 0.1) {
        return 'perfect';
    } else if (accuracy < 0.2) {
        return 'good';
    } else if (accuracy < 0.3) {
        return 'okay';
    } else {
        return 'miss';
    }
}

// Manipulates the global array of hits and increments to whatever was hit. 
const updateHits = function (hitText) {
    hits[hitText]++;
}

// Manipulates the global combo count and increments it. 
const updateCombo = function (hitText) {
    if (hitText === "miss" || hitText === "okay") {
        combo = 0;
        $('.hit-combo').text('');
    }
    else {
        $('.hit-combo').text(++combo);
    }
}

const updateMaxCombo = function () {
    maxCombo = maxCombo > combo ? maxCombo : combo;
}

const calculateScore = function (hit) {
    if (combo >= 50) {
        score += 100 * score_multiplier[hit] * score_multiplier.combo50;
    }
    else if (combo >= 30) {
        score += 100 * score_multiplier[hit] * score_multiplier.combo30;
    }
    else {
        score += 100 * score_multiplier[hit];
    }
}

// Updates the next note of the track. 
const updateNextNote = function (keyIndex) {
    song.tracks[keyIndex].next++;
}

const handleVolumeControl = function (event) {
    const volumeLevel = event.target.value / 100;
    document.getElementById("audio-test").volume = volumeLevel;
    document.getElementById("audio-test").play();
    document.getElementById("audio-song").volume = event.target.value / 100;
}

// These are all the Third-Party API calls that will be utilized in the game
// Namely, one retrieves the lyrics of the song and the other lets the user post their score
// to twitter.

const getLyrics = async function (){
    $.ajax({
        "url": "https://api.lyrics.ovh/v1/Rick Astley/Never Gonna Give You Up",
        "method": "GET",
    }).then(function(response){
        let songLyrics = `<div class="song-lyrics">${response.lyrics}</div>`;
        $('.game-menu').append(songLyrics);
    });
}

const renderCrowd = async function(){
    $.ajax({
        "url": "https://api.giphy.com/v1/gifs/l0NhWHDm0mmp1cY00?api_key=i0z0bGj1aqdUxSSQZ8AqBhhUbgG1D5FK",
        "method": "GET",
    }).then(function(response){
        const gifString = response.data.images.original.mp4;
        const videoHTML = 
        `<video id="crowd-win" width="320" height="240" autoplay muted loop>
            <source src="${gifString}" type="video/mp4">
        </video>`;
        $(".results").append(videoHTML);
    });
}

// These are all firebase-related methods, i.e. pulling login requests etc.
const loginUser = function (){
}


// On window load, this will render the initial state. 
$(function () {
    loadGame();
});