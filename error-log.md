# Error Log — Phase 1, Week 1

---

## Sesi 1: To-Do App (Add, Delete, Toggle, localStorage)

### Error 1 — `getElementById` pakai `#`
**Kode salah:**
```js
document.getElementById("#todo-form");
```
**Masalah:** `getElementById` tidak pakai prefix `#`. Hasilnya `null`, dan semua operasi di atasnya crash.
**Solusi:**
```js
document.getElementById("todo-form");
```
**Pelajaran:** `#` hanya untuk `querySelector`. `getElementById` langsung nama id-nya.

---

### Error 2 — Script di `<head>` sebelum HTML selesai dibaca
**Kode salah:**
```html
<head>
  <script src="app.js"></script>
</head>
```
**Masalah:** JS jalan sebelum browser baca `<body>`, jadi semua `getElementById` return `null`. Error: `Cannot read properties of null (reading 'addEventListener')`.
**Solusi:** Pindah `<script>` ke paling bawah, tepat sebelum `</body>`.
**Pelajaran:** JS harus jalan setelah elemen HTML yang dirujuknya ada di DOM.

---

### Error 3 — `addEventListener` di dalam `render()`
**Kode salah:**
```js
function render() {
  todoForm.addEventListener("submit", function() { ... });
}
```
**Masalah:** Setiap kali `render()` dipanggil, event listener baru didaftarkan ke elemen yang sama. Makin banyak todo, makin numpuk listener-nya.
**Solusi:** Taruh event listener di luar `render()`, di level atas file.
**Pelajaran:** `render()` tugasnya hanya gambar ulang UI — bukan setup event.

---

### Error 4 — Nama variable konflik di dalam `forEach`
**Kode salah:**
```js
todos.forEach(function(todo) {
  let todo = document.createElement("li"); // konflik
});
```
**Masalah:** Parameter `todo` dari forEach dan `let todo` di dalam block punya nama sama — JS bingung, error deklarasi duplikat.
**Solusi:** Ganti nama variable elemen DOM jadi berbeda, misalnya `li`.
**Pelajaran:** Nama variable harus unik dalam satu scope.

---

### Error 5 — `filter` hasilnya tidak di-assign
**Kode salah:**
```js
todos.filter((t) => t.id !== todo.id);
```
**Masalah:** `filter` return array baru tapi tidak disimpan ke mana-mana — array `todos` tidak berubah, item tidak terhapus.
**Solusi:**
```js
todos = todos.filter((t) => t.id !== todo.id);
```
**Pelajaran:** `filter` tidak mengubah array asli — hasilnya harus di-assign balik.

---

### Error 6 — Assignment bukan comparison di filter
**Kode salah:**
```js
return (todo.completed = false);
```
**Masalah:** `=` adalah assignment, bukan comparison. Ini merusak data `todo.completed` di array setiap kali filter dijalankan.
**Solusi:**
```js
return todo.completed === false;
```
**Pelajaran:** Di dalam kondisi `filter`, selalu pakai `===` bukan `=`.

---

### Error 7 — `checkbox.checked` tidak di-sync saat render
**Masalah:** Setelah toggle dan `render()` dipanggil, checkbox baru di-generate dari nol tanpa tau state `completed`-nya — muncul selalu unchecked.
**Solusi:** Tambah baris ini saat membuat checkbox di dalam `render()`:
```js
checkbox.checked = todo.completed;
```
**Pelajaran:** Setiap elemen yang di-generate ulang harus di-sync ke state array, bukan ke DOM lama.

---

## Sesi 2: Fetch API

### Error 8 — `await` di luar `async function`
**Kode salah:**
```js
const data = fetch("...");
return await data;
```
**Masalah:** `await` hanya valid di dalam `async function`. `return` di level script juga tidak valid.
**Solusi:**
```js
async function getData() {
  const response = await fetch("...");
  const data = await response.json();
}
getData();
```
**Pelajaran:** Setiap kali pakai `await`, function pembungkusnya harus `async`.

---

### Error 9 — `li.push()` di elemen DOM
**Kode salah:**
```js
li.push({ title: todo.title });
```
**Masalah:** `push` adalah method array — elemen DOM tidak punya method itu.
**Solusi:**
```js
li.textContent = todo.title;
```
**Pelajaran:** Untuk nampilin teks ke elemen DOM, pakai `textContent` atau `innerHTML`.

---

### Error 10 — `response` di-declare di dalam `try`, dipakai di luar
**Kode salah:**
```js
try {
  const response = await fetch("...");
}
const data = await response.json(); // response tidak dikenal di sini
```
**Masalah:** Variable yang di-declare dengan `const`/`let` di dalam block `{}` tidak bisa diakses di luar block itu (block scope).
**Solusi:** Semua logic yang butuh `response` harus ada di dalam `try`.
**Pelajaran:** Perhatikan scope — variable hanya hidup di dalam block tempat dia di-declare.