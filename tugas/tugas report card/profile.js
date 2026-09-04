const students = [
    {
        name: "Ahmad",
        className: "10A",
        scores: [80, 90, 85],
        attendance: 90,
        hasViolation: false
    },
    {
        name: "Budi",
        className: "10B",
        scores: [70, 75, 80],
        attendance: 85,
        hasViolation: false
    },
    {
        name: "Cahyo",
        className: "10A",
        scores: [60, 65, 70],
        attendance: 75,
        hasViolation: true
    }
];

const reportDate = new Date();

console.log("========================================");
console.log("       HSI STUDENT REPORT CARD");
console.log("========================================");
console.log(`Tanggal : ${reportDate.toLocaleString()}
`);


let jumlahLulus = 0;
let jumlahBelumLulus = 0;

let namaNilaiTertinggi = "";
let nilaiTertinggi = 0;


for (let i = 0; i < students.length; i++) {

    const student = students[i];

    // MENGHITUNG TOTAL NILAI

    let total = 0;

    for (let j = 0; j < student.scores.length; j++) {
        total = total + student.scores[j];
    }

    // MENGHITUNG RATA-RATA

    const jumlahNilai = student.scores.length;
    const average = total / jumlahNilai;


    // MENENTUKAN GRADE

    let grade;

    if (average >= 90) {
        grade = "A";
    } else if (average >= 80) {
        grade = "B";
    } else if (average >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }


    // MENENTUKAN STATUS LULUS

    let status;

    if (
        average >= 75 &&
        student.attendance >= 80 &&
        !student.hasViolation
    ) {
        status = "LULUS";
        jumlahLulus = jumlahLulus + 1;
    } else {
        status = "BELUM LULUS";
        jumlahBelumLulus = jumlahBelumLulus + 1;
    }


    // MENCARI NILAI TERTINGGI

    if (average > nilaiTertinggi) {
        nilaiTertinggi = average;
        namaNilaiTertinggi = student.name;
    }

    
    console.log("");
    console.log(`Student #${i + 1}`);
    console.log("----------------------------------------");
    console.log(`Nama        : ${student.name}`);
    console.log(`Kelas       : ${student.className}`);
    console.log(`Nilai       : ${student.scores}`);
    console.log(`Total       : ${total}`);
    console.log(`Rata-rata   : ${average}`);
    console.log(`Grade       : ${grade}`);
    console.log(`Kehadiran   : ${student.attendance}%`);
    console.log(`Pelanggaran : ${student.hasViolation}`);
    console.log(`Status      : ${status}`);
    console.log("----------------------------------------");
}

console.log("");
console.log("========================================");
console.log("              SUMMARY");
console.log("========================================");

console.log(`Jumlah siswa LULUS       : ${jumlahLulus}`);
console.log(`Jumlah siswa BELUM LULUS : ${jumlahBelumLulus}`);
console.log(`Nilai rata-rata tertinggi: ${namaNilaiTertinggi}`);
console.log(`Rata-rata tertinggi      : ${nilaiTertinggi}`);

console.log("========================================");