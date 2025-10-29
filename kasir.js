// ===== CEK LOGIN =====
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// ===== Ambil Elemen =====
const namaProduk = document.getElementById("namaProduk");
const hargaProduk = document.getElementById("hargaProduk");
const jumlahProduk = document.getElementById("jumlahProduk");
const tambahBtn = document.getElementById("tambahBtn");
const tabelBody = document.querySelector("#tabelBelanja tbody");
const totalHargaEl = document.getElementById("totalHarga");
const cetakStrukBtn = document.getElementById("cetakStruk");
const logoutBtn = document.getElementById("logoutBtn");
const resetLaporanBtn = document.getElementById("resetLaporan");
const totalTransaksiEl = document.getElementById("totalTransaksi");
const totalKeuntunganEl = document.getElementById("totalKeuntungan");

const modalStruk = document.getElementById("modalStruk");
const isiStruk = document.getElementById("isiStruk");
const tutupStruk = document.getElementById("tutupStruk");

let daftarBelanja = [];
let totalPembelian = 0;

// ===== Tambah Produk =====
tambahBtn.addEventListener("click", () => {
  const nama = namaProduk.value.trim();
  const harga = parseFloat(hargaProduk.value);
  const jumlah = parseInt(jumlahProduk.value);

  if (!nama || isNaN(harga) || isNaN(jumlah) || harga <= 0 || jumlah <= 0) {
    alert("Isi data dengan benar!");
    return;
  }

  const total = harga * jumlah;
  daftarBelanja.push({ nama, harga, jumlah, total });

  renderTabel();
  namaProduk.value = "";
  hargaProduk.value = "";
  jumlahProduk.value = "";
});

// ===== Render Tabel =====
function renderTabel() {
  tabelBody.innerHTML = "";
  totalPembelian = 0;

  daftarBelanja.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.nama}</td>
      <td>Rp ${item.harga.toLocaleString()}</td>
      <td>${item.jumlah}</td>
      <td>Rp ${item.total.toLocaleString()}</td>
      <td><button class="btn danger" onclick="hapusItem(${i})">Hapus</button></td>
    `;
    tabelBody.appendChild(row);
    totalPembelian += item.total;
  });

  totalHargaEl.textContent = totalPembelian.toLocaleString();
}

// ===== Hapus Item =====
function hapusItem(index) {
  if (confirm("Hapus produk ini dari daftar?")) {
    daftarBelanja.splice(index, 1);
    renderTabel();
  }
}

// ===== Cetak Struk =====
cetakStrukBtn.addEventListener("click", () => {
  if (daftarBelanja.length === 0) {
    alert("Belum ada produk!");
    return;
  }

  const waktu = new Date().toLocaleString("id-ID");
  let struk = `=== STRUK PEMBELIAN ===\nWaktu: ${waktu}\n------------------------\n`;
  daftarBelanja.forEach((p) => {
    struk += `${p.nama} x${p.jumlah} = Rp ${p.total.toLocaleString()}\n`;
  });
  struk += "------------------------\n";
  struk += `Total: Rp ${totalPembelian.toLocaleString()}\n`;
  struk += "Terima kasih telah berbelanja!";

  isiStruk.textContent = struk;
  modalStruk.style.display = "flex";

  simpanLaporan(totalPembelian);
  daftarBelanja = [];
  renderTabel();
});

// ===== Tutup Modal =====
tutupStruk.addEventListener("click", () => {
  modalStruk.style.display = "none";
});

// ===== Simpan Laporan =====
function simpanLaporan(total) {
  const laporan = JSON.parse(localStorage.getItem("laporanHarian")) || [];
  laporan.push(total);
  localStorage.setItem("laporanHarian", JSON.stringify(laporan));
  updateLaporan();
}

// ===== Update Laporan =====
function updateLaporan() {
  const laporan = JSON.parse(localStorage.getItem("laporanHarian")) || [];
  const totalTransaksi = laporan.length;
  const totalKeuntungan = laporan.reduce((a, b) => a + b, 0);

  totalTransaksiEl.textContent = totalTransaksi;
  totalKeuntunganEl.textContent = totalKeuntungan.toLocaleString();
}

// ===== Reset Laporan =====
resetLaporanBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin menghapus semua laporan harian?")) {
    localStorage.removeItem("laporanHarian");
    updateLaporan();
    alert("Laporan harian telah dihapus.");
  }
});

// ===== Logout =====
logoutBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin logout?")) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
});

// ===== Saat Halaman Dimuat =====
updateLaporan();
