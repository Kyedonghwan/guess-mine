import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress =false;
let word = null;
let leader = null;
let timeout = null; // setTimeout함수에서 timeout 중간에 이벤트를 끝낼때 settimeout이 반환하는 값을 이용한다 => 이값을 이용하여 clearTimeout으로 삭제가능

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket,io) => {

    const broadcast = (event,data) => 
        socket.broadcast.emit(event,data);
    
    const superBroadcast = (event,data) => io.emit(event,data);
    const sendPlayerUpdate = () => superBroadcast(events.playerUpdate,{sockets});
    

    const startGame = () => {
       if(sockets.length>1){
        if(inProgress === false) {
            inProgress = true;
            leader = chooseLeader();
            word = chooseWord();
            //특정 socket id 를 가진 leader를 찾아 통신하고 싶을때 io.to(누구).
            superBroadcast(events.gameStarting);
            setTimeout(()=>{
                timeout = setTimeout(endGame, 30000);
                superBroadcast(events.gameStarted);
                io.to(leader.id).emit(events.leaderNotif,{word});
                //제한시간 30초 해놓고, timeout id 를 반환한다 이 id를 이용하여 다른함수에 사용가능.
            }, 5000);
            
        }
       }
    };

    socket.on(events.setNickname, ({nickname}) => {
    socket.nickname =  nickname;
    sockets.push({id :socket.id, points:0, nickname:nickname});
    broadcast(events.newUser, {nickname}); 
    sendPlayerUpdate();
    startGame();
    });

    const endGame = () => {
        inProgress=false;
        superBroadcast(events.gameEnded);
        setTimeout(()=>startGame(),5000);
        if(timeout !==null) clearTimeout(timeout);
    };

    const addPoints = (id) => {
        sockets = sockets.map(socket => {
          if(socket.id !==id)return socket;
          else{
              socket.points += 10;
              return socket;
          } //map은 array의 각 요소마다 callback 함수를 호출하고 그 결과로 이루어진 다른 array를 반환함.
    });
    sendPlayerUpdate();
    endGame();
    clearTimeout(timeout);
}



    socket.on(events.disconnect, ()=> {
        sockets = sockets.filter( aSocket => aSocket.id !== socket.id );
        
        if(sockets.length ===1 ){
         endGame();
        }else if(leader){
            
            if(leader.id === socket.id){
                endGame();
            }
        }else 
        broadcast(events.disconnected, {nickname: socket.nickname});
        sendPlayerUpdate();
    });

    socket.on(events.sendMsg, ({message}) => {
        if(message === word){
            superBroadcast(events.newMsg, { message: `Winner is ${socket.nickname}, word was: ${word}`, nickname:"Bot"});
            addPoints(socket.id);
        }
        else{broadcast(events.newMsg, {message, nickname: socket.nickname});}
    });

    socket.on(events.beginPath, ({x,y}) => {
        broadcast(events.beganPath, {x,y})
    });

    socket.on(events.strokePath, ({x,y,color}) => {
        broadcast(events.strokedPath, {x,y,color});
    });

    socket.on(events.fill, ({color}) => {
        broadcast(events.filled, {color});
    });
};


export default socketController;