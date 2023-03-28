// Selecting the necessary elements from the DOM
const chatBody = document.querySelector(".chat-body");
const txtinput = document.querySelector("#txtinput");
const send = document.querySelector(".send");
const loadingEle = document.querySelector(".loading");
const chatButton = document.querySelector(".chatButton");
const chatHeader = document.querySelector(".chat-header");
const container = document.querySelector(".container");

// Hiding the chat container initially
container.style.display = "none";

// Initializing variables
let isShowChat = false;
let isShowIcon = true;

// Event listener for showing/hiding the chat container
chatButton.addEventListener("click", () => {
  if (!isShowChat) {
    container.style.display = "block";
    chatButton.style.display = "none";
    isShowChat = true;
  }
});

chatHeader.addEventListener("click", () => {
  if (isShowIcon) {
    container.style.display = "none";
    isShowChat = false;
    chatButton.style.display = "block";
  }
});

// Event listener for sending user message
send.addEventListener("click", () => renderUserMessage());

// Event listener for sending user message when Enter key is pressed
txtinput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

// Function to render user message
const renderUserMessage = () => {
  const userInput = txtinput.value;
  renderMessageEle(userInput, "user");
  txtinput.value = "";
  toggleLoading(false);
  renderChatbotResponse(userInput);
};

// Function to render chatbot response
const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
};

// Function to render message elements
const renderMessageEle = (txt, type) => {
  let className = "user-message";
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.append(txtNode);
  if (type !== "user") {
    className = "chatbot-message";
    messageEle.classList.add(className);
    const botResponseContainer = document.createElement("div");
    botResponseContainer.classList.add("bot-response-container");
    const botImg = document.createElement("img");
    botImg.setAttribute("src", "./images/chatbot.png");
    botResponseContainer.append(botImg);
    botResponseContainer.append(messageEle);
    chatBody.append(botResponseContainer);
  } else {
    messageEle.classList.add(className);
    chatBody.append(messageEle);
  }
};

// Function to get chatbot response
const getChatbotResponse = (userInput) => {
  chatBotService
    .getBotResponse(userInput)
    .then((response) => {
      renderMessageEle(response);
      setScrollPosition();
      toggleLoading(true);
    })
    .catch((error) => {
      setScrollPosition();
      toggleLoading(true);
    });
};

// Function to set the scroll position to the bottom of the chat container
const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

// Function to toggle loading animation
const toggleLoading = (show) => loadingEle.classList.toggle("hide", show);

// Object containing chatbot responses
const responseObj = {
  hello: "Hey ! How are you doing ?",
  hey: "Hi ! How can I help you?",
  today: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
};

// Function to fetch response from the response object
const fetchResponse=(userInput)=>{
    return new Promise((res,reject)=>{
        try{
            setTimeout(()=>{
                res(responseObj[userInput]);
            },1200);
            
        }catch(error){
            reject(error);
        }
    });

};
const chatBotService = {
    getBotResponse(userInput){
        return fetchResponse(userInput);
    },
};