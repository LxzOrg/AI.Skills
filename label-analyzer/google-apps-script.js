/**
 * Google Apps Script - Label Analyzer Webhook（進階用戶可選）
 * 
 * 大多數使用者不需要這個，用「分享 CSV」或「複製表格」即可。
 * 
 * 部署步驟：
 * 1. https://script.google.com → 新增專案
 * 2. 貼上此程式碼
 * 3. 修改 SPREADSHEET_ID
 * 4. 部署 → 網頁應用程式 → 存取權「所有人」
 * 5. 複製 Web App URL → 貼到 skill 的 secret 欄位
 */

const SPREADSHEET_ID = '替換成你的_SHEETS_ID';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SPREADSHEET_ID !== '替換成你的_SHEETS_ID'
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    let detail = ss.getSheetByName('標籤明細');
    if (!detail) {
      detail = ss.insertSheet('標籤明細');
      detail.appendRow(['上傳時間', '序號', '品名', '淨重', '有效日期']);
      detail.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#1a73e8').setFontColor('#fff');
      detail.setFrozenRows(1);
    }
    const data = payload.data || [];
    if (data.length > 0) {
      const rows = data.map((item, i) => [now, i+1, item.product_name||'', item.net_weight||'', item.expiry_date||'']);
      detail.getRange(detail.getLastRow()+1, 1, rows.length, 5).setValues(rows);
    }

    let sum = ss.getSheetByName('日期合計');
    if (!sum) {
      sum = ss.insertSheet('日期合計');
      sum.appendRow(['上傳時間', '有效日期', '產品數量', '品名列表', '合計淨重']);
      sum.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#0d904f').setFontColor('#fff');
      sum.setFrozenRows(1);
    }
    const summary = payload.summary || [];
    if (summary.length > 0) {
      const sRows = summary.map(r => [now, r.expiry_date||'', r.count||0, r.products||'', r.total_weight||'']);
      sum.getRange(sum.getLastRow()+1, 1, sRows.length, 5).setValues(sRows);
    }

    return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error',message:err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Label Analyzer webhook OK').setMimeType(ContentService.MimeType.TEXT);
}
