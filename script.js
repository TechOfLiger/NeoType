const textDisplay = document.getElementById("textDisplay");
const inputField = document.getElementById("inputField");
const timeTag = document.getElementById("time");
const wpmTag = document.getElementById("wpm");
const accuracyTag = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");
const paragraphSelect = document.getElementById("paragraphSelect");
const timeSelect = document.getElementById("timeSelect");

let TEST_TIME = 60;
let timeLeft = TEST_TIME;
let timer = null;
let started = false;

// Paragraphs for different lengths
const paragraphs = {
  1: "This is a simple paragraph with twenty words in total for practice typing test purpose only.",
  2: "Typing is a skill that improves with consistent practice. This forty-word paragraph will help you measure your typing speed and accuracy efficiently during your tests.",
  3: "Improve your coding skills by practicing typing regularly. This sixty-word paragraph provides a challenge to measure your typing speed and to see how accurately you can type under time pressure. Keep focusing on each character carefully to get better results.",
  4: "Typing speed and accuracy are essential skills for programmers and writers alike. This eighty-word paragraph is designed to test both typing speed and precision over a longer stretch of text, helping to build muscle memory and focus for high-pressure scenarios. Stay consistent with practice and track your progress regularly.",
  5: "Professional typists need to maintain both speed and accuracy. This hundred-word paragraph is intentionally long to provide a comprehensive typing test for users who want to measure their maximum typing speed and accuracy. Regular practice, attention to detail, and patience are required to improve over time consistently. Make sure to focus on each word and character to avoid mistakes during this comprehensive test."
};

// Load paragraph based on selection
function loadParagraph() {
  const selected = paragraphSelect.value; 
  const text = paragraphs[selected];

  textDisplay.innerHTML = "";
  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });

  inputField.value = "";
  inputField.disabled = false;
  timeLeft = TEST_TIME;
  timeTag.innerText = TEST_TIME;
  wpmTag.innerText = 0;
  accuracyTag.innerText = 100;
  clearInterval(timer);
  started = false;
}

// Start timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if(timeLeft <= 0) {
      clearInterval(timer);
      inputField.disabled = true;
    }
  },1000);
}

// Calculate WPM & Accuracy
function calculate() {
  const spans = textDisplay.querySelectorAll("span");
  const typed = inputField.value;
  let correct = 0;

  spans.forEach((span,index)=>{
    const char = typed[index];
    if(!char){
      span.classList.remove("correct","incorrect");
    } else if(char === span.innerText){
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correct++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  const timeSpent = TEST_TIME - timeLeft;
  const minutes = timeSpent/60;
  const wpm = minutes>0?Math.round((correct/5)/minutes):0;
  wpmTag.innerText = wpm;

  const accuracy = typed.length>0?Math.round((correct/typed.length)*100):100;
  accuracyTag.innerText = accuracy;
}

// Event Listeners
inputField.addEventListener("input",()=>{
  if(!started){
    startTimer();
    started=true;
  }
  calculate();
});

restartBtn.addEventListener("click", loadParagraph);
paragraphSelect.addEventListener("change", loadParagraph);
timeSelect.addEventListener("change", ()=>{
  TEST_TIME = parseInt(timeSelect.value);
  loadParagraph();
});

// Initial load
loadParagraph();