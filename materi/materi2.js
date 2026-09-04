// operator perbandingan
const umurUjang = 19; // integer
const umurAsep = "19"; // string
//  == : membandingkan data tidak dengan tipe nya
//  === : membandingkan data dengan tipe nya juga
const cekUmur = umurUjang === umurAsep;
console.log({ cekUmur }); 
// cek umnurnya sama nggak
if (cekUmur) {
    console.log('Umur ujang dan asep samaan'); 
} else {
    console.log('Umur nya beda!'); 
}
// > : lebih dari, < : kurang, != : tidak sama dengan
const umurSumanto = 23; // integer
if (umurSumanto > umurUjang) {
    console.log('Sumanto tuaan yak..'); 
} else {
    console.log('Sumanto masih mudaan lur...'); 
}

// tidak sama dengan != dan !== berbeda
const umurCahyono = "23"; // string
if (umurSumanto !== umurCahyono) {
    console.log("Umur mereka beda...")
} else {
    console.log("Umur mereka samaan...")
}

console.log('===============================');

// ARRAY = list data dalam 1 variabel, dimulai dari i 0
const daftarKereta = ["Bengawan", "Prameks", "Logawa", "Sinkansen"];
console.log(daftarKereta); // tampil semua array items
console.log(daftarKereta[0]); // data ke 1
console.log(daftarKereta[1]); // data ke 2
console.log(daftarKereta[2]); // data ke 3
console.log(daftarKereta[3]); // data ke 4

console.log('===============================');

// Looping atau Perulang => For...
// for (let i = 5; i >= 1; i--) {
for (let i = 1; i <= 5; i++) {
    console.log(`Halo Kak ke-${i}`);
}
console.log('===============================');

// cek jumlah data dengan fungsi `.length` (bawaan array)
const jumlahKereta = daftarKereta.length;
console.log({ jumlahKereta });
for (let x = 0; x < jumlahKereta; x++) {
    const namaKereta = daftarKereta[x];
    console.log(`Kereta ${namaKereta}`);
}
console.log('===============================');

// Object di JS, mirip Array tapi ada nama key nya
const profilSantri = {
    nama: "Uchiha Sutoro",
    kelas: 11,
    status: true,
    asrama: "Ibnu Kholdun",
    alamat: {
        detail: "Jl. Krajan RT 002 RW 008 No. 77",
    }
};
console.log(profilSantri);

console.log('INFO SANTRI');
console.log('---------------');
console.log(`Nama Lengkap: ${profilSantri.nama}`);
console.log(`Kelas: ${profilSantri.kelas}`);
console.log(`Asrama: ${profilSantri.asrama}`);
console.log(`Status Aktif: ${profilSantri.status}`);
console.log(`Alamat Lengkap: ${profilSantri.alamat.detail}`);

console.log('===============================');
// Date = fitur object pengolahan waktu
const tanggalBaru = new Date();
console.log({ tanggalBaru });
console.log(tanggalBaru.toString());
console.log(tanggalBaru.toLocaleString());