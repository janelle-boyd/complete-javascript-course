// Function Constructor

let Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// you can add functions to the prototype for inheritence
Person.prototype.calculateAge = function () {
    console.log(2019 - this.yearOfBirth);
}

// you can add properties to the prototype for inheritence
Person.prototype.lastName = 'Boyd';

// instantiation
let janelle = new Person('Janelle', 1995, 'UX Consultant');
janelle.calculateAge();

console.log(janelle instanceof Person);
console.log(janelle instanceof Object);
console.log(Person instanceof Object);
console.log(typeof janelle);
console.log(janelle.lastName);

// Object.create

let personProto = {
    calculateAge: function () {
        console.log(2016 - this.yearOfBirth);
    }
};

let Jr = Object.create(personProto);
Jr.name = 'Jr';
Jr.yearOfBirth = 2006;
Jr.job = 'Student';

let Allie = Object.create(personProto, {
    name: { value: 'Allie' },
    yearOfBirth: { value: 1991 },
    job: { value: 'Professor' }
});


// Passing Functions as Arguments

let years = [1995, 1996, 1997, 1998, 2006];

function arrayCalc(arr, fn) {
    let arrRes = [];
    arr.map((data) => {
        arrRes.push(fn(data));
    })
    return arrRes;
}

function calculateAge(el) {
    return new Date().getFullYear() - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    switch (el >= 18 && el <= 81) {
        case true:
            return Math.round(206.9 - (0.67 * el));
        default:
            return -1;
    }
}

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(ages, isFullAge);
let maxHeartRates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(maxHeartRates);


// Functions Returning Functions

function interviewQuestion(job) {
    switch (job) {
        case "DESIGNER":
            return function (name) {
                console.log(name + ', can you please explain what UX Design is?');
            }
        case "TEACHER":
            return function (name) {
                console.log('What subject do you teach, ' + name + '?');
            }
        default:
            return function (name) {
                console.log('Hello ' + name + ', what do you do?');
            }
    }
}

let teacherQuestion = interviewQuestion('TEACHER');
let designerQuestion = interviewQuestion('DESIGNER');
teacherQuestion('Janelle');
designerQuestion('Janelle');

interviewQuestion('DESIGNER')('Janelle');

// Closures

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function (yearOfBirth) {
        let age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

let retirementUS = retirement(66);
retirementUS(1995);
//retirement(66)(1995);

let retirementGermany = retirement(65);
let retirementIceland = retirement(67);

retirementGermany(1990);
retirementIceland(1990)
retirementUS(1990);

// Closure!

function interviewQuestion(job) {
    return function (name) {
        switch (job) {
            case "DESIGNER":
                console.log(name + ', can you please explain what UX Design is?');
                break;
            case "TEACHER":
                console.log('What subject do you teach, ' + name + '?');
                break;
            default:
                console.log('Hello ' + name + ', what do you do?');
                break;
        }
    }
}

interviewQuestion('DESIGNER')('Janelle');


// bind, call & apply

let emily = {
    name: 'Emily',
    age: 23,
    job: 'UX Consultant',
    presentation: function(style, timeOfDay) {
        switch (style) {
            case 'FORMAL':
                console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
                break;
            case 'FRIENDLY':
                console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
                break;
            default:
                break;
        }
    }
}

let sam = {
    name: 'Sam',
    age: 22,
    job: 'UX Designer',
}

emily.presentation('FORMAL', 'Morning');

// allows us to call an objects function & substitutes the 'this' object for the selected object
emily.presentation.call(sam, 'FRIENDLY', 'afternoon') 

// similar to .call but accepts an array of argruments
// emily.presentation.apply(sam, ['FRIENDLY', 'afternoon']); 

// generates a copy of the function and stores it in memory so we can use it later
let emilyFriendly = emily.presentation.bind(emily, 'FRIENDLY');
emilyFriendly('morning');
emilyFriendly('night');



/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function () {
    let Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.popQuiz = function() {
        let currentQuestion = quiz[question]

        console.log(currentQuestion.question + '\n' + quiz[question].toString(currentQuestion.answers));
        quiz[question].checkAnswer(currentQuestion);
    }

    Question.prototype.checkAnswer = function(currentQuestion) {
        let answer = prompt('Please select the correct answer (type a number) or enter \'exit\' to quit.');

        if (answer.toUpperCase() != "EXIT"){
            answer === String(currentQuestion.correctAnswer) ? console.log('Correct Answer!') : console.log('Incorrect!');
            quiz[question].getNextQuestion();
        }
    }

    Question.prototype.getNextQuestion = function() {
        question = (Math.floor(Math.random() * quiz.length));
        quiz[question].popQuiz();
    }

    Question.prototype.toString = function(answers) {
        let res = '';
        Object.keys(answers).forEach((key) => {
            res += key + ": " + answers[key] + "\n";
        })
        return res;
    }

    // init var
    let questions = ['Do you like cats?', 'Do you like dogs?', 'Do you like food?'];
    let answers = { 0: 'No', 1: 'Yes' };

    // question objects
    firstQuestion = new Question(questions.shift(), answers, 0);
    secondQuestion = new Question(questions.shift(), answers, 1);
    thirdQuestion = new Question(questions.shift(), answers, 1);
    let quiz = [firstQuestion, secondQuestion, thirdQuestion];
    let question = (Math.floor(Math.random() * quiz.length));

    // init
    quiz[question].popQuiz();
})();