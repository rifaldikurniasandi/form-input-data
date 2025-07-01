// 🔗 PASTE URL WEB APP DARI GOOGLE APPS SCRIPT DI SINI
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwcFJWrNGNE38-1J-4JEuyz2YGcD5nyPKkSwamPykERqaBVL0VBcyDZqeQvxrXaXjbq/exec";

const form = document.getElementById("dataForm");
const submitButton = document.getElementById("submitButton");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = "Mengirim...";
  statusDiv.innerText = "";

  const formData = new FormData(form);
  const dataObject = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      // GANTI INI:
      "Content-Type": "text/plain;charset=utf-8", // <-- PERUBAHAN KRUSIAL DI SINI
    },
    body: JSON.stringify(dataObject),
  })
    .then((response) => {
      statusDiv.innerText = "✅ Data berhasil terkirim!";
      statusDiv.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      statusDiv.innerText = "❌ Terjadi kesalahan. Coba lagi.";
      statusDiv.style.color = "red";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerText = "Kirim Data";
    });
});
