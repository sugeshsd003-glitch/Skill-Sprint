// ========================
// SETTINGS PANEL
// ========================

const menuBtn =
document.getElementById("menuBtn");

const settingsPanel =
document.getElementById("settingsPanel");

menuBtn.addEventListener("click",()=>{

if(settingsPanel.style.display==="block"){

settingsPanel.style.display="none";

}else{
// ========================
// TODAY I LEARNED
// ========================

const learnInput =
document.getElementById(
"learnInput"
);

const saveLearnBtn =
document.getElementById(
"saveLearnBtn"
);

const learnTimeline =
document.getElementById(
"learnTimeline"
);

function saveLearnEntry(){

const text =
learnInput.value.trim();

if(text==="") return;

const entry = {

date:
new Date()
.toLocaleDateString(),

time:
new Date()
.toLocaleTimeString(),

text:text

};

learnEntries.push(
entry
);

localStorage.setItem(
"learnEntries",
JSON.stringify(
learnEntries
)
);

learnInput.value="";

renderLearnTimeline();

updateLearningStats();

showToast(
"Learning Saved"
);

}

saveLearnBtn.addEventListener(
"click",
saveLearnEntry
);

// ========================
// TIMELINE
// ========================

function renderLearnTimeline(){

learnTimeline.innerHTML="";

const reversed =

[...learnEntries]
.reverse();

reversed.forEach(item=>{

const div =
document.createElement(
"div"
);

div.className =
"timeline-item";

div.innerHTML = `

<div class="timeline-date">

${item.date}
•
${item.time}

</div>

<div>

${item.text}

</div>

`;

learnTimeline.appendChild(
div
);

});

}

// ========================
// LEARNING STATS
// ========================

function updateLearningStats(){

learnCount.textContent =
learnEntries.length;

if(
learnEntries.length >= 1
){

unlockAchievement(
"First Learning Entry"
);

}

if(
learnEntries.length >= 5
){

unlockAchievement(
"Knowledge Builder"
);

}

if(
learnEntries.length >= 25
){

unlockAchievement(
"Lifelong Learner"
);

}

if(
learnEntries.length >= 100
){

unlockAchievement(
"Scholar"
);

}

}

// ========================
// DASHBOARD QUOTE
// ========================

const quotes = [

"Discipline beats motivation.",

"Small progress is still progress.",

"Focus creates excellence.",

"Consistency builds mastery.",

"Growth begins outside comfort zones.",

"Every day is a chance to improve.",

"Deep work creates remarkable results."

];

function setDailyQuote(){

const quoteIndex =

new Date().getDate()
%
quotes.length;

const quote =

quotes[quoteIndex];

const hero =
document.querySelector(
".hero"
);

hero.innerHTML += `

<div
class="daily-quote"
>

"${quote}"

</div>

`;

}

setDailyQuote();

// ========================
// LOAD
// ========================

renderLearnTimeline();

updateLearningStats();

settingsPanel.style.display="block";

}

});

// ========================
// STORAGE
// ========================

let goals =
JSON.parse(
localStorage.getItem("goals")
) || [];

let learnEntries =
JSON.parse(
localStorage.getItem("learnEntries")
) || [];

// ========================
// ELEMENTS
// ========================

const goalInput =
document.getElementById("goalInput");

const addGoalBtn =
document.getElementById("addGoalBtn");

const goalList =
document.getElementById("goalList");

const goalCount =
document.getElementById("goalCount");

const learnCount =
document.getElementById("learnCount");

const streakCount =
document.getElementById("streakCount");

// ========================
// GOAL TRACKER
// ========================

function saveGoals(){

localStorage.setItem(
"goals",
JSON.stringify(goals)
);

}

function renderGoals(){

goalList.innerHTML="";

goals.forEach((goal,index)=>{

const div =
document.createElement("div");

div.className =
"goal-item";

div.innerHTML = `

<span>${goal.text}</span>

<div>

<button
onclick="completeGoal(${index})"
>
✓
</button>

<button
onclick="deleteGoal(${index})"
>
✕
</button>

</div>

`;

goalList.appendChild(div);

});

goalCount.textContent =
goals.length;

}

function addGoal(){

const text =
goalInput.value.trim();

if(text==="") return;

goals.push({

text:text,

completed:false

});

saveGoals();

renderGoals();

goalInput.value="";

}

function deleteGoal(index){

goals.splice(index,1);

saveGoals();

renderGoals();

}

function completeGoal(index){

goals[index].completed=true;

goals.splice(index,1);

saveGoals();

renderGoals();

unlockAchievement(
"First Goal Completed"
);

}

addGoalBtn.addEventListener(
"click",
addGoal
);

// ========================
// STREAK
// ========================

