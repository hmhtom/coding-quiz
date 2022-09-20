// Statusbar Elements
let statusBox = document.querySelector("#status-area")
let timerBox = document.querySelector("#timer")
//Startpage Elements
let startPage = document.querySelector("#start-container")
let startBtn = document.querySelector("#start-button")
//Quiapage Elements
let quizPage = document.querySelector("#quiz-container")
let questionBox = document.querySelector("#question-area")
let answerBox = document.querySelector("#answer-area")
let resultBox = document.querySelector("#question-result")
//Finishpage Elements
let finishPage = document.querySelector("#finish-container")
let finalScore = document.querySelector("#final-score")
let initialInput = document.querySelector("#initial-input")
let submitBtn = document.querySelector("#submit-button")
//Highscore Elements
let highScorePage = document.querySelector("#highscore-container")
let highScoreList = document.querySelector("#highscore-list")
let restartBtn = document.querySelector("#restart-button")
let clearBtn = document.querySelector("#clear-button")
//Global Variables
let quizStart
let quizScore
let questionIndex
let timer
let scoreList
//Question list contains all the questions(question:String, choice:Array, answer:String)
const questionList = [{
    question:"document.querySelectorAll() will return a ____ representing all the document's elements that match the selector.",
    choice:["array", "string", "nodelist", "selector ID"],
    answer:"3"
}, {
    question:"Element.setAttribute() will ____ an existing attribute of an element.",
    choice:["delete", "update", "add", "return"],
    answer:"2"
}, {
    question:"Javascript objects contains ____/____ pairs.",
    choice:["value/key", "index/value", "key/value", "value/index"],
    answer:"3"
}, {
    question:"We can use ____ to remove the first element of an array.",
    choice:["pop()", "delete()", "shift()", "unshift()"],
    answer:"3"
}, {
    question:"If we want a function to excute with a fixed time delay between each call, we can use ____ .",
    choice:["setInterval()", "setTimeout()", "setTimer()", "setCall()"],
    answer:"1"
}, {
    question:"Which of the following is NOT a way to declare a variable in Javascript?",
    choice:["let", "var", "const", "int"],
    answer:"4"
}, {
    question:"for(i=1;i<5;i++), how many times will this for loop excute",
    choice:["3", "4", "5", "6"],
    answer:"2"
}, {
    question:"string.concat() will combine two string and returns a ____ .",
    choice:["string", "array", "object", "tuple"],
    answer:"1"
}, {
    question:"When a variable is declared outside of any function, it is called a ____ variable.",
    choice:["public", "shared", "global", "local"],
    answer:"3"
}, {
    question:"Javascript has a keyword '.this', which can be used in a method refer to the ____ object.",
    choice:["instance", "parent", "children", "current"],
    answer:"4"
}]

//Load startpage when webapp loads
renderStartPage()

//quiz(time:Number)
//main process for the quiz
//Parameter: time(Number): Represent the time interval for the quiz
function quiz(time){
    //timer is in every 10 millisecond
    timer = time*100
    //Initializing
    quizStart = true
    quizScore = 0
    questionIndex = 0
    renderQuizPage()  //render quiz page
    questionRender(questionIndex)
    
    //mainQuizRender
    const quizTimeInterval = setInterval(function (){
        timer--  //timer countdown
        timerBox.innerHTML = Math.ceil(timer/100)  //timer display in second

        if(timer <= 0||quizStart === false){
            quizStart === false
            renderFinalScorePage()
            timerBox.innerHTML = ""
            clearInterval(quizTimeInterval)
        }
    }, 10)
    
}

//questionRender(index:Number)
//Render a question in the quiz area with index given
//parameter(index): represent the index which the question locate in the questionList
function questionRender(index){
    questionBox.innerHTML = questionList[index].question
    for(let i=0;i<answerBox.children.length;i++){
        answerBox.children[i].innerHTML = answerBox.children[i].dataset.index + ". " + questionList[index].choice[i]
    }
}

//Render each question's result
function renderRightResult(){
    resultBox.innerHTML = "Correct!!"
    const resultRender = setTimeout(function(){
        resultBox.innerHTML = ""
    }, 700)
}
function renderWrongResult(){
    resultBox.innerHTML = "Wrong Answer :("
    const resultRender = setTimeout(function(){
        resultBox.innerHTML = ""
    }, 700)
}

//Page Renderers
function renderStartPage(){
    statusBox.style.display = "flex"
    startPage.style.display = "flex"
    quizPage.style.display = "none"
    finishPage.style.display = "none"
    highScorePage.style.display = "none"
}
function renderQuizPage(){
    startPage.style.display = "none"
    quizPage.style.display = "flex"
    finishPage.style.display = "none"
    highScorePage.style.display = "none"     
}
function renderFinalScorePage(){
    startPage.style.display = "none"
    quizPage.style.display = "none"
    finishPage.style.display = "flex"  
    highScorePage.style.display = "none"
    
    finalScore.innerHTML = quizScore
}
function renderHighScorePage(){
    statusBox.style.display = "none"
    startPage.style.display = "none"
    quizPage.style.display = "none"
    finishPage.style.display = "none"
    highScorePage.style.display = "flex" 


    for(var i=0; i<scoreList.length;i++) {
        var li = document.createElement("li")
        li.textContent = `${scoreList[i][0]}  ${scoreList[i][1]}`
        highScoreList.appendChild(li)
    }
}

//Click event on start button
startBtn.addEventListener("click", e => {
    quiz(90)
})
//Click event answer buttons
answerBox.addEventListener("click", e => {
    var element = e.target
    if(element.matches("button")){
        //Compare user input with answers
        if(element.dataset.index === questionList[questionIndex].answer){
            //right result
            renderRightResult()
            quizScore += 10
        }
        else{
            //wrong result
            timer = timer - 1000
            renderWrongResult()
            
        }
    }
    questionIndex ++
    if(questionIndex < questionList.length){
        questionRender(questionIndex)
    }else{
        quizStart=false
    }
})
//Click event for submit button
submitBtn.addEventListener("click", e => {
    if(initialInput.value.trim().length === 0){
        alert("Please enter your initial.")
    }else{
        if(localStorage.getItem("scorelist")  === null){
            scoreList = [[initialInput.value,quizScore]]
        }else{
            scoreList = JSON.parse(localStorage.getItem("scorelist"))
            scoreList.push([initialInput.value,quizScore])
            scoreList.sort((a, b) => {
                return b[1] - a[1]
            })
        }
        localStorage.setItem("scorelist", JSON.stringify(scoreList))
        renderHighScorePage()
    }
    
})
//Click event for restart button
restartBtn.addEventListener("click", e => {
    highScoreList.innerHTML = ""
    renderStartPage()
})
//Click event for clear score button
clearBtn.addEventListener("click", e => {
    highScoreList.innerHTML = ""
    localStorage.removeItem("scorelist")
})

