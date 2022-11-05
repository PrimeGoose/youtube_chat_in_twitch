const style = document.createElement('style');

style.textContent = `
.yt-chat-hidden {
    display: none
}


.yt-chat-id-input {
    width: 8em;
    height: 1.5em;
    position: relative;
    z-index: 198;
    margin-right: 5px;
    margin-left: 5px;
    font-weight: 900;
    text-align: center;
}

.yt-chat-id-button {
    width: fit-content;
    height: 20px;
    position: relative;
    z-index: 198;
    font-size: 16px;
    font-weight: 100;
    font-family: auto;
    text-transform: uppercase;
    color: #d51919;
    background-color: rgb(255 255 255 / 11%);
    border-radius: 6px;
    line-height: 1em;
    padding-left: 5px;
    padding-right: 5px;
}

/* hover */
.yt-chat-id-button:hover {
    background-color: rgb(255 255 255 / 22%);
}

.yt-chat-hide-show-button {
    width: 55px;
    height: 20px;
    position: relative;
    z-index: 198;
    font-size: 16px;
    font-weight: 100;
    font-family: auto;
    text-transform: uppercase;
    color: #d51919;
    background-color: rgb(255 255 255 / 11%);
    border-radius: 6px;
    line-height: 1em;
    padding-left: 5px;
    padding-right: 5px;
    text-align-last: center;
}

/* hover */
.yt-chat-hide-show-button:hover {
    background-color: rgb(255 255 255 / 22%);
}

.yt-chat-frame {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    padding-top: 45px;
    z-index: 99;
}

.yt-chat-input-div {
    position: relative;
    z-index: 198;
    right: 0em;
    top: 0em;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;

}

.yt-chat-container {
    display: flex;
    flex-direction: column-reverse !important;
    z-index: 666;
    background-color: #18181b;
    right: 5em;
    width: 61%;
    top: 0em;
    position: absolute;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
}

.yt-chat-title {
    font-size: 13px;
    font-weight: 100;
    font-family: system-ui;
    padding-right: 7.5px;
}
`;
 
// add style
document.head.appendChild(style);


const wrapper = document.querySelector(".channel-root__right-column--expanded");
let VIDEO_ID = localStorage.getItem("yt-chat-id");
let isShowing = localStorage.getItem("yt-chat-showing");
let toggleChat = 0
let showWasUded = false



// input element
let input = document.createElement("input");
input.type = "text";
input.placeholder = "Youtube Chat ID";
input.classList.add("yt-chat-id-input");
input.value = VIDEO_ID;

// button element
let enterButton = document.createElement("button");
enterButton.innerText = "enter";
enterButton.classList.add("yt-chat-id-button");
if (VIDEO_ID > 11 || VIDEO_ID < 11) {
  enterButton.style.color = "red";
}

// hide show button 
let hideShowButton = document.createElement("button");
hideShowButton.innerText = "hide";
hideShowButton.classList.add("yt-chat-hide-show-button");


// iframe element
let frame = document.createElement("iframe");
frame.classList.add("yt-chat-frame");

if (isShowing == "true") {
  frame.style.display = "block";
} else if (isShowing == "false") {
  hideShowButton.innerText = "show";
  toggleChat = 1;

}
if (VIDEO_ID != null) {
  VIDEO_ID = localStorage.getItem("yt-chat-id");
  frame.src = `https://www.youtube.com/live_chat?v=${VIDEO_ID}&embed_domain=${window.location.hostname}`;
  enterButton.style.color = "green";
} else {
  VIDEO_ID = input.value;
  input.value = "enter id";
  enterButton.style.color = "red";

}

//input div element
const inputDiv = document.createElement("div");
inputDiv.classList.add("yt-chat-input-div");


// title element
const title = document.createElement("p");
title.innerText = "Youtube Chat ID";
title.classList.add("yt-chat-title");


// container div element
const container = document.createElement("div");
container.classList.add("yt-chat-container");
container.appendChild(inputDiv);
container.appendChild(title);
container.style.display = "flex";
container.style.flexDirection = "column";

// make sure there is only one youtube chat on the page at a time
let chat = document.querySelector(".yt-chat-frame");
if (chat) {
  chat.remove();
  wrapper.appendChild(frame);
} else {
  wrapper.appendChild(frame);
}


// show youtube chat using id from input
enterButton.onclick = () => {
  let id = document.querySelector(".yt-chat-id-input").value;
  let chat = document.querySelector(".yt-chat");

  // 11 characters
  if (id.length == 11) {
    localStorage.setItem("yt-chat-id", id);

    frame.value = id;
    frame.src = `https://www.youtube.com/live_chat?v=${id}&embed_domain=${window.location.hostname}`;
    enterButton.style.color = "green";
    frame.style.display = "block";
    hideShowButton.innerText = "hide";
    hideShowButton.style.color = "green";
    toggleChat = 0;
    title.innerText = `Youtube Chat ID`;

  } else {

    input.value = "";
    input.placeholder = `${VIDEO_ID}`;
    title.innerText = `Youtube Chat ID`;
  }
  if (chat) {
    chat.remove(); wrapper.appendChild(frame);
  } else { wrapper.appendChild(frame); }


};


// toggle youtube chat with alt key press   
document.addEventListener('keydown', (event) => {
  if (isShowing == "false" && showWasUded == false) {
    showWasUded = true;

    let chat = document.querySelector(".yt-chat-frame");
    if (chat) {
      chat.remove();
      wrapper.appendChild(frame);
    } else {
      wrapper.appendChild(frame);
    }
  }



  if (event.altKey) { toggleChat += 1; }
  // if toggleChat is even number
  if (toggleChat % 2 == 0) {
    frame.style.display = "block";
    hideShowButton.innerText = "hide";
    hideShowButton.style.color = "green";
  }

  // if toggleChat is odd number
  else {
    frame.style.display = "none";
    hideShowButton.innerText = "show";
    hideShowButton.style.color = "red";

  }
}, false);

// hide on click .yt-chat-hide-show-button
hideShowButton.onclick = () => {
  if (isShowing == "false" && showWasUded == false) {
    showWasUded = true;

    let chat = document.querySelector(".yt-chat-frame");
    if (chat) {
      chat.remove();
      wrapper.appendChild(frame);
    } else {
      wrapper.appendChild(frame);
    }
  }

  toggleChat += 1;
  // if toggleChat is even number
  if (toggleChat % 2 == 0) {
    frame.style.display = "block";
    hideShowButton.innerText = "hide";
    hideShowButton.style.color = "green";
    localStorage.setItem("yt-chat-showing", "true");
  }
  // if toggleChat is odd number
  else {
    frame.style.display = "none";
    hideShowButton.innerText = "show";
    hideShowButton.style.color = "red";
    localStorage.setItem("yt-chat-showing", "false");



  }
};


// append input and button to inputDiv
inputDiv.appendChild(enterButton);
inputDiv.appendChild(input);
inputDiv.appendChild(hideShowButton);
wrapper.appendChild(container);
















