console.log("======================");
console.log("HSI STUDENT MANAGEMENT");
console.log("======================");

const STORAGE_KEY = "hsiStudents";
const studentList = document.getElementById("studentList");
const totalStudentsEl = document.getElementById("totalStudents");
const averageScoreEl = document.getElementById("averageScore");
const studentForm = document.getElementById("studentForm");

let students = [];
let editingIndex = null;

function loadStudents() {
  const savedStudents = localStorage.getItem(STORAGE_KEY);

  if (!savedStudents) {
    return [
      { nama: "Budi Siregar", score: 90 },
      { nama: "Johar Chan", score: 80 },
    ];
  }

  try {
    const parsed = JSON.parse(savedStudents);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Gagal membaca data siswa dari localStorage:", error);
    return [];
  }
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function updateStats() {
  const total = students.length;
  const average =
    total === 0
      ? 0
      : students.reduce((sum, student) => sum + Number(student.score || 0), 0) /
        total;

  totalStudentsEl.textContent = String(total);
  averageScoreEl.textContent = average.toFixed(1);
}

function renderStudents() {
  if (students.length === 0) {
    studentList.innerHTML = '<div class="empty">📭 Belum ada data siswa.</div>';
    updateStats();
    return;
  }

  studentList.innerHTML = students
    .map(
      (student, index) => `
        <div class="student-item">
          <div class="student-name">
            <span class="student-number">${index + 1}.</span>
            ${student.nama}
          </div>
          <div class="score">${student.score}</div>
          <div class="action-buttons">
            <button class="edit-btn" type="button" data-index="${index}">
              ✏️ Edit
            </button>
            <button class="delete-btn" type="button" data-index="${index}">
              🗑️ Hapus
            </button>
          </div>
        </div>
      `,
    )
    .join("");

  updateStats();
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentNameInput = document.getElementById("studentName");
  const studentScoreInput = document.getElementById("studentScore");
  const nama = studentNameInput.value.trim();
  const score = Number(studentScoreInput.value);

  if (!nama) {
    alert("Nama siswa tidak boleh kosong.");
    studentNameInput.focus();
    return;
  }

  if (Number.isNaN(score) || score < 0 || score > 100) {
    alert("Nilai harus berupa angka antara 0 sampai 100.");
    studentScoreInput.focus();
    return;
  }

  if (editingIndex === null) {
    students.push({ nama, score });
  } else {
    students[editingIndex] = { nama, score };
    editingIndex = null;
    studentForm.querySelector("button[type=submit]").textContent = "➕ Tambah Siswa";
  }

  saveStudents();
  renderStudents();
  studentForm.reset();
  studentNameInput.focus();
});

studentList.addEventListener("click", async (event) => {
  const editButton = event.target.closest(".edit-btn");
  const deleteButton = event.target.closest(".delete-btn");

  if (editButton) {
    const index = Number(editButton.dataset.index);
    const student = students[index];
    const studentNameInput = document.getElementById("studentName");
    const studentScoreInput = document.getElementById("studentScore");

    editingIndex = index;
    studentNameInput.value = student.nama;
    studentScoreInput.value = student.score;
    studentForm.querySelector("button[type=submit]").textContent = "💾 Simpan Perubahan";
    studentNameInput.focus();
    return;
  }

  if (!deleteButton) return;

  const index = Number(deleteButton.dataset.index);
  const student = students[index];

  const result = await Swal.fire({
    title: "Hapus data siswa?",
    text: `Data ${student.nama} tidak dapat dikembalikan setelah dihapus.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1656c1",
    cancelButtonColor: "#c63737",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  students.splice(index, 1);
  if (editingIndex === index) {
    editingIndex = null;
    studentForm.reset();
    studentForm.querySelector("button[type=submit]").textContent = "➕ Tambah Siswa";
  }
  saveStudents();
  renderStudents();

  await Swal.fire({
    title: "Terhapus!",
    text: `Data ${student.nama} berhasil dihapus.`,
    icon: "success",
    confirmButtonColor: "#1656c1",
    confirmButtonText: "Tutup",
  });
});

students = loadStudents();
saveStudents();
renderStudents();
