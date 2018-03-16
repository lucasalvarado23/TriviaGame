var outOfTime = "false";

var init

window.onload = function() {
    init = document.getElementById(quiz)
    console.log(init)
}

function populate() {
    if (quiz.isEnded() || outOfTime == "true") {
        showScores();

    } else {
        // show question //
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

var c = 60;
var timer_is_on = false;

function displayCount() {
    document.getElementById('txt').value = c;
}

function count() {
    if (timer_is_on) {
        c = c - 1;
        displayCount();
        if (c == 0) {
            outOfTime = "true";
            populate();
        }
    }
}

var interval = setInterval(count, 1000);

function toggle() {
    if (timer_is_on) {
        timer_is_on = false;
        this.value = "Start count!"; // `toggle` is invoked by the button's event handler, so `this` is the button
    } else {
        timer_is_on = true;
        this.value = "Stop count!";
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        //timer//
        quiz.guess(guess);
        populate();
        console.log("btn" + id + "clicked")
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + "of" + quiz.questions.length;


}

function showScores() {
    var gameOverHtml = "<h1>right answers</h1>";
    var gameOverWrongHtml = "<h1>Wrong Answers</h1>";
    gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    gameOverWrongHtml += "<h2 id='score'> Your scores: " + (10 - quiz.score) +"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
    var element2 = document.getElementById("wrong");
    element2.innerHTML = gameOverWrongHtml;
    //start again botton//
    var button = document.createElement("btn")
    button.innerHTML = "New Game"
    element.appendChild(button);
    clearInterval(interval)
    document.getElementById("restart").onclick = function() {
        element.innerHTML = init
        populate()
        c = 12
        interval = setInterval(count, 1000);
    }
}

var questions = [
    new Question("Which country has won the most World cups?", ["Italy", "Germany", "Brazil", "France"], "Brazil"),
    new Question("Which European club team has won the most Champions leagues?", ["Barcelona", "Chelsea", "Manchester United", "Real Madrid"], "Real Madrid"),
    new Question("Which south American club team has won the most copa libertadores?", ["Independiente", "Nacional", "River Plate", "Boca Jrs"], "Independiente"),
    new Question("Which Famous Colombian striker is nicknamed “el tigre”?", ["Teo Gutierrez", "Falcao", "James Rodriguez", "Edwin Cardona"], "Falcao"),
    new Question("Peru qualified to the world cup and is attending this event after how many years?", ["12", "4", "36", "40"], "36"),
    new Question("Against which team did Diego Maradona score his legendary “hand of god” goal?", ["Brazil", "Spain", "England", "France"], "England"),
    new Question("Where was the 1990 World cup held?", ["Spain", "Argentina", "Brazil", "Italy"], "Italy"),
    new Question("Which one of these famous stars never played professional in their countries league?", ["Zidane", "Messi", "Ronaldo", "Figo"], "Messi"),
    new Question("Who is Argentina's national coach?", ["Sampaoli", "Basile", "Bianchi", "Sabella"], "Sampaoli"),
    new Question("Diego costa was born in Brazil but played for another national team. Which one?", ["Colombia", "Uruguay", "Portugal", "Spain"], "Spain"),
]

var quiz = new Quiz(questions);

populate();

toggle();