console.log('Bismillah, Hello World!');
const fullName = 'Muhammad Hadi'; //  camelCase
console.log(fullName);
// const = variabel yg tidak bisa diubah
// let = variabel yg bisa diubah
let firstName = 'Bagus';
firstName = 'Abdullah';
firstName = 10000; // number
console.log(firstName);
const attendStatus = true;
console.log(attendStatus);
// OPERATOR ARITMETIC
const totalScoreA = 10 + 20;
const accumulatedScoreA = totalScoreA * 10;
let randomScore = 50;
const newScore = randomScore + 10;
randomScore += 10; // randomScore = randomScore + 10
randomScore *= 20; // randomScore = randomScore * 10
console.log({ totalScoreA, accumulatedScoreA, newScore, randomScore });

let helloMessage = "Welcome Team...";
let newMessage = helloMessage + " to the Galaxy";
helloMessage += " to the World of Code!";
newMessage += " Skuy!";
console.log({ newMessage, helloMessage });
// OPERATOR PERBANDINGAN (cek nilai boolean)
const ujangAge = 17;
const bagusAge = "17"; // ujicoba ke string
const isUjangOlder = ujangAge > bagusAge;
if (isUjangOlder) {
  console.log('Ujang is older than Bagus');
} else {
  console.log('Ujang is younger than Bagus');
}
// perbedaan == dan === (untuk cek tipe data)
// != ATAU !== (tidak sama dengan)
const isEqualAge = ujangAge === bagusAge;
const isNotEqualAge = ujangAge !== bagusAge;
console.log({ isEqualAge, isNotEqualAge });

// OPERATOR LOGICAL
const ageStatus = ujangAge > 13;
const raportStatus = 90;
const marriedStatus = "duda";
if (ageStatus && raportStatus > 60 && marriedStatus === "lajang") {
  console.log('Lolos berkas');
} else {
  console.log('Tidak lolos berkas');
}
const isOlyimpiad = false;
if (isOlyimpiad || raportStatus > 95) {
  console.log('Boleh lolos unggulan lah');
} else {
  console.log('Tidak lolos unggulan lah');
}


console.log('=== FOR LOOP ===');
// 3 srtuktur for (index awal, syarat, langkah) {...}
for (let i = 0; i <= 10; i++) {
  console.log('Perulangan ke-', i);
}
console.log('----');
// negative loop
for (let i = 10; i >= 0; i--) {
  console.log('Perulangan ke-', i);
}
console.log('----');

const students = ['Ujang', 'Bagus', 'Hadi', 'Abdullah'];
// manual akses data lewat index
console.log(students[0]);
console.log(students[1]);
console.log(students[2]);
console.log(students[3]);
console.log('----');
const totalStudents = students.length;
// length = menghitung jumlah data array
for (let i = 0; i < totalStudents; i++) {
  console.log(`Student ke-${i} adalah ${students[i]}`);
}
console.log('----');
console.log('=== RECIPES LOOP ===');
const recipes = [
  { name: 'Nasi Goreng', ingredients: ['Nasi', 'Telur', 'Kecap', 'Bawang Putih', 'Bawang Merah'], },
  { name: 'Mie Goreng', ingredients: ['Mie', 'Telur', 'Kecap', 'Bawang Putih', 'Bawang Merah'], },
  { name: 'Ayam Goreng', ingredients: ['Ayam', 'Bawang Putih', 'Bawang Merah', 'Garam'], },
];
for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];// 1 objek resep per index
  // langsung pake index juga bisa => recipes[i].name;
  console.log(`=== Resep ${recipe.name} ===`);
  console.log('Bahan-bahan:');
  for (let j = 0; j < recipe.ingredients.length; j++) {
    console.log(`- ${recipe.ingredients[j]}`);
  }
  console.log('-------------------------');
}