/**
 * Google Apps Script - Label Analyzer Webhook
 * 
 * 部署步驟：
 * 1. 到 https://script.google.com 建立新專案
 * 2. 貼上此程式碼
 * 3. 修改下方 SPREADSHEET_ID 為你的 Google Sheets ID
 *    （從試算表網址中取得：https://docs.google.com/spreadsheets/d/【這段就是ID】/edit）
 * 4. 點選「部署」>「新增部署」
 * 5. 類型選「網頁應用程式」
 * 6. 執行身分：「我」
 * 7. 存取權：「所有人」
 * 8. 部署後複製 Web App URL
 * 9. 在 AI Edge Gallery 的 skill secret 提示中貼入此 URL
 */

const SPREADSHEET_ID = '你的_GOOGLE_SHEETS_ID';  // ← 請替換

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = (SPREADSHEET_ID && SPREADSHEET_ID !== '你的_GOOGLE_SHEETS_ID')
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    // --- 明細 Sheet ---
    let detail = ss.getSheetByName('標籤明細');
    if (!detail) {
      detail = ss.insertSheet('標籤明細');
      detail.appendRow(['上傳時間', '序號', '品名', '淨重', '有效日期']);
      detail.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#1a73e8').setFontColor('#fff');
      detail.setFrozenRows(1);
    }

    const data = payload.data || [];
    if (data.length > 0) {
      const rows = data.map((item, i) => [
        now, i + 1, item.product_name || '', item.net_weight || '', item.expiry_date || ''
      ]);
      detail.getRange(detail.getLastRow() + 1, 1, rows.length, 5).setValues(rows);
    }

    // --- 合計 Sheet ---
    let sum = ss.getSheetByName('日期合計');
    if (!sum) {
      sum = ss.insertSheet('日期合計');
      sum.appendRow(['上傳時間', '有效日期', '產品數量', '品名列表', '合計淨重']);
      sum.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#0d904f').setFontColor('#fff');
      sum.setFrozenRows(1);
    }

    const summary = payload.summary || [];
    if (summary.length > 0) {
      const sRows = summary.map(row => [
        now, row.expiry_date || '', row.count || 0, row.products || '', row.total_weight || ''
      ]);
      sum.getRange(sum.getLastRow() + 1, 1, sRows.length, 5).setValues(sRows);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', detail_rows: data.length, summary_rows: summary.length }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Label Analyzer webhook is running.').setMimeType(ContentService.MimeType.TEXT);
}
