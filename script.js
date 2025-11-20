// Ambil elemen DOM
const nama = document.getElementById("nama");
const kelamin = document.getElementById("kelamin");
const tanggalLahir = document.getElementById("tanggalLahir");
const hp = document.getElementById("hp");
const poli = document.getElementById("poli");
const tanggal = document.getElementById("tanggal");
const sesi = document.getElementById("sesi");
const deskripsi = document.getElementById("deskripsi");
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

// =========================
// 🔵  FUNGSI FORMAT KODE
// =========================

// Format tanggal → YYYYMMDD
function formatTanggal(tgl) {
    const date = new Date(tgl);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
}

// Kode Poli
function kodePoli(poli) {
    const mapping = {
        "Poli Umum": "UMU",
        "Poli Penyakit Dalam": "PDL",
        "Poli Gigi": "GIG",
        "Poli Otak": "OTK",
        "Poli Bedah": "BDH",
        "Poli Saraf": "SRF",
        "Poli Jantung": "JTG",
        "Rehabilitasi Medik": "RHM"
    };

    return mapping[poli] || "XXX";
}

// Kode sesi
function kodeSesi(sesi) {
    if (sesi.includes("Sesi 1")) return "S1";
    if (sesi.includes("Sesi 2")) return "S2";
    if (sesi.includes("Sesi 3")) return "S3";
    return "SX";
}

// Buat nomor antrian final
function buatNomorAntrian(tanggalLahir, poli, tanggalKunjungan, sesi) {
    const lahir = formatTanggal(tanggalLahir);
    const poliKode = kodePoli(poli);
    const sesiKode = kodeSesi(sesi);

    let counter = localStorage.getItem("counterAntrian");
    counter = counter ? Number(counter) + 1 : 1;
    localStorage.setItem("counterAntrian", counter);

    const counterStr = String(counter).padStart(3, "0");

    return `${lahir}-${poliKode}-${sesiKode}-${counterStr}`;
}

// =========================
// 🔵  BUTTON SUBMIT
// =========================
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

    if (hp.value !== "" && isNaN(hp.value)) {
        hp.style.border = "2px solid red";
        alert("Nomor HP harus angka!");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tglKunjungan = new Date(tanggal.value);

    if (tglKunjungan < today) {
        tanggal.style.border = "2px solid red";
        alert("Tanggal kunjungan tidak boleh sebelum hari ini!");
        return;
    }

    const umurPasien = hitungUmur(tanggalLahir.value);

    // =========================
    // ⬇️ PEMANGGILAN KODE ANTRIAN BARU
    // =========================
    const nomorAntrian = buatNomorAntrian(
        tanggalLahir.value,
        poli.value,
        tanggal.value,
        sesi.value
    );

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
