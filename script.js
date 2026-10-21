
/* =========================================
   1. DATA MENU
   ========================================= */

/*
  Setiap objek di dalam array mewakili satu produk.
  Kamu dapat mengganti nama, harga, gambar, dan deskripsi
  sesuai menu kafe yang menjadi mitra proyek.
*/

const daftarMenu = [
    {
        id: 1,
        nama: "Nasi Goreng Spesial",
        harga: 18000,
        kategori: "makanan",
        deskripsi: "Nasi goreng dengan telur dan sayuran.",
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 2,
        nama: "Chicken Rice Bowl",
        harga: 22000,
        kategori: "makanan",
        deskripsi: "Nasi hangat dengan ayam dan saus pilihan.",
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 3,
        nama: "Kentang Goreng",
        harga: 12000,
        kategori: "camilan",
        deskripsi: "Kentang goreng renyah untuk teman santai.",
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 4,
        nama: "Roti Panggang",
        harga: 14000,
        kategori: "camilan",
        deskripsi: "Roti panggang dengan topping cokelat.",
        gambar: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        tersedia: false
    },
    {
        id: 5,
        nama: "Es Kopi Susu",
        harga: 15000,
        kategori: "minuman",
        deskripsi: "Perpaduan kopi, susu, dan es.",
        gambar: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 6,
        nama: "Cokelat Dingin",
        harga: 13000,
        kategori: "minuman",
        deskripsi: "Minuman cokelat dingin yang menyegarkan.",
        gambar: "https://images.unsplash.com/photo-1542990253-0b8be7ecf6d6?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 7,
        nama: "Mie Goreng",
        harga: 16000,
        kategori: "makanan",
        deskripsi: "Mie goreng dengan sayuran dan telur.",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 8,
        nama: "Teh Lemon",
        harga: 10000,
        kategori: "minuman",
        deskripsi: "Teh dengan sentuhan rasa lemon.",
        gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    },
    {
        id: 9,
        nama: "Pisang Goreng",
        harga: 11000,
        kategori: "camilan",
        deskripsi: "Pisang goreng hangat untuk camilan.",
        gambar: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        tersedia: true
    }
];


/* =========================================
   2. MENGAMBIL ELEMEN HTML
   ========================================= */

/*
  JavaScript membutuhkan elemen HTML tertentu
  untuk menampilkan menu dan membaca input pengguna.
*/

const menuList = document.getElementById("menu-list");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-button");
const emptyMessage = document.getElementById("empty-message");
const currentYear = document.getElementById("current-year");

// Kategori yang sedang dipilih pengguna
let kategoriAktif = "semua";


/* =========================================
   3. FORMAT HARGA RUPIAH
   ========================================= */

/*
  Contoh:
  18000 akan ditampilkan sebagai Rp18.000
*/

function formatRupiah(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}


/* =========================================
   4. MEMBUAT KARTU MENU
   ========================================= */

/*
  Fungsi ini membuat satu kartu produk berdasarkan
  data yang ada di dalam objek menu.
*/

function buatKartuMenu(menu) {
    // Membuat elemen kartu utama
    const card = document.createElement("article");
    card.className = "menu-card";

    // Membuat elemen gambar produk
    const image = document.createElement("img");
    image.className = "menu-image";
    image.src = menu.gambar;
    image.alt = menu.nama;
    image.loading = "lazy";

    // Menangani gambar yang gagal dimuat
    image.addEventListener("error", function () {
        image.removeAttribute("src");
        image.alt = "Foto menu tidak tersedia";
    });

    // Bagian isi kartu
    const content = document.createElement("div");
    content.className = "menu-card-content";

    // Nama dan harga produk
    const top = document.createElement("div");
    top.className = "menu-card-top";

    const name = document.createElement("h3");
    name.textContent = menu.nama;

    const price = document.createElement("span");
    price.className = "menu-price";
    price.textContent = formatRupiah(menu.harga);

    top.append(name, price);

    // Deskripsi produk
    const description = document.createElement("p");
    description.className = "menu-description";
    description.textContent = menu.deskripsi;

    // Bagian kategori dan ketersediaan
    const footer = document.createElement("div");
    footer.className = "menu-card-footer";

    const category = document.createElement("span");
    category.className = "menu-category";

    // Mengubah nama kategori menjadi tulisan yang mudah dibaca
    const namaKategori = {
        makanan: "Makanan",
        minuman: "Minuman",
        camilan: "Camilan"
    };

    category.textContent = namaKategori[menu.kategori] || menu.kategori;

    const status = document.createElement("span");
    status.className = "menu-status";

    if (menu.tersedia) {
        status.classList.add("available");
        status.textContent = "● Tersedia";
    } else {
        status.classList.add("unavailable");
        status.textContent = "● Habis";
    }

    footer.append(category, status);

    // Menggabungkan seluruh bagian kartu
    content.append(top, description, footer);
    card.append(image, content);

    return card;
}


/* =========================================
   5. MENAMPILKAN DAFTAR MENU
   ========================================= */

/*
  Fungsi ini membaca data menu, lalu membuat kartu
  untuk setiap produk yang cocok dengan filter.
*/

function tampilkanMenu() {
    // Mengambil teks pencarian dan mengubahnya menjadi huruf kecil
    const kataKunci = searchInput.value.trim().toLowerCase();

    // Mengosongkan tampilan sebelum membuat hasil terbaru
    menuList.replaceChildren();

    // Menyaring menu berdasarkan kategori dan kata kunci
    const hasilFilter = daftarMenu.filter(function (menu) {
        const cocokKategori =
            kategoriAktif === "semua" ||
            menu.kategori === kategoriAktif;

        const cocokPencarian =
            menu.nama.toLowerCase().includes(kataKunci) ||
            menu.deskripsi.toLowerCase().includes(kataKunci);

        return cocokKategori && cocokPencarian;
    });

    // Membuat dan menampilkan kartu untuk setiap hasil
    hasilFilter.forEach(function (menu) {
        const kartu = buatKartuMenu(menu);
        menuList.appendChild(kartu);
    });

    // Pesan ditampilkan apabila tidak ada hasil yang cocok
    emptyMessage.hidden = hasilFilter.length > 0;
}


/* =========================================
   6. FITUR PENCARIAN
   ========================================= */

/*
  Setiap kali pengguna mengetik, daftar menu
  langsung diperbarui sesuai kata kunci.
*/

searchInput.addEventListener("input", function () {
    tampilkanMenu();
});


/* =========================================
   7. FILTER KATEGORI
   ========================================= */

/*
  Ketika tombol kategori diklik, JavaScript akan:
  1. Menentukan kategori yang dipilih.
  2. Memperbarui tampilan tombol aktif.
  3. Menampilkan produk dari kategori tersebut.
*/

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        kategoriAktif = button.dataset.category;

        // Memperbarui tampilan dan status tombol
        categoryButtons.forEach(function (tombol) {
            const sedangAktif = tombol === button;

            tombol.classList.toggle("active", sedangAktif);
            tombol.setAttribute(
                "aria-pressed",
                String(sedangAktif)
            );
        });

        // Menampilkan menu sesuai kategori terpilih
        tampilkanMenu();
    });
});


/* =========================================
   8. MENAMPILKAN TAHUN OTOMATIS
   ========================================= */

/*
  Tahun pada footer mengikuti tahun perangkat
  saat halaman dibuka.
*/

currentYear.textContent = new Date().getFullYear();


/* =========================================
   9. MENAMPILKAN MENU SAAT HALAMAN DIBUKA
   ========================================= */

// Menampilkan semua menu ketika website pertama kali dibuka
tampilkanMenu();
