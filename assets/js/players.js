import {disableCanvas, enableCanvas,hideControls,resetCanvas,showControls} from "./paint";
import {disableChat,enableChat} from "./chat";
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
    enableChat();
}

export const handleLeaderNotif = ({word}) => {
    enableCanvas();
    showControls();
    disableChat();
    notifs.innerText = `You are the laeder, paint : ${word}`;
}

export const handleGameEnded = () => {
   
    setNotifs("Game Ended.");
    disableCanvas();
    hideControls();
    resetCanvas();
}

export const handleGameStarting = () => {
    setNotifs("Game will start soon.. Wait a minute please!");
}