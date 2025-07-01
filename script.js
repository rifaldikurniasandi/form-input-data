// 🔗 PASTE URL WEB APP DARI GOOGLE APPS SCRIPT DI SINI
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbykoDTq4t_Dah-wIWzdMikj-sB50Hv9IjdlMEw8PwQQ3D3UB7mSj5XTd3nNV-d_c-EA/exec"; // Ganti dengan URL exec Anda!

const form = document.getElementById("dataForm");
const submitButton = document.getElementById("submitButton");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah form mengirim data dengan cara default

  submitButton.disabled = true;
  submitButton.innerText = "Mengirim...";
  statusDiv.innerText = "";

  const formData = new FormData(form);

  console.log(
    "Data yang akan dikirim (FormData):",
    Object.fromEntries(formData.entries())
  );

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then((response) => {
      statusDiv.innerText = "✅ Data berhasil terkirim!";
      statusDiv.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      console.error("Error saat mengirim data:", error.message);
      statusDiv.innerText = "❌ Terjadi kesalahan saat mengirim. Coba lagi.";
      statusDiv.style.color = "red";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerText = "Kirim Data";
    });
});
