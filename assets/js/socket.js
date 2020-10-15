import { handleNewUser , handleDisconnected} from "./notifications";
import {handleNewMessage} from "./chat";
import { handleBeganPath,handleStrokedPath, handleFilled } from "./paint";

let socket = null;

export const getSocket = ()=> socket;//update해주었던 socket을 넘겨줌.

export const initSockets = aSocket =>{
    const {events} = window;
    socket = aSocket;
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnected);
    socket.on(events.newMsg, handleNewMessage);
    socket.on(events.beganPath,handleBeganPath );
    socket.on(events.strokedPath,handleStrokedPath );
    socket.on(events.filled, handleFilled);
}