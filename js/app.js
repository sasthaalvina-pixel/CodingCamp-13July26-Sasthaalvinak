/* ========================================
   LIFE DASHBOARD — app.js
   Vanilla JS only | Local Storage
   Features: Greeting, Focus Timer, To-Do, Quick Links
   Challenges: Light/Dark Mode, Custom Name, Prevent Duplicate
   ======================================== */

// ============================================================
// 1. THEME — Light / Dark Mode  (Challenge ✅)
// ============================================================
const themeToggleBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem('ld_theme') || 'light';
  applyTheme(saved);
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ld_theme', next);
  applyTheme(next);
});

// ============================================================
// 2. GREETING — Clock, Date, Greeting, Custom Name  (Challenge ✅)
// ============================================================
const clockEl       = document.getElementById('clock');
const dateEl        = document.getElementById('dateDisplay');
const greetingEl    = document.getElementById('greetingText');
const nameDisplay   = document.getElementById('nameDisplay');
const editNameBtn   = document.getElementById('editNameBtn');
const nameForm      = document.getElementById('nameForm');
const nameInput     = document.getElementById('nameInput');
const saveNameBtn   = document.getElementById('saveNameBtn');

function pad(n) { return String(n).padStart(2, '0'); }

function getGreeting(hour) {
  if (hour >= 0  && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function updateClock() {
  const now  = new Date();
  const h    = pad(now.getHours());
  const m    = pad(now.getMinutes());
  const s    = pad(now.getSeconds());
  clockEl.textContent = `${h}:${m}:${s}`;

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const name = localStorage.getItem('ld_name') || '';
  greetingEl.textContent = name
    ? `${getGreeting(now.getHours())}, ${name}! 👋`
    : `${getGreeting(now.getHours())}! 👋`;
}

function initName() {
  const saved = localStorage.getItem('ld_name') || '';
  nameDisplay.textContent = saved ? `Hi, ${saved}` : 'Set your name →';
  nameInput.value = saved;
}

editNameBtn.addEventListener('click', () => {
  nameForm.classList.toggle('hidden');
  if (!nameForm.classList.contains('hidden')) nameInput.focus();
});

saveNameBtn.addEventListener('click', saveName);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveName(); });

function saveName() {
  const val = nameInput.value.trim();
  localStorage.setItem('ld_name', val);
  nameDisplay.textContent = val ? `Hi, ${val}` : 'Set your name →';
  nameForm.classList.add('hidden');
  updateClock();
}

// ============================================================
// 3. FOCUS TIMER — Start / Stop / Reset + Set Duration
// ============================================================
const timerDisplay  = document.getElementById('timerDisplay');
const startBtn      = document.getElementById('startBtn');
const stopBtn       = document.getElementById('stopBtn');
const resetBtn      = document.getElementById('resetBtn');
const timerMinutes  = document.getElementById('timerMinutes');
const applyTimerBtn = document.getElementById('applyTimerBtn');

let timerDuration = parseInt(localStorage.getItem('ld_timer_duration') || '25', 10);
let timeLeft      = timerDuration * 60;
let timerInterval = null;
let timerRunning  = false;

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${pad(m)}:${pad(s)}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  startBtn.disabled = true;
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      startBtn.disabled = false;
      timerDisplay.textContent = '00:00';
      alert('⏰ Focus session complete! Time for a break.');
      return;
    }
    timeLeft--;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  startBtn.disabled = false;
}

function resetTimer() {
  stopTimer();
  timeLeft = timerDuration * 60;
  renderTimer();
}

applyTimerBtn.addEventListener('click', () => {
  const val = parseInt(timerMinutes.value, 10);
  if (isNaN(val) || val < 1 || val > 99) {
    alert('Please enter a valid duration (1–99 minutes).');
    return;
  }
  timerDuration = val;
  localStorage.setItem('ld_timer_duration', val);
  resetTimer();
});

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function initTimer() {
  const saved = parseInt(localStorage.getItem('ld_timer_duration') || '25', 10);
  timerDuration = saved;
  timerMinutes.value = saved;
  timeLeft = saved * 60;
  renderTimer();
}

// ============================================================
// 4. TO-DO LIST — Add / Edit / Done / Delete + Local Storage
//                 + Prevent Duplicate  (Challenge ✅)
// ============================================================
const taskInput    = document.getElementById('taskInput');
const addTaskBtn   = document.getElementById('addTaskBtn');
const taskList     = document.getElementById('taskList');
const duplicateMsg = document.getElementById('duplicateMsg');
const emptyMsg     = document.getElementById('emptyMsg');

const filterAll    = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterDone   = document.getElementById('filterDone');

let currentFilter = 'all';

function updateFilterButtons() {
  [filterAll, filterActive, filterDone].forEach(btn => btn.classList.remove('active'));
  if (currentFilter === 'all') filterAll.classList.add('active');
  if (currentFilter === 'active') filterActive.classList.add('active');
  if (currentFilter === 'done') filterDone.classList.add('active');
}

filterAll.addEventListener('click', () => { currentFilter = 'all'; updateFilterButtons(); renderTasks(); });
filterActive.addEventListener('click', () => { currentFilter = 'active'; updateFilterButtons(); renderTasks(); });
filterDone.addEventListener('click', () => { currentFilter = 'done'; updateFilterButtons(); renderTasks(); });

