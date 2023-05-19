const hrSpan = document.querySelector(".hour");
const minSpan = document.querySelector(".minute");
const secSpan = document.querySelector(".second");
const msecSpan = document.querySelector(".millisecond");
const startStopwatch = document.querySelector(".startStopwatch");
const startPauseIcon = document.querySelector(".starticon");
const lapStopwatch = document.querySelector(".lapStopwatch");
const output = document.querySelector(".output");

let time = 0;

let msec = 0;
let sec = 0;
let min = 0;
let hr = 0;

let msecDisplay = String(msec).padStart(2, 0);
let secDisplay = String(sec).padStart(2, 0);
let minDisplay = String(min).padStart(2, 0);
let hrDisplay = String(hr).padStart(2, 0);

msecSpan.textContent = msecDisplay;
secSpan.textContent = secDisplay;
minSpan.textContent = minDisplay;
hrSpan.textContent = hrDisplay;

let startPause = true;

let interval;

function intervalFunction() {
  if (startPause) {
    lapStopwatch.classList.remove('red');
    lapStopwatch.innerHTML = 'lap';

    startPauseIcon.classList.remove("fa-play");
    startPauseIcon.classList.add("fa-pause");

    startPause = !startPause;

    // console.log("Interval Running");
    interval = setInterval(startStopwatchTimer, 10);

    function startStopwatchTimer() {
      msec++;
      // console.log(msec);

      msecDisplay = String(msec).padStart(2, 0);
      secDisplay = String(sec).padStart(2, 0);
      minDisplay = String(min).padStart(2, 0);
      hrDisplay = String(hr).padStart(2, 0);

      if (msec < 100) {
        msecSpan.textContent = msecDisplay;
      }
      secSpan.textContent = secDisplay;
      minSpan.textContent = minDisplay;
      hrSpan.textContent = hrDisplay;


      if (msec == 100) {
        msec = 0;
        sec++;
      }
      if (sec == 60) {
        sec = 0;
        min++;
      }
      if (min == 60) {
        min = 0;
        hr++;
      }
    }
  } else {
    lapStopwatch.innerHTML = '<i class="fa-solid fa-arrow-rotate-left">';
    lapStopwatch.classList.add('red');

    startPauseIcon.classList.remove("fa-pause");
    startPauseIcon.classList.add("fa-play");

    clearInterval(interval);

    // console.log("Interval Paused");
    startPause = !startPause;
  }
}



// const lapIcon = document.querySelector('.lapIcon');

function outputLap() {

  if (!startPause) {
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `${hrDisplay}:${minDisplay}:${secDisplay},${msecDisplay}`;
    output.appendChild(lapDiv);
  } else {

    msec = 0;
    sec = 0;
    min = 0;
    hr = 0;

    msecSpan.textContent = String(msec).padStart(2, 0);
    secSpan.textContent = String(sec).padStart(2, 0);
    minSpan.textContent = String(min).padStart(2, 0);
    hrSpan.textContent = String(hr).padStart(2, 0);
    output.innerHTML = '';
  }
}

lapStopwatch.addEventListener("click", outputLap);
startStopwatch.addEventListener("click", intervalFunction);