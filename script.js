const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPTlC-8Wl52GCTxPR05vocVwBKe6wx6rMkdw33dqwvs50fV-lA8LGyAjr5Di44rvArMQ/exec";

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObject),
  })
    .then((response) => {
      statusDiv.innerText = "✅ Data berhasil terkirim!";
      statusDiv.style.color = "green";
      form.reset(); // Mengosongkan form
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
