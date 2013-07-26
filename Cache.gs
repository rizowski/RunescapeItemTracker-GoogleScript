/**
 * Caches the Runescape item by its id for 60 minutes in the public cache
 * @param {number} id
 * @param {object} item
 * @return {object} returns item[]
 */
function cacheRsItem_(id, item) {
  var cache = CacheService.getPublicCache();
  return cache.put(id, item, 3600);//43200=12 hours, 3600 = 60 minutes, 1500 = 25 minutes
}
/**
 * Gets the cached Runescape item
 * @param {number} itemId
 * @return {object} returns item[]
 */
function getCachedRsItem_(itemId){
  var cache = CacheService.getPublicCache();
  return cache[itemId];
}
/**
 * Checks to see if the Runescape item is in the cache
 * @param {number} itemId
 * @return {boolean} returns true or false
 */
function isRsItemInCache_(itemId){
 var item = getCachedRsItem(itemId);
  if(item == null){
    return false;
  }
  return true;
}
/**
 * Removes a selected Runescape item from the cache
 * @param {number} itemId
 */
function removeRsItemFromCache(itemId){
 var is = isRsItemInCache_(itemId);
  if(is){
   var cache = CacheService.getPublicCache();
   cache.remove(itemId);
  }
}
