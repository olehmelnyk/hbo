const mongoose = require("mongoose");

const Show = require("./models/show");
const Season = require("./models/season");
const Episode = require("./models/episode");

mongoose.connection.dropDatabase(() => console.log("DB droped"));

Show.create([
  {
    title: "Game of Thrones",
    subtitle: "The winter is coming",
    startDate: "Sun Apr 17 2011 00:00:00 GMT+0300",
    trailerUri: "https://www.youtube.com/watch?v=wA38GCX4Tb0"
  }
]);

/*
GOT - https://en.wikipedia.org/wiki/List_of_Game_of_Thrones_episodes
season 1
    episode 1 - "Winter Is Coming"
    episode 2 - "The Kingsroad"
    episode 3 - "Lord Snow"
    episode 4 - "Cripples, Bastards, and Broken Things"
    episode 5 - "The Wolf and the Lion"
    episode 6 - "A Golden Crown"
    episode 7 - "You Win or You Die"
    episode 8 - "The Pointy End"
    episode 9 - "Baelor"
    episode 10 - "Fire and Blood"

season 2
    1   "The North Remembers"
    2   "The Night Lands"
    3   "What Is Dead May Never Die"
    4   "Garden of Bones"
    5   "The Ghost of Harrenhal"
    6   "The Old Gods and the New"
    7   "A Man Without Honor"
    8   "The Prince of Winterfell"
    9   "Blackwater"
    10  "Valar Morghulis"

seson 3
    1   Valar Dohaeris
    2   Dark Wings, Dark Words
    3   Walk of Punishment
    4   And Now His Watch Is Ended
    5   Kissed by Fire
    6   The Climb
    7   The Bear and the Maiden Fair
    8   Second Sons
    9   The Rains of Castamere
    10  Mhysa

season 4
    1   Two Swords
    2   The Lion and the Rose
    3   Breaker of Chains
    4   Oathkeeper
    5   First of His Name
    6   The Laws of Gods and Men
    7   Mockingbird
    8   The Mountain and the Viper
    9   The Watchers on the Wall
    10  The Children

season 5
    1   The Wars to Come
    2   The House of Black and White
    3   High Sparrow
    4   Sons of the Harpy
    5   Kill the Boy
    6   Unbowed, Unbent, Unbroken
    7   The Gift
    8   Hardhome
    9   The Dance of Dragons
    10  Mother's Mercy

season 6
    1   The Red Woman
    2   Home
    3   Oathbreaker
    4   Book of the Stranger
    5   The Door
    6   Blood of My Blood
    7   The Broken Man
    8   No One
    9   Battle of the Bastards
    10  The Winds of Winter

season 7
    1   Dragonstone
    2   Stormborn
    3   The Queen's Justice
    4   The Spoils of War
    5   Eastwatch
    6   Beyond the Wall
    7   The Dragon and the Wolf

season 8
    1
    2
    3
    4
    5
    6
*/
