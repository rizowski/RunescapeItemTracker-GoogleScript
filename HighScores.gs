this.skills = ["Overall","Attack","Defence","Strength",
               "Hitpoints","Ranged","Prayer","Magic","Cooking", 
               "Woodcutting","Fletching","Fishing","Firemaking",
               "Crafting","Smithing","Mining","Herblore","Agility", 
               "Thieving","Slayer","Farming","Runecrafting","Hunter", 
               "Construction","Summoning","Dungeoneering",
               
               "Bounty Hunter","Bounty Hunter Rogues","Dominion Tower", 
               "The Crucible","Castle Wars","B.A Attackers","B.A Defenders", 
               "B.A Collectors","B.A Healers","Duel Tournament","Mobilising Armies",
               "Conquest","Fist of Guthix","GG: Resource Race","GG: Athetics"];
/**
 * Gets the highscores from the poorly constructed Runescape api. This is a members only feature.
 * [level, xp, rank]
 * @param {string} username 
 * @param {boolean} oldSchoolServer
 * @return {object} returns user[][]
 */
function getHighScores(username,old) {
  if(old == null){
   old = false; 
  }
  var cache = CacheService.getPublicCache();
  var user = cache[username];
  if(user !=null){
    return user;
  }
  if(typeof(old) !== "boolean"){
   throw "Must have a true false operator"; 
  }
  if(old){
    var url = "http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
  }else{
    var url = "http://hiscore.runescape.com/index_lite.ws?player=";
  }
  var data = getURLData(url, username);
  var array = data.split('\n');
  var endResult=[];
  var inserted = false;
  for(var i =0; i< skills.length; i++){
    var items=  array[i].split(',');
    if(i<26){
    endResult[i] = [this.skills[i],items[0],items[1], items[2]];
    }else{
      if(!inserted){
       endResult[i] = ["Game","Rank","Score"];
        inserted = true;
      }
      endResult[i+1] = [this.skills[i],items[0],items[1]];
    }
  }
  cache.put(username, endResult,3600);
  return endResult;
}
