console.log();
console.log("=================================");
console.log("Materi 3 Part 2 - Data Processing");
console.log("=================================");

const skills = ["HTML", "CSS", "JavaScript", "Python"];
console.log(skills);

// === Penambahan Data ===

// unshift = menambahkan data ke array di awal
skills.unshift("C++");
console.log(skills);

// push = menambahkan data ke array di akhir
skills.push("Tailwind CSS");
console.log(skills);

// === Penghapusan Data ===

// shift = menghapus data di array di awal
skills.shift();
console.log(skills);

// pop = menghapus data di array di akhir
skills.pop();
console.log(skills, "Balik seperti semula");

// === Mengubah Data ===

// splice = mengubah data di array
skills.splice(1, 1, "React JS");
console.log(skills);

// === Mencari Data ===

// include = mengecek apakah data ada di array
const isExist = skills.includes("CSS");
console.log(isExist ? "Data ada" : "Data tidak ada");
console.log();

// ==== MATERI SEBENARNYA DATA PROCESSING ====

// Mapping = mengubah data di array menjadi data baru

// mengubah duit rupiah menjadi dollar
const myDuitRupiah = [100000, 5500000, 7500000, 300000];
console.log("Duit Rupiah: ");
console.log(myDuitRupiah);
const kursUSD = 17672;
const myDuitDollar = myDuitRupiah.map(
    duitRupiah => {
        const duitDollar = duitRupiah / kursUSD;
        // .toFixed(2) = mengubah format menjadi 2 angka di belakang koma dan mengubah nya menjadi string
        return '$' + duitDollar.toFixed(2);
    }
);
console.log("Duit Dollar: ");
console.log(myDuitDollar);

// Filtering = menyaring data di array menjadi data baru

const filteredDuitRupiah = myDuitRupiah.filter(
    duitRupiah => duitRupiah < 1000000
);
console.log("Duit Rupiah yang Filtered: ");
console.log(filteredDuitRupiah);
console.log();

// akumulasi = mengakumulasi data di array menjadi data baru

const totalDuitRupiah = myDuitRupiah.reduce(
    (accumulator, duitRupiah) => accumulator + duitRupiah,
    0
);
console.log(`Total Duit Rupiah: ${totalDuitRupiah}`);
console.log();


