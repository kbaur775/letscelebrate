var question = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings","booleans","alerts","numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes","curly brackets","parentheses","square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["numbers and strings","other arrays","booleans","all of the above"],
      answer: "all of the above"
    },
    {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas","curly brackets","quotes","parentheses"],
      answer: "quotes"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript","terminal / bash","for loops","console.log"],
      answer: "console.log"
    }
  ];


var elementsArea = document.querySelector("#lab-space");
var questionsArea = document.querySelector("#question-space");
var answersArea = document.querySelector("#answers-space");

var counter = 0;

var intervalState;
var timerText = document.createElement("p");
var seconds = 25;
timerText.textContent = seconds;
elementsArea.appendChild(timerText);


var startButton = document.createElement("button");
startButton.textContent = "start";
elementsArea.appendChild(startButton);

var stopButton = document.createElement("button");
stopButton.textContent = "stop";
elementsArea.appendChild(stopButton);

var endButton = document.createElement("button");
endButton.textContent = "end";
elementsArea.appendChild(endButton);

function startGame(){
  startButton.style.visibility = "hidden";
  var seconds = 25;
  console.log(seconds);
  intervalState = setInterval(function(){
    seconds --;
    timerText.textContent = seconds;
    if(seconds <= 0) {
      clearInterval(intervalState)
      startButton.style.visibility = "visible";
      console.log("time up!")
    }
  }, 1000)

  var questionElement = question[counter].title;

  var questionText = document.createElement("h3");
  questionText.textContent = questionElement;
  questionsArea.appendChild(questionText);
 console.log(questionElement);


 question[counter].choices.forEach(choices => {

  var choice = document.createElement("button"); //Create the element
  answersArea.appendChild(choice);
  choice.textContent = choices; // button's text content 
  choice.value = choices; // button's value
  choice.onclick = checkAnswer;
  //button event listener

  function checkAnswer() {
    console.log(choice);
    console.log(question[counter].answer);
    if (choice === question[counter].answer){
      alert("correct");
    }
  }

 })


}

  


  function endTimer(){
    var endElement = document.createElement("p");
    clearInterval(intervalState);
    endElement.textContent = "Quiz ended. Remaining seconds: " + seconds;
    elementsArea.appendChild(endElement);
  }




startButton.addEventListener("click", startGame)
endButton.addEventListener("click", endTimer)