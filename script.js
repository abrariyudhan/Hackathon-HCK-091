// Ambil elemen DOM
const nama = document.getElementById("nama");
const kelamin = document.getElementById("kelamin");
const tanggalLahir = document.getElementById("tanggalLahir");
const hp = document.getElementById("hp");
const poli = document.getElementById("poli");
const tanggal = document.getElementById("tanggal");
const sesi = document.getElementById("sesi");
const deskripsi = document.getElementById("deskripsi")
const btn = document.getElementById("submitBtn");
const output = document.getElementById("output");

// Semua field wajib isi
const fields = [nama, kelamin, tanggalLahir, hp, poli, tanggal, sesi];

// Hitung Umur
function hitungUmur(tgl) {
    const today = new Date();
    const lahir = new Date(tgl);
    let umur = today.getFullYear() - lahir.getFullYear();
    const m = today.getMonth() - lahir.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < lahir.getDate())) {
        umur--;
    }
    return umur;
}

// Nomor antrian otomatis
function buatNomorAntrian() {
    let nomor = localStorage.getItem("nomorAntrian");
    nomor = nomor ? Number(nomor) + 1 : 1;
    localStorage.setItem("nomorAntrian", nomor);
    return nomor;
}

// BUTTON SUBMIT
btn.addEventListener("click", function () {

    let isValid = true;

    fields.forEach(field => {
        if (field.value === "") {
            field.style.border = "2px solid red";
            isValid = false;
        } else {
            field.style.border = "1px solid #ccc";
        }
    });

    if (!isValid) {
        alert("Semua field harus diisi!");
        return;
    }

    // Validasi nomor HP
    if (hp.value !== "" && isNaN(hp.value)) {
        hp.style.border = "2px solid red";
        alert("Nomor HP harus angka!");
        return;
    }

    // Validasi tanggal kunjungan
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tglKunjungan = new Date(tanggal.value);

    if (tglKunjungan < today) {
        tanggal.style.border = "2px solid red";
        alert("Tanggal kunjungan tidak boleh sebelum hari ini!");
        return;
    }

    const umurPasien = hitungUmur(tanggalLahir.value);
    const nomorAntrian = buatNomorAntrian();

    const dataPendaftaran = {
        nomorAntrian,
        nama: nama.value,
        kelamin: kelamin.value,
        tanggalLahir: tanggalLahir.value,
        umur: umurPasien,
        hp: hp.value,
        poli: poli.value,
        tanggal: tanggal.value,
        sesi: sesi.value,
        deskripsi: deskripsi.value !== "" ? deskripsi.value : "Tidak ada keterangan"
    };

    localStorage.setItem("pendaftaran", JSON.stringify(dataPendaftaran));
    window.location.href = "hasil.html";
});
