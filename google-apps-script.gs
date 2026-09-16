/**
 * ضع هذا الكود داخل Apps Script المرتبط بـ Google Sheet.
 * ثم Deploy > New deployment > Web app
 * Execute as: Me
 * Who has access: حسب سياسة الوصول المناسبة لبياناتك.
 */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return json_([]);
  const headers = values[0].map(String);
  const rows = values.slice(1).filter(r => r.some(v => v !== '')).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h || ('عمود ' + (i + 1))] = row[i] || '');
    return obj;
  });
  return json_(rows);
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify({data:data}))
    .setMimeType(ContentService.MimeType.JSON);
}
