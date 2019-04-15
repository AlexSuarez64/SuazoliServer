const { Call } = require("./models/call");
const mongoose = require("mongoose");
const config = require("config");

const calls = [{
    call: [{
            'name': 'Texans fall short against Los Angeles Rams',
            'description': 'LOS ANGELES, California Houston Texans fought hard during Saturday game against the Los Angeles Rams but fell just short after missing a longshot last-second field goal.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Colorado firefighters rescue horse trapped up to its torso in mud',
            'description': 'CASTLE ROCK, CO. First responders in Colorado worked late into the night to rescue a horse that became trapped in mud up to its torso.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Harris County voters to vote on multi-billion dollar bond referendum 1 year after Hurricane Harvey',
            'description': 'HOUSTON, Texas A year after Hurricane Harvey devastated our region, will Harris County voters get out and support a multi-billion dollar bond referendum?',
            'priority': 'Low',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'American Institute of Architects Sandcastle Competition brings beach-filled fun to Galveston',
            'description': 'GALVESTON, Texas This Saturday, more than 60 teams have their eyes and shovels set on winning the prestigious Golden Bucket Award in the 32nd Annual American Institute of Architects Sandcastle Competition.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Houston Rockets Chris Paul teams up with Nickelodeon for Worldwide Day of Play in Houston',
            'description': 'HOUSTON, Texas As students return to school, with the help of Nickelodeon, Houston Rockets star Chris Paul is helping get children hyped up for the new school year.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'HPD investigating homicide in NW Houston',
            'description': 'HOUSTON, Texas Police are investigating after a man was shot to death in northwest Houston.',
            'priority': 'Low',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'HPD officer involved in motorcycle accident expected to recover',
            'description': 'HOUSTON, Texas A Houston police officer is expected to recover following a crash along the Gulf Freeway.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Houston flies annoyingly high on list of U.S. cities with most mosquitoes',
            'description': 'HOUSTON, Texas Here is some annoyingly buzzy news: Houston ranks high on two new lists of the U.S. cities that combat the worst problems with mosquitoes.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Tropical Storm Lane dumping torrential rain on Hawaii; over 40 inches on Big Island',
            'description': 'Tropical Storm Lane is just south of Hawaii, moving in a north-northwest direction, on Saturday morning. The storm rain bands are producing significant rain and major flooding across parts of the Hawaiian Islands.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Ex-NFL player arrested for allegedly threatening funeral home staff',
            'description': 'SCOTTSDALE, Arizona Former NFL offensive lineman Richie Incognito bonded out of an Arizona jail Tuesday after being arrested on charges he threatened to shoot employees of a funeral home a day earlier, authorities said.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Unbearable conditions: Couple allowed kids to use and sell drugs in home',
            'description': 'WEST PLAINS, Missouri A Missouri couple is accused of letting their kids package and sell drugs.',
            'priority': 'Low',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'What is glioblastoma? More about the brain tumor afflicting John McCain',
            'description': 'Arizona Sen. John McCain announced this week that he had chosen to discontinue medical treatment for glioblastoma, an aggressive brain tumor that he been battling for more than a year.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': '4-month-old baby drowns in bathtub when mother falls asleep',
            'description': 'CHICAGO, Illinois A 4-month-old baby drowned in a bathtub in Chicago Friday night after police said the mother fell asleep while giving the baby a bath.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': '2 dead, 3 injured in shootings outside high school football games in 3 states',
            'description': 'A spate of shootings outside high school football games in three states on Friday night left two dead and at least three injured.',
            'priority': 'Low',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Popular YouTuber identified in wrong-way crash that killed mother and daughter',
            'description': 'CALIFORNIA The driver in a horrific wrong way crash that killed three people in California Thursday has been identified. Police say 18-year-old Trevor Heitmann was behind the wheel of a $200,000 McLaren sports car that barreled down the wrong side of the road.',
            'priority': 'High',
            'startDate': '3/19/2016',
            'completionDate': '',
        },
        {
            'name': 'Montgomery Fire Department poses with pups rescued from Walmart parking lot',
            'description': 'MONTGOMERY, Texas Firefighters: They extinguish flames, run head-first into burning buildings and might be able to convince you to adopt puppies.',
            'priority': 'Medium',
            'startDate': '3/19/2016',
            'completionDate': '',
        }
    ]
}];


async function seed() {
    await mongoose.connect(config.get("db"));
    await Call.deleteMany({});

    for (let c of calls) {
        const calls = c.call;
        await Call.insertMany(calls);
    }
    mongoose.disconnect();
    console.info("Done!");
}

seed();