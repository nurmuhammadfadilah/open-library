# Open Library Book Finder

## 📌 Deskripsi

Open Library Book Finder adalah aplikasi web berbasis **Next.js** yang memungkinkan pengguna mencari buku berdasarkan judul melalui **Open Library API**. Aplikasi ini juga menampilkan rekomendasi buku teknologi saat pertama kali dibuka. [Open Library](https://open-library-pi.vercel.app/)

## 🚀 Fitur

- 🔍 **Pencarian Buku**: Cari buku berdasarkan judul yang diinputkan.
- 📚 **Rekomendasi Buku**: Menampilkan daftar buku bertema teknologi saat halaman pertama kali dimuat.
- ⚡ **Animasi Loading**: Menampilkan efek loading saat data sedang diambil dari API.
- 🎨 **UI Interaktif**: Menggunakan **Tailwind CSS** untuk tampilan yang responsif dan modern.
- 🔄 **Refresh Halaman**: Klik pada logo untuk memuat ulang halaman.

## 🛠️ Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) – Framework React untuk aplikasi web.
- [Tailwind CSS](https://tailwindcss.com/) – Library CSS untuk desain yang fleksibel.
- [Axios](https://axios-http.com/) – Untuk melakukan request API.
- [Open Library API](https://openlibrary.org/developers/api) – Sumber data buku.

## 📂 Struktur Folder

```
📦 open-library-book-finder
├── 📂 pages
│   ├── index.js  # Halaman utama
│   ├── header.js  # Komponen header
├── 📂 styles
│   ├── globals.css  # Style global menggunakan Tailwind CSS
├── .env.local  # Konfigurasi API URL
└── README.md  # Dokumentasi proyek
```

## 📦 Instalasi & Menjalankan Proyek

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/open-library-book-finder.git
cd open-library-book-finder
```

### 2️⃣ Instalasi Dependensi

```bash
yarn install   # atau gunakan npm install
```

### 3️⃣ Konfigurasi API

Buat file `.env.local` di root proyek dan tambahkan:

```
NEXT_PUBLIC_OPENLIBRARY_API=https://openlibrary.org
```

### 4️⃣ Menjalankan Server

```bash
yarn dev   # atau gunakan npm run dev
```

Buka [**http://localhost:3000/**](http://localhost:3000/) di browser untuk melihat aplikasi.

## 🎯 Cara Menggunakan

1. **Masukkan judul buku** di kolom pencarian.
2. **Tekan tombol Cari** atau tekan **Enter** untuk mencari.
3. **Lihat hasil pencarian** dalam bentuk kartu buku.
4. **Klik logo** "📚 Open Library 📚" untuk memuat ulang halaman.

## 🤝 Kontribusi

Jika ingin berkontribusi:

1. **Fork** repo ini.
2. Buat branch baru (`git checkout -b fitur-baru`).
3. Commit perubahan (`git commit -m 'Menambahkan fitur X'`).
4. Push branch (`git push origin fitur-baru`).
5. Buat **Pull Request**.

## 📝 Lisensi

Proyek ini menggunakan **MIT License**. Bebas digunakan, dimodifikasi, dan dikembangkan lebih lanjut.

---
