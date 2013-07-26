this.itemUrl = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=";
this.itemName = 0;
this.itemType = 1;
this.itemMember = 2;
this.itemPrice = 4;

/**
 * Retrieves Runescape Item data using various methods and returns the array of data.
 *
 * @param {number} itemId
 * @return {string} Returns Error if there is an error connecting to the server
 * @return {Object} Returns Item[]
 *
 */
function retrieveItemData(itemId){
  var cached = getCachedRsItem_(itemId);
  if(cached != null)
  {
    return cached;
  }
  var item = getJsonObject_(itemId);
  if(item == null){
    return "Temp Error";
  }
  if(item["error"]!= null){
   return item["error"];
  }
  
  var array = [];
  
  var rsItem = item["item"];
  array.push(rsItem["name"]);
  array.push(rsItem["type"]);
  array.push(rsItem["members"]);
  
  array.push(rsItem["current"]["trend"]);
  array.push(removeSymbols_(rsItem["current"]["price"]));
  
  array.push(rsItem["today"]["trend"]);
  array.push(removeSymbols_(rsItem["today"]["price"]));
  
  array.push(rsItem["day30"]["trend"]);
  array.push(removeSymbols_(rsItem["day30"]["change"]));
  
  array.push(rsItem["day90"]["trend"]);
  array.push(removeSymbols_(rsItem["day90"]["change"]));
  
  array.push(rsItem["day180"]["trend"]);
  array.push(removeSymbols_(rsItem["day180"]["change"]));
  
  array.push(rsItem["icon"]);
  cacheRsItem_(itemId, array);
  return array;
}
/**
 * Setup makes sure that all sheets are available. Trigger should be added for on open.
 */
function setup(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = ss.getSheetByName("Data");
  if(data == null){
    ss.insertSheet("Data");
  }
  //will be replaced with a database but wont be published
  var history = ss.getSheetByName("ItemHistory");
  if(history == null){
    ss.insertSheet("ItemHistory"); 
  }
}
/**
 * Checks the cache for the Runescape item price
 * @param {number} itemId
 * @return {number} returns rsPrice
 */
function getRsItemPrice(itemId){
  var item = retrieveItemData(itemId);
  return item[itemPrice];
}
/**
 * Checks the cache for the Runecape item name
 * @param {number} itemId
 * @return {string} returns rsName
 */
function getRsItemName(itemId){
  var item = retrieveItemData(itemId);
  return item[itemName];
}
/**
 * Checks the cache for the Runescape item type
 * @param {number} itemId
 * @return {string} returns rsType
 */
function getRsItemType(itemId){
  var item = retrieveItemData(itemId);
  return item[itemType];
}
/**
 * Checks the cache for the Runescape item member status
 * @param {number} itemId
 * @return {boolean} returns true or false
 */
function isRsItemMembers(itemId){
  var item = retrieveItemData(itemId);
  return item[itemMember];
}

/**
 * Removes + and % symbols from a string
 * @param {string} payload
 * @return {number} 
 */
function removeSymbols_(payload){
  payload = new String(payload);
  if(payload.indexOf("+") !== -1){
    payload = remove_(payload, "+", "");
  }
  if(payload.indexOf("%") !== -1){
     payload = remove_(payload, "%", "");
    return payload*.01;
  }
  return getKPrice_(payload);
}
/**
 * Removes any symbol and replaces it with what ever you want
 * 
 * @param {string} payload
 * @param {string} symbol
 * @param {string} replace
 * @return {string} returns the new string with replaced values
 */
function remove_(payload, symbol, replace){
  var val = new String(payload);
  return val.replace(symbol,replace);
}
/**
 * Takes in a price and adds extra zeros or turns the string into a number
 * Input that it can parse: $305 $5,000 2.5k 3.2m 1.3b
 * @param {string} payload 
 * @return {number} Returns the formatted number
 */
function getKPrice_(payload){
  var pattern = new RegExp(/\d*\.?,?\d*[kmb]?/);
  var price = new String(pattern.exec(payload));
  var actual = null;
  
  if(price.match(",")){
    pattern = new RegExp(/\d*\,?\d*/);
    actual = new String(pattern.exec(price));
    var array = actual.split(",");
    var thousands = array[0];
    thousands = thousands*1000;
    var hundreds = array[1]*1;
    actual = thousands + hundreds;
  }
  else if(price.match("k")){
    pattern = new RegExp(/\d*\.?\d*/);
    actual = pattern.exec(price);
    actual = actual*1000;
  }
  else if(price.match("m")){
    pattern = new RegExp(/\d*\.?\d*/);
    actual = pattern.exec(price);
    actual = actual*1000000;
  }
  else if(price.match("b")){
    pattern = new RegExp(/\d*\.?\d*/);
    actual = pattern.exec(price);
    actual = actual * 1000000000;
  }else{
    actual = price * 1;
  }
  
  return actual;
}