function getTasks() {
  return JSON.parse(localStorage.getItem('ld_tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('ld_tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';

  let displayTasks = tasks.map((task, index) => ({ task, index }));

  // 1. Filter
  if (currentFilter === 'active') {
    displayTasks = displayTasks.filter(item => !item.task.done);
  } else if (currentFilter === 'done') {
    displayTasks = displayTasks.filter(item => item.task.done);
  }

  // 2. Sort: Active on top, Done at bottom
  displayTasks.sort((a, b) => {
    if (a.task.done === b.task.done) return 0;
    return a.task.done ? 1 : -1;
  });

  if (displayTasks.length === 0) {
    emptyMsg.classList.remove('hidden');
    return;
  }
  emptyMsg.classList.add('hidden');

  displayTasks.forEach((item) => {
    const { task, index } = item;
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.index = index;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleDone(index));

    // Task text span
    const span = document.createElement('span');
    span.className = 'task-text' + (task.done ? ' done' : '');
    span.textContent = task.text;

    // Edit input (hidden by default)
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task-edit-input hidden';
    editInput.value = task.text;

    // Actions container
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-edit';
    editBtn.textContent = '✏️';
    editBtn.title = 'Edit task';
    editBtn.addEventListener('click', () => {
      const isEditing = !editInput.classList.contains('hidden');
      if (isEditing) {
        // Save edit
        const newText = editInput.value.trim();
        if (!newText) return;

        // Prevent duplicate on edit
        const tasks = getTasks();
        const isDuplicate = tasks.some(
          (t, i) => i !== index && t.text.toLowerCase() === newText.toLowerCase()
        );
        if (isDuplicate) {
          alert('⚠️ A task with this name already exists!');
          return;
        }
        tasks[index].text = newText;
        saveTasks(tasks);
        renderTasks();
      } else {
        // Enter edit mode
        span.classList.add('hidden');
        editInput.classList.remove('hidden');
        editInput.focus();
        editBtn.textContent = '💾';
        editBtn.title = 'Save edit';
      }
    });

    // Save on Enter key
    editInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') editBtn.click();
      if (e.key === 'Escape') {
        editInput.classList.add('hidden');
        span.classList.remove('hidden');
        editBtn.textContent = '✏️';
      }
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTask(index));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editInput);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const tasks = getTasks();

  // Challenge: Prevent Duplicate ✅
  const isDuplicate = tasks.some(t => t.text.toLowerCase() === text.toLowerCase());
  if (isDuplicate) {
    duplicateMsg.classList.remove('hidden');
    setTimeout(() => duplicateMsg.classList.add('hidden'), 2500);
    return;
  }

  duplicateMsg.classList.add('hidden');
  tasks.push({ text, done: false });
  saveTasks(tasks);
  taskInput.value = '';
  renderTasks();
}

function toggleDone(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

// ============================================================
// 5. QUICK LINKS — Add / Open / Delete + Local Storage
// ============================================================
const linkNameInput  = document.getElementById('linkName');
const linkUrlInput   = document.getElementById('linkUrl');
const addLinkBtn     = document.getElementById('addLinkBtn');
const linksList      = document.getElementById('linksList');
const emptyLinksMsg  = document.getElementById('emptyLinksMsg');

function getLinks() {
  return JSON.parse(localStorage.getItem('ld_links') || '[]');
}

function saveLinks(links) {
  localStorage.setItem('ld_links', JSON.stringify(links));
}

function renderLinks() {
  const links = getLinks();
  linksList.innerHTML = '';

  if (links.length === 0) {
    emptyLinksMsg.classList.remove('hidden');
    return;
  }
  emptyLinksMsg.classList.add('hidden');

  links.forEach((link, index) => {
    // Chip anchor
    const chip = document.createElement('a');
    chip.className = 'link-chip';
    chip.href = link.url;
    chip.target = '_blank';
    chip.rel = 'noopener noreferrer';
    chip.title = link.url;

    const labelSpan = document.createElement('span');
    labelSpan.textContent = link.name;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'link-chip-remove';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove link';
    removeBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      deleteLink(index);
    });

    chip.appendChild(labelSpan);
    chip.appendChild(removeBtn);
    linksList.appendChild(chip);
  });
}

function addLink() {
  const name = linkNameInput.value.trim();
  let   url  = linkUrlInput.value.trim();

  if (!name || !url) {
    alert('Please fill in both the link name and URL.');
    return;
  }

  // Auto-prepend https:// if missing
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  const links = getLinks();
  links.push({ name, url });
  saveLinks(links);
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  renderLinks();
}

function deleteLink(index) {
  const links = getLinks();
  links.splice(index, 1);
  saveLinks(links);
  renderLinks();
}

addLinkBtn.addEventListener('click', addLink);
linkUrlInput.addEventListener('keydown', e => { if (e.key === 'Enter') addLink(); });

// ============================================================
// INIT — Run everything on page load
// ============================================================
function init() {
  initTheme();
  initName();
  initTimer();
  updateClock();
  setInterval(updateClock, 1000);
  renderTasks();
  renderLinks();
}

init();
