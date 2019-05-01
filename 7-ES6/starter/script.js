// Maps

// const question = new Map();
// question.set('question', 'What is the official name of the latest major JavaScript version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct answer!');
// question.set(false, 'Wrong answer!');

// console.log(question.get('question'));
// console.log(question.size);

// ES5 Classes
// var Person5 = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function () {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
//     Person5.call(this, name, yearOfBirth, job);
//     this.olympicGames = olympicGames;
//     this.medals = medals;
// }

// Athlete5.prototype = Object.create(Person5.prototype);

// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// ES6 Classes
// class Person6 {
//     constructor(name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge() {
//         var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
// }

// class Athlete6 extends Person6 {
//     constructor(name, yearOfBirth, job, olympicGames, medals) {
//         super();
//         this.olympicGames = olympicGames;
//         this.medals = medals;
//     }

//     wonMedal() {
//         this.medals++;
//         console.log(this.medals);
//     }
// }

// const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
// johnAthlete6.wonMedal();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, yearBuilt) {
        this.name = name;
        this.yearBuilt = yearBuilt;
    }
}

class Town {
    constructor(parks, streets) {
        this.parks = parks;
        this.streets = streets
    }

    getAvgParkAge() {
        const ages = this.parks.map((park) => new Date().getFullYear() - park.yearBuilt);
        const [totalAges, avgAge] = this.getAverage(ages);
        return [totalAges, avgAge];
    }

    getAvgStreetLength() {
        const [totalLength, avgLength] = this.getAverage(this.streets.map(street => street.streetLength));
        return [totalLength, avgLength];
    }

    getLargestPark() {
        let index;
        index = this.parks.map(park => park.trees).findIndex(tree => tree >= 1000);
        console.log(`${this.parks[index].name} has more than 1000 trees.`);
    }

    getAverage(arr) {
        const sum = arr.reduce((a, b) => { return a + b });
        return [sum, sum / arr.length];
    }
}

class Park extends Element {
    constructor(name, yearBuilt, area, trees) {
        super(name, yearBuilt);
        this.area = area;
        this.trees = trees;
    }

    getTreeDensity() { 
        return this.trees / this.area;
    }
}

class Street extends Element {
    constructor(name, yearBuilt, streetLength = 'normal') {
        super(name, yearBuilt);
        this.streetLength = streetLength;
    }

    classifyStreet() {
        let classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.yearBuilt}, is a ${classification.get(Math.round(this.streetLength))} street.`);
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

const town = new Town(allParks, allStreets);

// Reports
console.log(town.getAvgParkAge());

console.log(town.getAvgStreetLength());

town.getLargestPark();

allParks.map((park) => {
    console.log(park.getTreeDensity());
});

allStreets.map((street) => {
    street.classifyStreet();
});