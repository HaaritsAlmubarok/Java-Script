console.log("Bismillah, Hello World!");
console.log("------------------------");
// membuat komentar per baris
// setiap deklarasi itu diberi titik koma;
let namaStasiun = "St. Kutoarjo"; // string
let nomorGerbong = 4 // integer atau number
let statusKeberangkatan = false // boolean
console.log(namaStasiun) // print value-nya
// debug variable jadi object
console.log({ nomorGerbong, statusKeberangkatan });
// var => mutable = boleh di ubah - VERSI JADUL
// let => mutable = boleh di ubah
// const (Constant) => immutable = gk boleh di ubah
const jumlahKursi = 50; 
nomorGerbong = 6; // ganti nomor gerbong
console.log({ nomorGerbong, jumlahKursi });
// jumlahKursi = 100; kena type error 
// TEMPLATE LITERAL = cara ngeformat string
// versi ribet pke + (plus)
// const infoKereta = "Stasiun: " + namaStasiun + "\n Nomor Gerbong: " + nomorGerbong
// versi lebih clean pakai ` (backtick)
const infoKereta = `いらっしゃいませ
    🚉 Stasiun: ${namaStasiun} 
    #️⃣  Nomor Gerbong: ${nomorGerbong}
    Made with \u2665 
`;
console.log(infoKereta);
let nilaiA = 10;
let nilaiB = 5;
const formulaX = nilaiA + nilaiB; // 10 + 5 = 15
console.log({ nilaiA, nilaiB, formulaX })
nilaiA = "15"; // string 
const formulaZ = nilaiA + nilaiB; // "15" + 5 = "155"
console.log({ nilaiA, nilaiB, formulaZ })
nilaiA = 20; // integer
nilaiB = "30"; // string
const formulaSSS = nilaiB - nilaiA; // "30" - 20 = 10
console.log({ nilaiA, nilaiB, formulaSSS })

// typeof = pengecekan tipe data
const checkNilai = typeof nilaiB; 
console.log({ checkNilai });
if (checkNilai === 'number') {
    console.log('INI BENAR NUMBER BANG!');
} else {
    console.log('INI BUKAN NUMBER WOY!');   
}