const mongoose = require("mongoose");

const Show = require("./models/show");
const Season = require("./models/season");
const Episode = require("./models/episode");

mongoose.connection.dropDatabase(() => console.log("Seed data applied ✔"));

// Game of Thrones
Show.create(
  {
    title: "Game of Thrones",
    subtitle: "The winter is coming",
    description: {
      short: "short description",
      long: "long description"
    },
    startDate: "Sun Apr 17 2011 00:00:00 GMT+0300",
    image: {
      suqare: "http://image.jpg",
      wide: "http://image.jpg",
      extraWide: "http://image.jpg"
    },
    trailerUri: "https://www.youtube.com/watch?v=wA38GCX4Tb0",
    priority: true
  },
  (error, show) => {
    if (error) throw new Error(error.message);

    Season.create(
      {
        seasonName: "Game of Thrones: Season 1",
        seasonNumber: 1,
        relatedShow: show._id
      },
      (error, season) => {
        if (error) throw new Error(error.message);

        Episode.create([
          {
            episodeName: "Winter Is Coming",
            episodeNumber: 1,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "The Kingsroad",
            episodeNumber: 2,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "Lord Snow",
            episodeNumber: 3,
            relatedShow: show._id,
            relatedSeason: season._id
          }
        ]);
      }
    );
  }
);

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

// Silicon Valley
Show.create(
  {
    title: "Silicon Valley",
    subtitle: "Changing the way things change.",
    description: {
      short: "short description",
      long:
        "Watch HBO's hit show, Silicon Valley online or on air Sundays at 10pm. Catch up on full episodes, character bios and more for HBO's original comedy series about a computer programmer with a game-changing algorithm."
    },
    startDate: "Sun Apr 06 2014 00:00:00 GMT+0300",
    image: {
      suqare: "http://image.jpg",
      wide: "http://image.jpg",
      extraWide: "http://image.jpg"
    },
    trailerUri: "https://www.youtube.com/watch?v=wA38GCX4Tb0",
    priority: true
  },
  (error, show) => {
    if (error) throw new Error(error.message);

    Season.create(
      {
        seasonName: "Startup With Silicon Valley",
        seasonNumber: 1,
        relatedShow: show._id
      },
      (error, season) => {
        if (error) throw new Error(error.message);

        Episode.create([
          {
            episodeName: "Minimum Viable Product",
            episodeNumber: 1,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "Articles of Incorporation",
            episodeNumber: 2,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "Optimal Tip-to-Tip Efficiency",
            episodeNumber: 3,
            relatedShow: show._id,
            relatedSeason: season._id
          }
        ]);
      }
    );
  }
);

// Rome
Show.create(
  {
    title: "Rome",
    subtitle: " What would You do for Power?",
    description: {
      short:
        "A down-to-earth account of the lives of both illustrious and ordinary Romans set in the last days of the Roman Republic.",
      long:
        "Generals and soldiers, masters and slaves, and husbands and wives all find themselves players in this epic series about the death of the republic, and birth of the most powerful empire in history."
    },
    startDate: "Sun Aug 28 2005 00:00:00 GMT+0300",
    image: {
      suqare: "http://image.jpg",
      wide: "http://image.jpg",
      extraWide: "http://image.jpg"
    },
    trailerUri: "https://www.youtube.com/watch?v=wA38GCX4Tb0",
    priority: false
  },
  (error, show) => {
    if (error) throw new Error(error.message);

    Season.create(
      {
        seasonName: "Rome: Season 1",
        seasonNumber: 1,
        relatedShow: show._id
      },
      (error, season) => {
        if (error) throw new Error(error.message);

        Episode.create([
          {
            episodeName: "The Stolen Eagle",
            episodeNumber: 1,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "An Owl in a Thornbush",
            episodeNumber: 2,
            relatedShow: show._id,
            relatedSeason: season._id
          },
          {
            episodeName: "How Titus Pullo Brought Down the Republic",
            episodeNumber: 3,
            relatedShow: show._id,
            relatedSeason: season._id
          }
        ]);
      }
    );
  }
);
