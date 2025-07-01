// Ganti "Sheet1" dengan nama sheet Anda jika berbeda
const NAMA_SHEET = "Sheet1"; // Pastikan ini nama sheet yang benar di spreadsheet Anda

function doPost(e) {
  Logger.log("--- doPOST START ---");
  Logger.log("Objek event 'e' diterima di doPost: " + JSON.stringify(e));

  // Periksa apakah 'e' dan 'e.postData' ada sebelum mencoba mengakses 'contents'
  if (!e || !e.postData || !e.postData.contents) {
    Logger.log("ERROR: Objek 'e' tidak memiliki properti 'postData' atau 'contents'. Ini mungkin permintaan GET atau POST yang tidak diformat dengan benar.");
    Logger.log("--- doPOST END with Error (Invalid Request) ---");
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: 'Permintaan tidak valid atau tidak berisi data yang diharapkan.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  Logger.log("e.postData.type: " + e.postData.type);
  Logger.log("e.postData.contents: " + e.postData.contents);

  try {
    const data = JSON.parse(e.postData.contents);
    Logger.log("Data setelah JSON.parse: " + JSON.stringify(data));

    const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();
    const SHEET = SPREADSHEET.getSheetByName(NAMA_SHEET);

    if (!SHEET) {
      Logger.log("ERROR: Sheet dengan nama '" + NAMA_SHEET + "' tidak ditemukan.");
      throw new Error("Sheet tidak ditemukan. Pastikan nama sheet benar di Apps Script dan Spreadsheet.");
    }

    const newRow = [
      data.tanggal || '',
      data.namaBarang || '',
      data.tipe || '',
      data.ukuran || '',
      data.warna || '',
      data.hasil || ''
    ];

    SHEET.appendRow(newRow);
    Logger.log("Baris baru berhasil ditambahkan: " + JSON.stringify(newRow));

    Logger.log("--- doPOST END with Success ---");
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Data berhasil ditambahkan!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("ERROR di dalam blok try/catch (masalah parsing JSON atau spreadsheet): " + error.toString());
    Logger.log("--- doPOST END with Error (Processing) ---");
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Tambahkan fungsi doGet ini untuk debugging
function doGet(e) {
  Logger.log("--- doGET START ---");
  Logger.log("Permintaan GET diterima. Objek event 'e' di doGet: " + JSON.stringify(e));
  Logger.log("Ini berarti Web App diakses langsung atau ada permintaan GET yang tidak disengaja.");
  Logger.log("--- doGET END ---");

  return ContentService
    .createTextOutput("Ini adalah Web App POST. Silakan kirim data menggunakan metode POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}
