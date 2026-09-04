console.log('>>>> JS EVENT FORMS <<<<')
const nameInput = document.getElementById('nameInput');
const nameInfo = document.getElementById('nameInfo');
// konten area preview
const previewName = document.getElementById('previewName');
const previewClass = document.getElementById('previewClass');
const previewStatus = document.getElementById('previewStatus');
const previewInterest = document.getElementById('previewInterest');
const previewReason = document.getElementById('previewReason');
const messege = document.getElementById('messege');

console.log(nameInput);
nameInput.addEventListener('input', function(){
    const name = nameInput.value;
    console.log(`User mengimput nama: ${name}`);
    nameInfo.textContent = `👋Halo, ${name}`;
    previewName.textContent = name;
});

const classSelect = document.getElementById('classSelect')
console.log(classSelect);
classSelect.addEventListener('change', function(){
    const className = classSelect.value;
    console.log(`User memilih kelas: ${className}`);
    previewClass.textContent = className;
});

const agreementCheckbox = document.getElementById('agreement');
console.log(agreementCheckbox);
agreementCheckbox.addEventListener('change', function(){
    const isChecked = agreementCheckbox.checked;
    console.log({isChecked});
    previewStatus.textContent = isChecked ? '✅ Siap' : '❌ Belum Siap';
});

document.addEventListener('DOMContentLoaded', function(){
    alert('Welcome to Coders Club..!');
});

const reasonInput = document.getElementById('reasonInput');
console.log(reasonInput);
reasonInput.addEventListener('keydown', function(e){
    console.log(`User menginput key: ${e.key}`);
    const reason = reasonInput.value;
    previewReason.textContent = reason;
    const characterCount = document.getElementById('characterCount');
    const totalCounter = reason.length;
    characterCount.textContent = `Jumlah karakter: ${totalCounter}`;

    // Logika perubahan warna indicator
    if (totalCounter >= 90) {
      characterCount.style.color = "red"; // Kritis (Sisa 10 karakter)
    } else if (totalCounter >= 70) {
      characterCount.style.color = "orange"; // Peringatan (Sisa 30 karakter)
    } else if (totalCounter >= 50) {
      characterCount.style.color = "yellow"; // Peringatan (Sisa 30 karakter)
    } else {
      characterCount.style.color = "white"; // Normal (Kembali ke warna asli bawaan CSS)
    }
});

const registrationForm = document.getElementById('registrationForm');
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function(){
    registrationForm.reset(); // Reset semua input
    previewName.textContent = 'Belum diisi';
    previewClass.textContent = 'Belum dipilih';
    previewInterest.textContent = 'Belum dipilih';
    previewReason.textContent = 'Belum ada alasan...';
    previewStatus.textContent = '⏳ Belum siap dikirim';
    message.textContent = '👋 Silakan isi form pendaftaran.';

});

// even submit form
registrationForm.addEventListener('submit', function(e){
    e.preventDefault(); // Mencegah form submit secara default
    const name = nameInput.value;
    const className = classSelect.value;
    const interest = interestSelect.value;
    const reason = reasonInput.value;
    const isChecked = agreementCheckbox.checked;

    const confirmDialog = confirm('Apakah Anda yakin ingin mengirimkan data pendaftaran?');
    if (!confirmDialog) {
        console.log('User membatalkan pengiriman data pendaftaran.');
        return;
    }
    console.log('Form berhasil dikirim.');
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    registrationForm.style.display = 'none';

    previewName.textContent = name;
    previewClass.textContent = className;
    previewInterest.textContent = interest;
    previewReason.textContent = reason;
    previewStatus.textContent = isChecked ? '✅ Siap' : '❌ Belum siap dikirim';
    message.textContent = `Terima kasih, ${name} telah mendaftar di Coders Club.`;
});

Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});