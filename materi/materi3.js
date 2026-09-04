console.log("===================================");
console.log("MATERI 3 PART 1- DATA MANIPULATION");
console.log("===================================");
// String Manipulation
const namaSultan = "Sri Sultan Hamengku Buwono X";
const namaKecil = namaSultan.toLowerCase();
const namaBesar = namaSultan.toUpperCase();
console.log({ namaSultan });
console.log({ namaKecil, namaBesar });
const gelar = namaSultan.slice(11, 26); // (index awal, index akhir)
const nomorGelar = namaSultan.replace("X", "XII"); // target, timpaan
console.log({ gelar, nomorGelar });
const cekSultan = namaSultan.includes("Sultan");
if (cekSultan) {
    console.log(">> Nama sultan valid")
} else {
    console.log(">> Tidak ditemukan nama sultan!")
}
// Number Manipulation
const hartaSultan = "35000000"; // string angka
const konversiHarta = Number(hartaSultan);
console.log({ hartaSultan, konversiHarta });
const utangSultan = "25000.678"; // string desimal
const konversiUtang = Number(utangSultan);
const konversiUtangDuaKoma = konversiUtang.toFixed(2); // jadi string
console.log({ konversiUtang, konversiUtangDuaKoma });
// Math function untuk perhitungan angka
// round(), floor(), ceil() -> macam teknik pembulatan
const konversiUtangPembulatan = Math.round(konversiUtang);
console.log({ konversiUtangPembulatan });
// Date Manipulation
const saiki = new Date();
console.log({ saiki });
const tahunIni = saiki.getFullYear();
const bulanIni = saiki.getMonth();
const tanggalIni = saiki.getDate();
const hariIni = saiki.getDay();
console.log({ hariIni, tanggalIni, bulanIni, tahunIni });
const hariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const hariIniIndo = hariIndo[hariIni];
console.log({ hariIniIndo });