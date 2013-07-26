/**
 * Appends the data from getCurrentItemPrices to the ItemHistory sheet
 * 
 * 
 */
function logHistory(){
  var history = createSheet("ItemHistory", ["Date","ItemId","Price"],1,0);  
  var data = getCurrentItemPrices();
  for (var i = 0; i < data.length; i++){
    history.appendRow(data[i]);
  }
}
/**
 * Itterates over Runescape Ids from the Data spreadsheet gets the current price and returns the array
 * [date,itemId,price]
 * @return items[][]
 */
function getCurrentItemPrices(){
  //var data = createSheet("Data", [], 1, 2);
  var ss = SpreadsheetApp.openById("0ApfWd7fGI5rYdEYwWnVvUUI4LWxDbWxFZi1uUHpYcmc");
  //var ss = SpreadsheetApp.getActive();
  var datarange = ss.getRange("Responses!B:B");
  //var datarange = spreadsheet.getRangeByName("ItemId");
  var dvalues = datarange.getValues();
  
  var items = [];
  
  for(var i =1; i< dvalues.length; i++){
    var date = getDate_();
    var id = dvalues[i][0];
    if(id !== null){
      var price = getRsItemPrice(id*1);
      items.push([date,id, price]);
    }
  }
  return items;
}
/**
 * Gets the current date
 * 
 * @return {string} date
 */
function getDate_(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
  return today;
}
