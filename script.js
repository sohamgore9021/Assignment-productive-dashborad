const c = document.querySelector("#clock");
const d = document.querySelector("#dateDisplay");

const tempEl = document.querySelector("#weatherTemp");
const descEl = document.querySelector("#weatherDesc");


const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todolist = document.querySelector(".todoList");

const addTodo = () => {
  const txt = inputBox.value.trim();

  if (txt.length <= 0) {
    alert("You must write something");
    return;
  }

  const li = document.createElement("li");

  const p = document.createElement("p");
  p.innerHTML = txt;
  li.appendChild(p);

  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.classList.add("btn", "doneBtn");
  li.appendChild(doneBtn);

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("btn", "deleteBtn");
  li.appendChild(delBtn);

  todolist.appendChild(li);
  inputBox.value = "";
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Delete") {
    todolist.removeChild(e.target.parentElement);
  }

  if (e.target.innerHTML === "Done") {
    e.target.previousElementSibling.style.textDecoration = "line-through";
    e.target.previousElementSibling.style.opacity = "0.6";
  }
};

addBtn.addEventListener("click", addTodo);
todolist.addEventListener("click", updateTodo);

async function up() {
  let res = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata"
  );

  let data = await res.json();

  c.textContent = `${data.hour}:${data.minute}:${data.seconds}`;
  d.textContent = `${data.dayOfWeek}, ${data.day}-${data.month}-${data.year}`;

  if (data.hour >= 6 && data.hour < 18) {
    document.body.classList.add("light");
    themeBtn.innerText = "Dark";
  } else {
    document.body.classList.remove("light");
    themeBtn.innerText = "Bright";
  }
}

up();
setInterval(up, 1000);

const weatherTxt = (code) => {
  if (code === 0) {
    return "Clear sky";
  }
  if (code === 1 || code === 2 || code === 3) {
    return "Partly cloudy";
  }
  if (code === 45 || code === 48) {
    return "Foggy";
  }
  if (code >= 51 && code <= 67) {
    return "Rainy";
  }
  if (code >= 71 && code <= 77) {
    return "Snowy";
  }
  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }
  if (code >= 95) {
    return "Thunderstorm";
  }
  return "Cloudy";
};

const showWeather = (lat, lon) => {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&current_weather=true";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const temp = data.current_weather.temperature;
      const code = data.current_weather.weathercode;

      tempEl.innerHTML = temp + "°C";
      descEl.innerHTML = weatherTxt(code);
    })
    .catch(() => {
      descEl.innerHTML = "N/A";
    });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      showWeather(pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      showWeather(18.63, 73.8);
    },
  );
} else {
  showWeather(18.63, 73.8);
}

const quoteEl = document.querySelector("#quoteText");
const quoteBtn = document.querySelector("#quoteBtn");

const quotes = [
  "Start now, greatness comes later.",
  "Small steps build big dreams.",
  "Progress beats perfect every time.",
  "Stay focused, keep moving forward.",
  "Dream big, work harder daily.",
  "Success begins with one step.",
  "Discipline creates lasting success.",
  "Keep going, never look back.",
  "Work hard, stay humble always.",
  "Believe, achieve, repeat every day.",
  "Consistency wins every single time.",
  "Action turns dreams into reality.",
  "Never stop learning and growing.",
  "Today matters more than yesterday.",
  "Your future starts today.",
  "Stay patient, trust the process.",
  "Make today count always.",
  "Hard work changes everything.",
  "One goal, endless possibilities.",
  "Create opportunities, don't wait.",
];

const showQuote = () => {
  const i = Math.floor(Math.random() * quotes.length);
  quoteEl.innerHTML = quotes[i];
};

showQuote();
quoteBtn.addEventListener("click", showQuote);



const pomoTime = document.querySelector("#pomoTime");
const pomoStart = document.querySelector("#pomoStart");
const pomoPause = document.querySelector("#pomoPause");
const pomoReset = document.querySelector("#pomoReset");
const pomoMin = document.querySelector("#pomoMin");
const pomoSetBtn = document.querySelector("#pomoSetBtn");

let pomoLen = 25 * 60;
let pomoSeconds = pomoLen;
let pomoTimer = null;

const updatePomoDisplay = () => {
  let min = Math.floor(pomoSeconds / 60);
  let sec = pomoSeconds % 60;

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  pomoTime.innerHTML = min + ":" + sec;
};

const startPomo = () => {
  if (pomoTimer !== null) {
    return false;
  }

  pomoTimer = setInterval(() => {
    if (pomoSeconds <= 0) {
      clearInterval(pomoTimer);
      pomoTimer = null;
      alert("Pomodoro finished, take a break");
      pomoSeconds = pomoLen;
      updatePomoDisplay();
      return;
    }
    pomoSeconds--;
    updatePomoDisplay();
  }, 1000);
};

const pausePomo = () => {
  clearInterval(pomoTimer);
  pomoTimer = null;
};

const resetPomo = () => {
  clearInterval(pomoTimer);
  pomoTimer = null;
  pomoSeconds = pomoLen;
  updatePomoDisplay();
};

const setPomo = () => {
  if (pomoTimer !== null) {
    return false;
  }

  const m = parseInt(pomoMin.value);

  if (m > 0) {
    pomoLen = m * 60;
    pomoSeconds = pomoLen;
    updatePomoDisplay();
  }
};

pomoStart.addEventListener("click", startPomo);
pomoPause.addEventListener("click", pausePomo);
pomoReset.addEventListener("click", resetPomo);
pomoSetBtn.addEventListener("click", setPomo);

updatePomoDisplay();

const planli = document.querySelector(".planli");

for (let i = 0; i < 24; i++) {
  let li = document.createElement("li");

  let time;

  if (i == 0) {
    time = "12:00 AM";
  } else if (i < 12) {
    time = i + ":00 AM";
  } else if (i == 12) {
    time = "12:00 PM";
  } else {
    time = i - 12 + ":00 PM";
  }

  let span = document.createElement("span");
  span.innerText = time;
  li.appendChild(span);

  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add Note";

  let data = localStorage.getItem("plan" + i);

  if (data != null) {
    input.value = data;
  }

  input.addEventListener("input", function () {
    localStorage.setItem("plan" + i, input.value);
  });

  li.appendChild(input);

  planli.appendChild(li);
}

const themeBtn = document.querySelector(".theme");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.innerText = document.body.classList.contains("light")
    ? "Dark"
    : "Bright";
});
