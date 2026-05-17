const paragraphs = [
  "Technology is transforming the modern world rapidly and creating opportunities for innovation and growth in every industry today.",

  "Programming helps students develop problem solving skills logical thinking creativity and the ability to build real world applications.",

  "Artificial intelligence machine learning and robotics are shaping the future of healthcare education transportation and business systems.",

  "Consistency discipline and continuous learning are the most important habits required to become successful in any technical career.",

  "Web development combines creativity and coding skills to design beautiful fast responsive and user friendly digital experiences."
];

const textDisplay = document.getElementById("textDisplay");
const inputField = document.getElementById("inputField");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const timeSelect = document.getElementById("timeSelect");
const wordSelect = document.getElementById("wordSelect");

let timer;
let timeLeft;
let isTyping = false;
let currentText = "";
let mistakes = 0;

function generateParagraph() {

  let wordCount = parseInt(wordSelect.value);
  let words = [];

  while(words.length < wordCount){

    let para = paragraphs[Math.floor(Math.random() * paragraphs.length)];

    words.push(...para.split(" "));
  }

  currentText = words.slice(0, wordCount).join(" ");

  textDisplay.innerHTML = "";

  currentText.split("").forEach(char => {

    const span = document.createElement("span");
    span.innerText = char;

    textDisplay.appendChild(span);
  });

  textDisplay.querySelector("span").classList.add("active");
}

function startTimer() {

  if(isTyping) return;

  isTyping = true;

  timeLeft = parseInt(timeSelect.value);

  timer = setInterval(() => {

    if(timeLeft > 0){

      timeLeft--;

      timeElement.innerText = timeLeft;

      calculateResults();

    }else{

      clearInterval(timer);

      inputField.disabled = true;
    }

  },1000);
}

inputField.addEventListener("input", () => {

  startTimer();

  const chars = textDisplay.querySelectorAll("span");

  const typedChars = inputField.value.split("");

  mistakes = 0;

  chars.forEach((char,index) => {

    if(typedChars[index] == null){

      char.classList.remove("correct","wrong");

    }
    else if(typedChars[index] === char.innerText){

      char.classList.add("correct");
      char.classList.remove("wrong");

    }
    else{

      char.classList.add("wrong");
      char.classList.remove("correct");

      mistakes++;
    }

    char.classList.remove("active");
  });

  if(chars[typedChars.length]){

    chars[typedChars.length].classList.add("active");
  }

  calculateResults();
});

function calculateResults(){

  const typedText = inputField.value.trim();

  let wordsTyped = typedText.split(/\s+/).length;

  let wpm = Math.round(
    (wordsTyped / ((parseInt(timeSelect.value)-timeLeft)/60))
  );

  if(!isFinite(wpm)) wpm = 0;

  let accuracy = Math.max(
    0,
    Math.round(
      ((typedText.length - mistakes) / typedText.length) * 100
    )
  );

  if(!isFinite(accuracy)) accuracy = 100;

  wpmElement.innerText = wpm;

  accuracyElement.innerText = accuracy + "%";
}

function restartTest(){

  clearInterval(timer);

  isTyping = false;

  inputField.disabled = false;

  inputField.value = "";

  timeLeft = parseInt(timeSelect.value);

  timeElement.innerText = timeLeft;

  wpmElement.innerText = 0;

  accuracyElement.innerText = "100%";

  generateParagraph();
}

restartBtn.addEventListener("click", restartTest);

startBtn.addEventListener("click", restartTest);

window.onload = restartTest;