function updateStreak(){

let lastVisit =
localStorage.getItem(
"lastVisit"
);

let streak =
parseInt(
localStorage.getItem(
"streak"
)
) || 1;

const today =
new Date()
.toDateString();

if(lastVisit){

const previous =
new Date(lastVisit);

const current =
new Date(today);

const difference =
Math.floor(
(current-previous)
/
(1000*60*60*24)
);

if(difference===1){

streak++;

}

if(difference>1){

streak=1;

}

}

localStorage.setItem(
"lastVisit",
today
);

localStorage.setItem(
"streak",
streak
);

streakCount.textContent =
streak;

}

updateStreak();

// ========================
// LEARNING COUNT
// ========================

learnCount.textContent =
learnEntries.length;

// ========================
// ACHIEVEMENTS
// ========================

let achievements =

JSON.parse(
localStorage.getItem(
"achievements"
)
) || [];

function unlockAchievement(name){

if(
!achievements.includes(name)
){

achievements.push(name);

localStorage.setItem(
"achievements",
JSON.stringify(
achievements
)
);

renderAchievements();

}

}

function renderAchievements(){

const container =
document.getElementById(
"achievementList"
);

container.innerHTML="";

if(
achievements.length===0
){

container.innerHTML=`

<div class="achievement">

No achievements unlocked yet.

</div>

`;

return;

}

achievements.forEach(item=>{

container.innerHTML+=`

<div class="achievement">

🏆 ${item}

</div>

`;

});

}

renderAchievements();

// ========================
// INITIAL LOAD
// ========================

renderGoals();
// ========================
// POMODORO TIMER
// ========================

const timerDisplay =
document.getElementById(
"timerDisplay"
);

const startBtn =
document.getElementById(
"startBtn"
);

const pauseBtn =
document.getElementById(
"pauseBtn"
);

const resetBtn =
document.getElementById(
"resetBtn"
);

const sessionCount =
document.getElementById(
"sessionCount"
);

const timerRing =
document.querySelector(
".timer-ring"
);

// ========================
// CONFIG
// ========================

const DEFAULT_TIME = 25 * 60;

let timeLeft = DEFAULT_TIME;

let timerRunning = false;

let timerInterval = null;

// ========================
// SESSION STORAGE
// ========================

let sessions =

parseInt(
localStorage.getItem(
"focusSessions"
)
) || 0;

sessionCount.textContent =
sessions;

// ========================
// DISPLAY
// ========================

function updateTimerDisplay(){

const minutes =
Math.floor(
timeLeft / 60
);

const seconds =
timeLeft % 60;

timerDisplay.textContent =

`${String(minutes)
.padStart(2,"0")}:${String(seconds)
.padStart(2,"0")}`;

updateRing();

}

// ========================
// RING ANIMATION
// ========================

function updateRing(){

const total =
DEFAULT_TIME;

const progress =

(total - timeLeft)
/
total;

const degrees =
progress * 360;

timerRing.style.background =

`conic-gradient(
#3b82f6 0deg,
#60a5fa ${degrees}deg,
#1e293b ${degrees}deg
)`;

}

// ========================
// START
// ========================

function startTimer(){

if(timerRunning)
return;

timerRunning = true;

timerInterval =
setInterval(()=>{

timeLeft--;

updateTimerDisplay();

if(timeLeft <= 0){

completeSession();

}

},1000);

}

// ========================
// PAUSE
// ========================

function pauseTimer(){

timerRunning = false;

clearInterval(
timerInterval
);

}

// ========================
// RESET
// ========================

function resetTimer(){

pauseTimer();

timeLeft =
DEFAULT_TIME;

updateTimerDisplay();

}

// ========================
// COMPLETE
// ========================

function completeSession(){

pauseTimer();

sessions++;

localStorage.setItem(
"focusSessions",
sessions
);

sessionCount.textContent =
sessions;

// Achievement unlocks

if(sessions >= 1){

unlockAchievement(
"First Focus Session"
);

}

if(sessions >= 5){

unlockAchievement(
"Focus Beginner"
);

}

if(sessions >= 25){

unlockAchievement(
"Focus Warrior"
);

}

if(sessions >= 100){

unlockAchievement(
"Deep Work Master"
);

}

// Notification

showToast(
"Focus Session Complete!"
);

// Reset

timeLeft =
DEFAULT_TIME;

updateTimerDisplay();

}

// ========================
// BUTTONS
// ========================

startBtn.addEventListener(
"click",
startTimer
);

pauseBtn.addEventListener(
"click",
pauseTimer
);

resetBtn.addEventListener(
"click",
resetTimer
);

// ========================
// TOAST
// ========================

function showToast(message){

let toast =
document.createElement(
"div"
);

toast.className =
"toast";

toast.innerText =
message;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.classList.add(
"show"
);

},100);

setTimeout(()=>{

toast.classList.remove(
"show"
);

setTimeout(()=>{

toast.remove();

},500);

},3000);

}

// ========================
// LOAD
// ========================

updateTimerDisplay();