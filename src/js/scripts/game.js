var o = [];
var o2 = [];

var score_player1 = 0;
var score_player2 = 0;
var turn_p1 = true;

var id_cell;

const div_score_p1 = document.getElementById('score-player1');
const div_score_p2 = document.getElementById('score-player2');
div_score_p1.innerHTML = score_player1;
div_score_p2.innerHTML = score_player2;

var arrow_p1 = document.getElementById('arrow-p1');
var arrow_p2 = document.getElementById('arrow-p2');

arrow_p1.className = 'fa fa-arrow-right fa-lg';
arrow_p2.className = 'arrow-empty-p2';


var clickCell = function () {
    const TicTacToe = document.getElementById("tic-tac-toe");
    if (TicTacToe) {
        for (const cell of document.getElementsByClassName('cell')) {
            cell.addEventListener('click', function() {
                if (cell.innerHTML === "") { // if empty cell we can play here
                    console.log('click ', cell.id);
                    if(turn_p1) {
                        cell.innerHTML= 'o';
                        id_cell = cell.id;
                        o.push(id_cell);
                        turn_p1 = false;
                        arrow_p1.className = 'arrow-empty-p1';
                        arrow_p2.className = 'fa fa-arrow-right fa-lg';

                        if (checkWin(o)) { // if P1 win
                            score_player1 += 1;
                            div_score_p1.innerHTML = score_player1.toString();
                            refreshBoard();
                            alert(`P1 win ! Score : P1 : ${score_player1} - P2 : ${score_player2}`);
                        } else {
                            checkEquality();
                        }
                    }else if(!turn_p1) {
                        cell.innerHTML = 'x';
                        id_cell = cell.id;
                        o2.push(id_cell);
                        turn_p1 = true;
                        arrow_p1.className = 'fa fa-arrow-right fa-lg';
                        arrow_p2.className = 'arrow-empty-p2';
                        if (checkWin(o2)) { // if P1 win
                            score_player2 += 1;
                            div_score_p2.innerHTML = score_player2.toString();
                            refreshBoard();
                            alert(`P2 win ! Score : P1 : ${score_player1} - P2 : ${score_player2}`);
                        } else {
                            checkEquality();
                        }
                    }
                }
            });
        }
    }
};

var checkEquality = function () {
    if ((o.length + o2.length) === 9) { // si plus de place
        alert("Egalité");
        refreshBoard();
    }
}

var checkWin = function (array) {
    console.log(`o : ${o}`);
    console.log(`o2 : ${o2}`);

    if(array.includes("1") && array.includes("2") && array.includes("3")) return true;
    if(array.includes("1") && array.includes("4") && array.includes("7")) return true;
    if(array.includes("1") && array.includes("5") && array.includes("9")) return true;

    if(array.includes("2") && array.includes("5") && array.includes("8")) return true;

    if(array.includes("3") && array.includes("6") && array.includes("9")) return true;
    if(array.includes("3") && array.includes("5") && array.includes("7")) return true;
    if(array.includes("3") && array.includes("2") && array.includes("1")) return true;

    if(array.includes("4") && array.includes("5") && array.includes("6")) return true;

    if(array.includes("7") && array.includes("4") && array.includes("1")) return true;
    if(array.includes("7") && array.includes("5") && array.includes("3")) return true;
    if(array.includes("7") && array.includes("8") && array.includes("9")) return true;

    if(array.includes("8") && array.includes("5") && array.includes("2")) return true;

    if(array.includes("9") && array.includes("6") && array.includes("3")) return true;
    if(array.includes("9") && array.includes("5") && array.includes("1")) return true;
    if(array.includes("9") && array.includes("8") && array.includes("7")) return true;
    return false;
};

var refreshBoard = function () {
    for (const cell of document.getElementsByClassName('cell')) {
        cell.innerHTML = "";
    }
    o = [];
    o2 = [];
    turn_p1 = true;
    arrow_p1.className = 'fa fa-arrow-right fa-lg';
    arrow_p2.className = 'arrow-empty-p2';
    timedRefresh(120);
}


// Timer
var timedRefresh = function (timeoutPeriod) {
    var timer = setInterval(function() {
    if (timeoutPeriod > 0) {
        timeoutPeriod -= 1;
        document.getElementById("timer").innerHTML = convertMS(timeoutPeriod);
    } else {
            clearInterval(timer);
            refreshBoard();
            alert("Timeout");
        };
    }, 1000);
 };

 function convertMS(seconds) {
    let minutes = Math.floor((seconds) / 60);
    let secs = seconds - (minutes * 60);
    if (minutes < 10) {minutes = "0"+minutes;}
    if (secs < 10) {secs = "0"+secs;}
    return minutes+':'+secs;
}

// onLoad
window.onload = function() {
    clickCell();
    timedRefresh(120);
}

