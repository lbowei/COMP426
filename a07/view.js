import Game from "./engine/game.js";

function initialGameView() {
    return $(`
    <div id="root">
        <section id="header">
            <div class="header-text">
                2048
            </div>
        </section>
        <section>
            <div class="howTo">
                <h1>How to play:</h1>
                <p>Use your arrowkeys to move the tiles around the board.</p >
                <p>Two tiles combine into one when they have the same value and are pushed into each other.</p >
                <p>Goal: get a tile to 2048!</p >
            </div>
        </section>
        <section id="game-view">
            <div id="scoreboard">
                <div class="tile is-parent">
                    <div class="tile is-child is-3"></div>
                    <div class="tile is-child is-1" id="score-panel">
                        <p>Score:</p >
                        <p id="score">0</p >
                    </div>
                    <div class="tile is-child is-4"></div>
                    <button class="button is-warning has-text-weight-semibold" id="reset-button">Reset Game</button>
                </div>
            </div>
            <div id="game-proper">
                <div id="board">
                </div>
            </div>
        </section>
    
    </div>
    `);
}

// initialize the game
function init() {
    // Load initial empty page
    $('body').empty()
    $('body').append(initialGameView());

    // Load game board
    let game = new Game(4);
    loadGameView(game);
    addEventHandlers(game);

    // Set up reset button
    $('#reset-button').on('click', () => {
        reloadGameView(new Game(4));
    });
}
function loadGameView(game) {
    let size = game.size;
    // Generate empty tiles, for visual effect
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            $('#board').append(
                $('<div class="game-tile empty-tile"></div>')
                .css({top: ((1+i*15)+'vmin'), left: ((1+j*15)+'vmin')})
            );
        }
    }

    loadScore(game);
    loadTiles(game);
}

// Deal with event handlers
function detachAllEventHandlersAndMessages() {
    $(document).off('keydown');
    let winMessageBanner = $('#win-message');
    if (winMessageBanner.length) {
        winMessageBanner.remove();
    }
    let loseMessageBanner = $('#lose-message');
    if (loseMessageBanner.length) {
        loseMessageBanner.remove();
    }
}

function addEventHandlers(game) {
    $(document).keydown((keyEvent) => {
        switch(keyEvent.which) {
            case 37: // left
            game.move('left');
            break;
            case 38: // up
            game.move('up');
            break;
            case 39: // right
            game.move('right');
            break;
            case 40: // down
            game.move('down');
            break;
        };
        loadTiles(game);
        loadScore(game);
    });
    game.onLose(() => {
        $('<div id="lose-message"></div>')
        .appendTo('#root')
        .append(
            $(`
            <div>
                <p>I am sorry you lost</p >
                <p>But you can press the "Reset Game" button to try again.</p >
            </div>
            `)
            .css({"position": "absolute", "top": "50%", 
                    "font-size": "5vmin", "color": "pink", 
                    "text-align": "center", "opacity": "0.7",
                    "background-color": "white"})
        )
    });
    game.onWin(() => {
        if(!($('#root').find('#win-message').length)) {
            $('<div id="win-message"></div>')
            .appendTo('#root')
            .append(
                $(`
                <div>
                    <p>You solved this 2048 challenge!!!</p >
                    <p>Your score was: ${game.gameState.score}.</p >
                    <br>
                    <button class="button" id="continue">Continue</button>
                </div>
                `)
                .css({"position": "absolute", "top": "20%", "bottom": "20%",
                    "font-size": "5vmin", "color": "red", 
                    "text-align": "center", "background-color": "white"})
            ).find('#continue').on('click', () => {
                $('#win-message').empty();
            });
        }
    });
}

function loadScore(game) {
    $('#score').empty().text(game.gameState.score);
}

// Function to display all game tiles on the board
function loadTiles(game) {
    let size = game.size;
    let board = game.gameState.board;
    let gameViewBoard = $('#board');

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            gameViewBoard.find('#' + (i*size + j)).remove();

            let currentValue = board[i*size + j];
            if (currentValue != 0) {
                gameViewBoard.append(
                    $(`<div class="game-tile tile-${currentValue}">${currentValue}</div>`)
                    .css({top: ((1+i*15)+'vmin'), left: ((1+j*15)+'vmin')})
                    .attr('id', (i*size + j))
                );
            }
        }
    }
}



function reloadGameView(game) {
    detachAllEventHandlersAndMessages();
    loadScore(game);
    loadTiles(game);
    attachEventHandlers(game);
}


$(document).ready(init());