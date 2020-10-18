import {disableCanvas, enableCanvas,hideControls,resetCanvas,showControls} from "./paint";
import {disableChat,enableChat} from "./chat";
const board = document.getElementById("jsPBoard"); 
const notifs = document.getElementById("jsNotifs");
const timeNotif = document.getElementById("jsTimeNotif");

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

const setTimeNotif = (text) => {
    timeNotif.innerText = "";
    timeNotif.innerText = text;
}

export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);


export const handleGameStarted= () => {
    setNotifs("");
    disableCanvas();
    //disable canvas events
    //hide the canvas controls
    hideControls();
    enableChat();
    let time=29;
    const x=setInterval(()=>{
        if(time>5)
        setTimeNotif(String(time)+" seconds");
        
        else{
            if(time>0){
            timeNotif.style.color="red";
            setTimeNotif("Hurry up!!"+String(time)+" seconds");}
            else{
                timeNotif.style.color="black";
                timeNotif.innerText="";
                clearInterval(x);}
        }
        time--;
    },1000);//1초 있다가 시작함.
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