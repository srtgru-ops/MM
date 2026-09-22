/**
 * ربط لوحة مركز محترف بأربعة Google Sheets من خلال Apps Script واحد.
 * ضع معرّف كل ملف أدناه، ثم انشر السكربت Web app بصلاحية Anyone.
 */
const SOURCES = {
  free: {
    spreadsheetId: "1ZcKMPrFL9rFl3B254yfnHTR-weijkR5UPijSlM00J14",
    sheetName: "",
  },
  ibta: {
    spreadsheetId: "1LD-MRidAsYIjj3ffuXi-SA1tIZRnpxaLo91X75VLOoQ",
    sheetName: "",
  },
  pm: { spreadsheetId: "ضع_معرف_شيت_CBP_PM", sheetName: "" },
  osha: { spreadsheetId: "ضع_معرف_شيت_OSHA", sheetName: "" },
};

function doGet() {
  try {
    const forms = {};
    const connections = {};
    Object.keys(SOURCES).forEach(function (id) {
      const source = SOURCES[id];
      // يسمح بتوصيل النماذج بالتدريج، ويتجاوز المعرفات التي لم تُضف بعد.
      if (!source.spreadsheetId || source.spreadsheetId.indexOf("ضع_") === 0) {
        forms[id] = [];
        connections[id] = false;
        return;
      }
      forms[id] = readSource_(source);
      connections[id] = true;
    });
    return json_({
      success: true,
      forms: forms,
      connections: connections,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return json_({
      success: false,
      error: String((error && error.message) || error),
    });
  }
}

function readSource_(source) {
  const file = SpreadsheetApp.openById(source.spreadsheetId);
  const sheet = source.sheetName
    ? file.getSheetByName(source.sheetName)
    : file.getSheets()[0];
  if (!sheet)
    throw new Error("تعذر العثور على ورقة العمل: " + source.sheetName);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const headers = values[0].map(function (value, index) {
    return String(value || "عمود " + (index + 1)).trim();
  });
  return values
    .slice(1)
    .filter(function (row) {
      return row.some(function (value) {
        return value !== "";
      });
    })
    .map(function (row) {
      const item = {};
      headers.forEach(function (header, index) {
        item[header] = row[index] || "";
      });
      return item;
    });
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
