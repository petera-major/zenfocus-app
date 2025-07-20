let timer;
let isRunning = false;
let currentMinutes = 25;
let currentSeconds = 0;

const timeDisplay = document.getElementById("timeDisplay");
const focusInput = document.getElementById("focusTime");
const breakInput = document.getElementById("breakTime");
const startBtn = document.getElementById("startTimer");
const resetBtn = document.getElementById("resetTimer");

function updateDisplay(min, sec) {
  timeDisplay.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  let totalSecs = parseInt(focusInput.value) * 60;

  timer = setInterval(() => {
    let min = Math.floor(totalSecs / 60);
    let sec = totalSecs % 60;
    updateDisplay(min, sec);

    if (totalSecs <= 0) {
      clearInterval(timer);
      isRunning = false;
      playEndSound();
    } else {
      totalSecs--;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  updateDisplay(parseInt(focusInput.value), 0);
}

function playEndSound() {
  const ding = new Audio('../assets/sounds/alarm.mp3'); 
  ding.play();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

//change backgrounds
const bgVideo = document.getElementById("bgVideo");
const videoSelector = document.getElementById("videoSelector");

videoSelector.addEventListener("change", () => {
  const selected = videoSelector.value;
  bgVideo.src = `../assets/videos/${selected}.mp4`;
  bgVideo.load();
  bgVideo.play();
});

//music
const musicSelector = document.getElementById("musicSelector");
const audioPlayer = document.getElementById("audioPlayer");

musicSelector.addEventListener("change", () => {
  const selected = musicSelector.value;
  audioPlayer.src = `../assets/sounds/${selected}.mp3`;
  audioPlayer.play();
});

//theme switching
const themeSelector = document.getElementById("themeSelector");
const themeLink = document.getElementById("theme");

themeSelector.addEventListener("change", () => {
    const selected = themeSelector.value;
    const overlay = document.getElementById("themeOverlay");
  
    if (selected === "warm") overlay.style.background = "rgba(255, 170, 120, 0.1)";
    if (selected === "cool") overlay.style.background = "rgba(120, 200, 255, 0.1)";
    if (selected === "violet") overlay.style.background = "rgba(170, 120, 255, 0.1)";
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    const remote = require("@electron/remote");
    const exitModal = document.getElementById("exitModal");
    const confirmExit = document.getElementById("confirmExit");
    const cancelExit = document.getElementById("cancelExit");
    const exitBtn = document.getElementById("exitBtn");
  
    function showExitModal() {
      exitModal.classList.remove("hidden");
    }
  
    function hideExitModal() {
      exitModal.classList.add("hidden");
    }
  
    function exitApp() {
      remote.getCurrentWindow().close();
    }
  
    if (exitBtn) {
      exitBtn.addEventListener("click", showExitModal);
    }
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        showExitModal();
      }
    });
  
    confirmExit.addEventListener("click", exitApp);
    cancelExit.addEventListener("click", hideExitModal);
  });  

const openNotes = document.getElementById("openNotes");
const closeNotes = document.getElementById("closeNotes");
const notesPanel = document.getElementById("notesPanel");
const notesArea = document.getElementById("notes");
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const clearBtn = document.getElementById("clearTodos");

openNotes.addEventListener("click", () => {
  notesPanel.classList.remove("hidden");
});

closeNotes.addEventListener("click", () => {
  notesPanel.classList.add("hidden");
  localStorage.setItem("deskzen-notes", notesArea.value);
});

window.addEventListener("DOMContentLoaded", () => {
  notesArea.value = localStorage.getItem("deskzen-notes") || "";
});

function saveTodos() {
    const tasks = [];
    document.querySelectorAll("#todoList li").forEach((li) => {
      tasks.push({
        text: li.querySelector("label").textContent,
        checked: li.querySelector("input").checked,
      });
    });
    localStorage.setItem("deskzen-todos", JSON.stringify(tasks));
  }
  
  function deleteTodo(li) {
    li.remove();
    saveTodos();
  }
  
  function createTodoItem(text, checked = false) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""} />
      <label>${text}</label>
      <button class="delete-btn">🗑️</button>
    `;
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", saveTodos);
    const delBtn = li.querySelector(".delete-btn");
    delBtn.addEventListener("click", () => deleteTodo(li));
    return li;
  }
  
  function renderTodos() {
    todoList.innerHTML = "";
    const stored = JSON.parse(localStorage.getItem("deskzen-todos") || "[]");
    stored.forEach(({ text, checked }) => {
      const li = createTodoItem(text, checked);
      todoList.appendChild(li);
    });
  }
  
  addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (!text) return;
    const li = createTodoItem(text);
    todoList.appendChild(li);
    todoInput.value = "";
    saveTodos();
  });
  
  clearBtn.addEventListener("click", () => {
    todoList.innerHTML = "";
    localStorage.removeItem("deskzen-todos");
  });  
  
  renderTodos();

const quoteEl = document.getElementById("quote");

const quotes = [
  "Breathe in. Focus out.",
  "Discipline is a form of self-love.",
  "Your future self is watching.",
  "You don’t have to be perfect, just consistent.",
  "Progress, not pressure.",
  "One focus session at a time."
];

function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = `"${quotes[random]}"`;
}

showQuote();
setInterval(showQuote, 90000);

function startWaterReminder() {
    const waterSound = new Audio("../assets/sounds/water.mp3");
  
    const remind = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const shouldRemind =
        minutes % 10 === 0 || minutes % 45 === 0; 
  
      if (shouldRemind) {
        showHydrationNotification();
        waterSound.play();
      }
    };
  
    setInterval(remind, 60000); 
  }
  
  function showHydrationNotification() {
    const notification = document.createElement("div");
    notification.className = "water-popup";
    notification.innerHTML = "Dont forget to hydrate!";
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  startWaterReminder();
  
