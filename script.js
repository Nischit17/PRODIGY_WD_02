let isRunning = false;
let startTime;
let lapTime = 0;
let laps = [];
let timerInterval;

const timeDisplay = document.querySelector(".time");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(time) {
  const date = new Date(time);
  return date.toISOString().substr(11, 8) + "." + date.getMilliseconds();
}

function updateDisplay() {
  const currentTime = isRunning ? Date.now() - startTime + lapTime : lapTime;
  timeDisplay.textContent = formatTime(currentTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    lapTime += Date.now() - startTime;
    startStopButton.textContent = "Start";
    isRunning = false;
  } else {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Pause";
    isRunning = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  timeDisplay.textContent = "00:00:00.000";
  startStopButton.textContent = "Start";
  isRunning = false;
  lapTime = 0;
  laps = [];
  lapsList.innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTimeValue = Date.now() - startTime + lapTime;
    const lapTimeFormatted = formatTime(lapTimeValue);
    laps.push(lapTimeFormatted);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTimeFormatted;
    lapsList.appendChild(lapItem);
  }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

reset();
