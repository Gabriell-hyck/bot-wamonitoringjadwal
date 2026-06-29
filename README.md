# Bot Jadwal SMP - WhatsApp Bot

Bot WhatsApp otomatis buat nge-share jadwal pelajaran, seragam, sama pengumuman ke grup kelas. Lumayan cocok buat anak SMP yang mau bikin projek yang ada gunanya, bukan cuma buat gaya doang.

## Fitur

- Cek jadwal harian pake perintah `.jadwal`
- Broadcast otomatis tiap jam 6 pagi
- Cuma respon di 1 grup tertentu, jadi gak nyasar ke grup lain
- Login pake scan QR Code (butuh bantuan HP kedua)

---

## Persiapan

### 1. Yang Lo Butuhin

- HP Android yang udah ada Termux-nya
- Akun WhatsApp cadangan, jangan pake nomor utama biar aman kalo ada apa-apa
- HP kedua buat scan QR, bisa pinjem punya temen, kakak, atau ortu
- Koneksi internet yang stabil
- Niat sama sabar, soalnya namanya ngoding pasti ada error-nya

### 2. Install Termux

- Download Termux dari F-Droid (lebih disaranin daripada Play Store)
- Buka Termux, kasih izin penyimpanan dulu:

```bash
termux-setup-storage
```

---

## Cara Install

### Step 1: Update & Install Dependensi

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
```

### Step 2: Clone Project

```bash
git clone https://github.com/Gabriell-hyck/bot-wamonitoring
cd whatsapp-bot-free
```

Catatan: repo di atas cuma contoh aja. Nanti kalo udah paham, lo bisa ganti pake repo sendiri.

### Step 3: Install Library

```bash
npm install @whiskeysockets/baileys @hapi/boom node-cron
```

---

## Konfigurasi

### 1. Buka File index.js

```bash
nano index.js
```

### 2. Ganti ID Grup Target

Cari baris ini:

```javascript
const TARGET_GROUP = '6281234567890-123456@g.us';
```

Ganti angka-angkanya sama ID grup lo sendiri. Cara dapetin ID grup:

- Jalankan dulu bot-nya (lihat Step 4 di bawah)
- Kirim pesan apa aja di grup yang mau dipake
- Cek terminal, nanti bakal muncul tulisan kayak gini:

```
ID GRUP: 628xxxx-xxxx@g.us
```

- Tinggal copy paste ID itu ke index.js

### 3. Edit Jadwal (Opsional)

Cari bagian ini:

```javascript
const jadwal = {
    1: 'Senin: Seragam putih abu, jam 7 masuk',
    2: 'Selasa: Seragam batik, jam 7 masuk',
    // dan seterusnya
};
```

Sesuaiin sama jadwal sekolah lo masing-masing.

Buat nyimpen file di nano:

Tekan Ctrl + O, lanjut Enter, terus Ctrl + X buat keluar.

---

## Menjalankan Bot

### Step 4: Jalankan Bot

```bash
node index.js
```

### Step 5: Scan QR Code

Bagian ini agak ribet sedikit, jadi simak baik-baik:

1. Nanti muncul QR Code di layar terminal Termux
2. Pinjem HP temen, kakak, atau ortu yang punya WhatsApp aktif
3. Di HP mereka, buka WhatsApp, masuk ke menu Perangkat Tertaut, pilih Tautkan Perangkat
4. Arahkan kamera HP itu ke QR Code yang muncul di Termux
5. Kalo udah berhasil scan, bot bakal aktif pake akun WhatsApp punya orang yang lo pinjem itu, bukan akun lo sendiri

Penting banget: karena bot ini bakal pake akun WhatsApp orang lain, jangan lupa minta izin dulu sebelum dipake. Jelasin juga kalo ini cuma buat keperluan grup kelas, bukan buat yang aneh-aneh.

### Step 6: Test Bot

Coba kirim pesan `.jadwal` di grup. Kalo settingan udah bener, bot bakal langsung bales jadwal hari itu.

---

## Cara Matiin Bot

Tinggal pencet Ctrl + C di Termux.

---

## Biar Bot Tetap Jalan di Background

```bash
# Install screen dulu
pkg install screen

# Jalankan bot di dalam screen
screen -S botwa
node index.js

# Keluar dari screen tanpa matiin bot (detach)
# Caranya: Ctrl + A, lanjut Ctrl + D

# Mau balik lagi ke screen-nya
screen -r botwa
```

---

## Troubleshooting

**Error: fetchLatestWAWebVersion is not a function**

Solusinya, ganti baris `version: await fetchLatestWAWebVersion()` jadi kayak gini:

```javascript
version: [2, 3000, 1035194821]
```

**QR Code kepotong di layar Termux**

Coba zoom out (cubit jari ke dalam) di layar Termux biar QR-nya keliatan utuh.

**HP yang dipinjem gak bisa scan QR**

Coba cara ini:

- Pastiin QR-nya keliatan full, jangan kepotong
- Kalo masih susah, screenshot aja QR-nya, kirim ke HP yang mau dipake buat scan, terus scan dari galeri WhatsApp di HP itu

**Bot gak ngerespon `.jadwal`**

Cek lagi ID grup di variabel TARGET_GROUP, jangan-jangan salah ketik. Kirim pesan di grup, terus liat log di terminal buat dapetin ID yang bener.

**Akun WhatsApp yang dipinjem kena banned**

Biar gak kejadian, ikutin ini:

- Jangan spam pesan
- Pake bot ini cuma buat 1 grup kecil aja
- Kalo bisa, pake akun WhatsApp cadangan, daftar pake nomor SIM lain biar lebih aman

---

## Struktur Project

```
whatsapp-bot-baileys/
├── index.js          # File utama bot
├── package.json      # Daftar dependensi
├── auth_info/        # Folder session, otomatis kebuat sendiri
└── README.md         # Panduan ini
```

---

## Peringatan Penting

- Pake nomor WhatsApp cadangan, atau minta izin dulu kalo mau pake akun temen/ortu. Akun bisa kena banned kalo ketahuan dipake bot
- Jangan spam pesan
- Cuma buat grup internal kayak kelas atau komunitas kecil
- Ini projek belajar, jadi pake dengan bijak ya

---

## Soal Ide Awal Projek Ini

Projek ini lahir dari masalah sehari-hari anak SMP yang sering lupa jadwal sama seragam. Dibikin pake Termux dan Baileys, modal HP doang tanpa perlu laptop.

---

## Kontak

Kalo ada masalah atau error yang gak ketemu solusinya di sini, buka issue di GitHub atau langsung tanya aja ke gue.

---

Semoga lancar ya. Jangan lupa makan dulu sebelum ngoding biar gak lemes di tengah jalan.

