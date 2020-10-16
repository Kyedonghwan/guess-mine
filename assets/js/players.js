import {disableCanvas, enableCanvas,hideControls,resetCanvas,showControls} from "./paint";
const board = document.getElementById("jsPBoard"); 
const notifs = document.getElementById("jsNotifs");

const addPlayers = (players) => players.forEach(player => {
    board.innerHTML = "";
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
})

const setNotifs = (text) => {
    notifs.innerText = "";
    notifs.innerText = text;
}

export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);
export const handleGameStarted= () => {
    setNotifs("");
    disableCanvas();
    //disable canvas events
    //hide the canvas controls
    hideControls();
}

export const handleLeaderNotif = ({word}) => {
    enableCanvas();
    showControls();
    notifs.innerText = `You are the laeder, paint : ${word}`;
}

export const handleGameEnded = () => {
    console.log("a");
    setNotifs("Game Ended.");
    disableCanvas();
    hideControls();
    resetCanvas();
}