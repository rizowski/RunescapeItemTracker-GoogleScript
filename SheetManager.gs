/**
 * Creates a sheet with the specified name headers and frozen columns/rows
 * @param {string} sheetName 
 * @param {object} headerList
 * @param {number} frozenRowCount
 * @param {number} frozenColCount
 * @return {object} created sheet
 */
function createSheet(name, headers, rows, columns) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if(sheet == null){
    sheet = ss.insertSheet();
    sheet.setFrozenRows(rows);
    sheet.setFrozenColumns(columns)
    sheet.setName(name);
    sheet.appendRow(headers);
    setNamedRange_(ss,sheet);
  }
  return sheet;
}
/**
 * Sets a named Range based on spreadsheet and a specific sheet
 * 
 * 
 */
function setNamedRange_(spreadsheet, sheet){
  var sheetname = sheet.getName();
  if(sheetname == "ItemHistory"){
    var range = sheet.setActiveSelection(sheetname+"!A:C"); 
    spreadsheet.setNamedRange("History",range);
  }
  if(sheetname == "Data"){
    var range = sheet.setActiveSelection(sheetname+"!A:A");
    spreadsheet.setNamedRange("ItemId", range);
  }
}
