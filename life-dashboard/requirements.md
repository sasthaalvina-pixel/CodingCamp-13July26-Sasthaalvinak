# Requirements — To-Do List Life Dashboard

## Introduction

Aplikasi ini adalah sebuah **Life Dashboard** berbasis web yang membantu pengguna mengorganisir harinya. Dashboard menampilkan waktu saat ini, to-do list, focus timer (Pomodoro), dan quick links ke website favorit. Dibangun menggunakan HTML, CSS, dan Vanilla JavaScript murni tanpa framework atau backend.

---

## Technical Constraints

### TC-1: Technology Stack
- HTML untuk struktur halaman
- CSS untuk styling dan layout
- Vanilla JavaScript (tidak boleh menggunakan React, Vue, Angular, atau framework lain)
- Tidak membutuhkan backend server

### TC-2: Data Storage
- Menggunakan browser **Local Storage API**
- Semua data disimpan di sisi klien (client-side only)

### TC-3: Browser Compatibility
- Harus berjalan di browser modern: Chrome, Firefox, Edge, Safari
- Dapat digunakan sebagai standalone web app

### TC-4: Folder Structure
```
dashboard/
├── index.html
├── css/
│   └── style.css      ← hanya 1 file CSS
└── js/
    └── app.js         ← hanya 1 file JavaScript
```

---

## Functional Requirements

### FR-1: Greeting Widget
| ID | Requirement |
|----|-------------|
| FR-1.1 | Sistem menampilkan **jam digital** yang berjalan secara real-time (format HH:MM:SS) |
| FR-1.2 | Sistem menampilkan **tanggal lengkap** (hari, tanggal, bulan, tahun) |
| FR-1.3 | Sistem menampilkan **greeting** berdasarkan waktu: "Good Morning" (00–11), "Good Afternoon" (12–17), "Good Evening" (18–23) |
| FR-1.4 | Greeting menyertakan **nama pengguna** yang bisa dikustomisasi *(Challenge: Custom Name)* |

### FR-2: Focus Timer (Pomodoro)
| ID | Requirement |
|----|-------------|
| FR-2.1 | Timer default dimulai dari **25 menit (25:00)** |
| FR-2.2 | Tombol **Start** memulai countdown timer |
| FR-2.3 | Tombol **Stop** menghentikan/menjeda timer |
| FR-2.4 | Tombol **Reset** mereset timer kembali ke durasi awal |
| FR-2.5 | Durasi Pomodoro dapat **diubah** oleh pengguna *(Challenge: Change Pomodoro Time)* |
| FR-2.6 | Timer menampilkan notifikasi/alert ketika waktu habis |

### FR-3: To-Do List
| ID | Requirement |
|----|-------------|
| FR-3.1 | Pengguna dapat **menambah task** baru via input field + tombol Add |
| FR-3.2 | Pengguna dapat **mengedit** teks task yang sudah ada |
| FR-3.3 | Pengguna dapat **menandai task sebagai selesai** (mark as done) dengan checkbox |
| FR-3.4 | Pengguna dapat **menghapus task** dengan tombol Delete |
| FR-3.5 | Semua task **disimpan di Local Storage** dan tetap ada setelah refresh |
| FR-3.6 | Sistem **mencegah task duplikat** (task dengan nama sama tidak bisa ditambahkan dua kali) *(Challenge: Prevent Duplicate)* |
| FR-3.7 | Task dapat **di-sort** (belum selesai tampil di atas, selesai di bawah) *(Challenge: Sort Tasks — opsional)* |

### FR-4: Quick Links
| ID | Requirement |
|----|-------------|
| FR-4.1 | Pengguna dapat **menambah link** dengan mengisi nama link dan URL |
| FR-4.2 | Link ditampilkan sebagai **tombol** yang bisa diklik untuk membuka website di tab baru |
| FR-4.3 | Pengguna dapat **menghapus link** yang tidak diinginkan |
| FR-4.4 | Semua link **disimpan di Local Storage** |

### FR-5: Light / Dark Mode *(Challenge)*
| ID | Requirement |
|----|-------------|
| FR-5.1 | Terdapat tombol toggle untuk berpindah antara **Light Mode** dan **Dark Mode** |
| FR-5.2 | Preferensi tema **disimpan di Local Storage** dan dipertahankan saat refresh |

---

## Non-Functional Requirements

### NFR-1: Simplicity
- Antarmuka bersih dan minimal, mudah digunakan tanpa setup yang rumit
- Tidak membutuhkan registrasi atau login

### NFR-2: Performance
- Load time cepat (tidak ada dependency besar)
- Interaksi UI responsif, tidak ada lag saat update data

### NFR-3: Visual Design
- Desain user-friendly dengan estetika yang menarik
- Hierarki visual yang jelas antar widget
- Tipografi yang mudah dibaca

---

## Challenges (Pilih 3 dari 5)

Berikut 3 challenge yang **dipilih** untuk diimplementasikan:

| No | Challenge | Status |
|----|-----------|--------|
| ✅ | **Light / Dark Mode** | Dipilih |
| ✅ | **Custom Name in Greeting** | Dipilih |
| ✅ | **Prevent Duplicate Tasks** | Dipilih |
| ⬜ | Change Pomodoro Time | Tidak dipilih |
| ⬜ | Sort Tasks | Tidak dipilih |

---

## User Stories

```
US-01  Sebagai pengguna, saya ingin melihat jam dan tanggal saat ini
       agar saya tahu waktu tanpa membuka aplikasi lain.

US-02  Sebagai pengguna, saya ingin menyapa diri sendiri dengan nama saya
       agar dashboard terasa personal.

US-03  Sebagai pengguna, saya ingin menjalankan timer 25 menit
       agar saya bisa fokus bekerja dengan metode Pomodoro.

US-04  Sebagai pengguna, saya ingin menambah, mengedit, dan menghapus task
       agar saya bisa melacak pekerjaan yang harus dilakukan hari ini.

US-05  Sebagai pengguna, saya ingin task saya tersimpan otomatis
       agar data tidak hilang saat saya menutup browser.

US-06  Sebagai pengguna, saya ingin menyimpan link website favorit
       agar saya bisa membukanya dengan cepat dari dashboard.

US-07  Sebagai pengguna, saya ingin beralih antara tampilan terang dan gelap
       agar nyaman digunakan di berbagai kondisi cahaya.

US-08  Sebagai pengguna, saya tidak bisa menambah task yang sudah ada
       agar daftar task tetap bersih tanpa duplikat.
```

---

## Acceptance Criteria

- [ ] Jam berjalan real-time dan greeting berubah sesuai waktu
- [ ] Nama pengguna bisa diubah dan tersimpan
- [ ] Timer bisa start, stop, dan reset; alert muncul saat waktu habis
- [ ] Task bisa ditambah, diedit, dicentang, dan dihapus
- [ ] Task tersimpan di Local Storage (tidak hilang saat refresh)
- [ ] Task duplikat tidak bisa ditambahkan
- [ ] Quick links bisa ditambah, dibuka, dan dihapus
- [ ] Quick links tersimpan di Local Storage
- [ ] Toggle light/dark mode berfungsi dan preferensi tersimpan
- [ ] Semua fitur berjalan di Chrome, Firefox, Edge, dan Safari
