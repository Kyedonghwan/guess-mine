const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="author ${nickname ? "out" : "self"}">${nickname? nickname : "You"}:</span> ${text}
    `;
    messages.appendChild(li);
};

const handleSendMsg=(event) => {
    const { events } = window;
    event.preventDefault();
    const input = sendMsg.querySelector("input");
    const {value} = input;
    window.socket.emit(events.sendMsg, {message: value});
    input.value = "";//입력창에 submit하고 입력창 텍스트가 지워짐.
    appendMsg(value);
}
export const handleNewMessage = ({message, nickname}) => appendMsg(message, nickname);

if(sendMsg){
    sendMsg.addEventListener("submit",handleSendMsg)
}

export const disableChat = () => sendMsg.style.display = "none";

export const enableChat = () => sendMsg.style.display = "flex";