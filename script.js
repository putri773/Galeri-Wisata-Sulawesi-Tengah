
const wisata = [
    {
        nama: "Danau Poso", lokasi: "Kabupaten Poso",
        kategori: "Danau",
        deskripsi: "Danau dengan pemandangan alam yang indah.",
        gambar: "Danau-Poso.jpg"
    },
    {
        nama: "Pantai Tanjung Karang", lokasi: "Kabupaten Donggala",
        kategori: "Pantai",
        deskripsi: "Pantai dengan pemandangan laut yang menarik.",
        gambar: "Pantai_Tanjung_Karang.jpg"
    },
    {
        nama: "Air Terjun Malane", lokasi: "Kabupaten Tolitoli",
        kategori: "Air Terjun",
        deskripsi: "Destinasi alam dengan suasana sejuk dan pemandangan hijau.",
        gambar: "Air Terjun Malane.jpeg"
    },
    {
        nama: "Taman Nasional Lore Lindu", lokasi: "Kabupaten Sigi",
        kategori: "Taman Nasional",
        deskripsi: "Kawasan hutan tropis dengan keanekaragaman hayati.",
        gambar: "Taman Nasional Lore Lindu.jpg"
    },
    {
        nama: "Pulau Kadidiri", lokasi: "Kabupaten Tojo Una-Una",
        kategori: "Pulau",
        deskripsi: "Pulau dengan keindahan laut dan terumbu karang.",
        gambar: "Pulau Kadidiri.jpg"
    },
    {
        nama: "Gunung Gawalise",
        lokasi: "Kota Palu, Sulawesi Tengah",
        kategori: "Gunung",
        deskripsi: "Gunung dengan panorama Lembah Palu dan Teluk Palu yang indah dari ketinggian.",
        gambar: "Gunung Gawalise.jpg"
    }

];

// Menampilkan kartu wisata dari data array.
function tampilkanWisata(data) {
    const daftar = document.getElementById("daftarWisata");
    daftar.innerHTML = "";

    // Menampilkan pesan jika data tidak ditemukan.
    if (data.length === 0) {
        daftar.innerHTML = "<p>Destinasi tidak ditemukan.</p>";
        return;
    }

    // Membuat kartu untuk setiap destinasi.
    data.forEach(function (tempat) {
        daftar.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card kartu">
                    <img src="${tempat.gambar}" class="gambar"
                         alt="${tempat.nama}">
                    <div class="card-body">
                        <h5>${tempat.nama}</h5>
                        <p>${tempat.lokasi}</p>
                        <span class="badge bg-success">${tempat.kategori}</span>
                        <button class="btn btn-success btn-sm w-100 mt-3"
                            data-nama="${tempat.nama}">Lihat Detail</button>
                    </div>
                </div>
            </div>`;
    });
}

// Mencari destinasi berdasarkan nama dan kategori.
function cariWisata() {
    const kata = document.getElementById("cari").value.toLowerCase().trim();
    const kategori = document.getElementById("kategori").value;

    const hasil = wisata.filter(function (tempat) {
        return tempat.nama.toLowerCase().includes(kata) &&
            (kategori === "Semua" || tempat.kategori === kategori);
    });

    tampilkanWisata(hasil);
    document.getElementById("pesan").textContent =
        "Jumlah destinasi ditemukan: " + hasil.length;
}

// Menampilkan detail destinasi menggunakan modal Bootstrap.
function detailWisata(nama) {
    const tempat = wisata.find(function (item) {
        return item.nama === nama;
    });

    if (tempat) {
        document.getElementById("judulModal").textContent = tempat.nama;
        document.getElementById("isiModal").textContent =
            tempat.lokasi + " — " + tempat.kategori + ". " + tempat.deskripsi;

        new bootstrap.Modal(document.getElementById("modalWisata")).show();
    }
}

// Memvalidasi pencarian saat form dikirim.
document.getElementById("formCari").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("cari");

    if (input.value.trim() === "") {
        input.classList.add("is-invalid");
        input.focus();
    } else {
        input.classList.remove("is-invalid");
        cariWisata();
    }
});

// Memperbarui hasil ketika pengguna mengetik.
document.getElementById("cari").addEventListener("input", function () {
    this.classList.remove("is-invalid");
    cariWisata();
});

// Memfilter wisata ketika kategori berubah.
document.getElementById("kategori").addEventListener("change", function () {
    cariWisata();
});

// Mengembalikan tampilan ke semua destinasi.
document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("cari").value = "";
    document.getElementById("kategori").value = "Semua";
    document.getElementById("cari").classList.remove("is-invalid");
    document.getElementById("pesan").textContent = "Berikut semua destinasi wisata.";
    tampilkanWisata(wisata);
});

// Membuka detail ketika tombol pada kartu diklik.
document.getElementById("daftarWisata").addEventListener("click", function (e) {
    const tombol = e.target.closest("button[data-nama]");
    if (tombol) detailWisata(tombol.dataset.nama);
});

// Menampilkan semua destinasi saat halaman pertama dibuka.
tampilkanWisata(wisata);
