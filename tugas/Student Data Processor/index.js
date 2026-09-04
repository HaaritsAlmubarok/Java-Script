// ========================================
// Student Data Processor
// Nama   : Haarits Abdur Rohman Al Mubarok
// Kelas  : XI Rombel 2 Mr Tsabit
// ========================================

console.log("======================");
console.log("Student Data Processor");
console.log("======================");
console.log();

const studentName = "  aHmAd fAuZaN  ";
const ageText = "17 tahun";
const scoreText = "85.678";
const registrationText = "21-08-2026";


// Part 1
// Cleaning and formatting the student name

const cleanName = studentName
  .trim()
  .toLowerCase()
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

console.log(`👤 Original Name    : "${studentName}"`);
console.log(`🧹 Clean Name       : ${cleanName}`);
console.log("      ↓");


// Generating a username

const username = cleanName
    .split(" ")
    .join(".")
    .toLowerCase();

console.log(`🔑 Username         : ${username}`);
console.log("      ↓");


// Part 2
// Analyzing the name

const containsAhmad = cleanName.includes("Ahmad"); // cek
const firstName = cleanName.slice(0, 5);            // ambil karakter
const newName = cleanName.replace("Ahmad", "Budi"); // ganti

console.log(`🔍 Contains "Ahmad" : ${containsAhmad}`);
console.log(`👤 First Name       : ${firstName}`);
console.log(`🔄 Replace Name     : ${newName}`);
console.log("      ↓");


// part 3
// Processing the age

const age = parseInt(ageText); // convert string to number

console.log(`🎂 Age Text         : "${ageText}"`);
console.log(`🎂 Age              : ${age}`);
console.log("      ↓");


// === BONUS ===
// Birth year

const currentYear = new Date().getFullYear();
const birthYear = currentYear - age;
console.log(`📅 Current Year     : ${currentYear}`);
console.log(`🎂 Age              : ${age}`);
console.log(`📅 Birth Year       : ${birthYear}`);
console.log("      ↓");


// part 4
// Processing the score

const score = parseFloat(scoreText); // convert string to float
const formatedScore = score.toFixed(2); // format to 2 decimal places
const roundedScore = Math.round(score); // round to nearest integer
const flooredScore = Math.floor(score); // round down to nearest integer
const ceiledScore = Math.ceil(score); // round up to nearest integer

console.log(`📊 Score Text       : "${scoreText}"`);
console.log(`📊 Score            : ${score}`);
console.log(`🎯 Formatted Score  : ${formatedScore}`);
console.log(`🎲 Rounded Score    : ${roundedScore}`);
console.log(`🔻 Floored Score    : ${flooredScore}`);
console.log(`🔺 Ceiled Score     : ${ceiledScore}`);
console.log("      ↓");


// part 5
// Determine the Grade

let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "E";
}

console.log(`🏆 Grade            : ${grade}`);
console.log("      ↓");


// part 6
// Processing the registration date

const registrationDate = new Date(registrationText.split("-").reverse().join("-")); // convert string to date
const formattedDate = registrationDate.toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});


console.log("📅 Registration Date");
console.log(`Day       : ${registrationDate.getDate()}`);
console.log(`Month     : ${registrationDate.getMonth() + 1}`);
console.log(`Year      : ${registrationDate.getFullYear()}
`);
console.log(`Formatted : ${formattedDate}`);
console.log("      ↓");


// part 7
// Current Date & Time

const currentDate = new Date();
const formattedCurrentDate = currentDate.toLocaleDateString("id-ID", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
});

console.log("🕐 Current Date & Time");
console.log(`Year      : ${currentDate.getFullYear()}`);
console.log(`Month     : ${currentDate.getMonth() + 1}`);
console.log(`Date      : ${currentDate.getDate()}`);
console.log(`Day       : ${currentDate.getDay()}`);
console.log(`Hour      : ${currentDate.getHours()}`);
console.log(`Minute    : ${currentDate.getMinutes()}`);
console.log(`Formatted : ${formattedCurrentDate}`);
console.log("      ↓");        


// part 8
// Create Date Formatter

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
}
 
const now = new Date();
console.log(`📅 Report Date : ${formatDate(now)}`);
console.log("      ↓");


// part 9
// Lucky Dice

const dice = Math.floor(Math.random() * 6) + 1;
console.log(`🎲 Lucky Dice       : ${dice}`);
let luckyMessage;
if (dice === 6) {
  luckyMessage = "🎉 Congratulations! You rolled a 6!";
}else if (dice >= 2 && dice <= 5) {
  luckyMessage = "🙂 Not bad! You rolled a " + dice + ".";
}else {
  luckyMessage = "😢 Better luck next time! You rolled a 1.";
}
console.log(luckyMessage);