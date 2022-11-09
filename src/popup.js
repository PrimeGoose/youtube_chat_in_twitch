// displays image with extension logo
let image = document.createElement("img");
image.src = chrome.runtime.getURL("assets/img/helo.png");
image.style.width = "300px";
image.style.margin = "-10px";
document.body.appendChild(image);
