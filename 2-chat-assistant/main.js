import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "_AIzaSyD5eajeoBHyhdRQW2swEdhC6HEo3MsiB64";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let messages =  {
    history: [],
};
async function sendMessage() {

    try {
        const userMessage = document.querySelector(".chat-window input").value;

        if(userMessage.length) {
            document.querySelector(".chat-window input").value = "";
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="user">
                    <p>${userMessage}</p>
                </div>`)
        }

        const chat = model.startChat(messages);
        const result = await chat.sendMessage(userMessage);
        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="model">
            <p>${result.response.text()}</p>
        </div>`);
        
        messages.history.push({
            role: "user",
            parts: [{text: userMessage}],
        });
        messages.history.push({
            role: "model",
            parts: [{text: result.response.text()}],
        });
    } catch(error) {
        document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend", `<div class="error">
            <p>The message could not be sent. Please try again.</p>
        </div>`);
    }

    
   

}

document.querySelector(".chat-window .input-area button").addEventListener("click", () => sendMessage());