const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const Cus_MSGS = [
"Hi, I have something to ask.",
"Can you hurry up?",
"I Love you",
"Thank you.",
"Got it.",
"😄"];


const Cus_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const Deli_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const Cus_NAME = "";
const Deli_NAME = "";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(Deli_NAME, Deli_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, Cus_MSGS.length - 1);
  const msgText = Cus_MSGS[r];
  const delay = msgText.split(" ").length * 300;

  setTimeout(() => {
    appendMessage(Cus_NAME, Cus_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}