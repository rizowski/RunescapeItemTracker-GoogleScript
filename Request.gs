/**
 * Handles errors for UrlFetchApp and fetches data from a specified url
 * Errors: Will return a string or hash["error"]
 * @param {string} url
 * @param {string} param
 * @return {string} returns webresponse
 */
function getURLData(url, param) {
  var response = null;
  try{
   response = UrlFetchApp.fetch(url + param);
  }catch(error){
    if(response == null){
      Logger.log(param);
      throw "Null Server Response"; 
    }
    return {"error":response.getResponseCode()};
  }
  return response.getContentText();
}
/**
 * Parses JSON for the Runescape API
 * @param {number} itemId
 * @return {object} JSON hash
 */
function getJsonObject_(itemId){
  var json = getURLData(this.itemUrl,itemId);
  return Utilities.jsonParse(json);
}
