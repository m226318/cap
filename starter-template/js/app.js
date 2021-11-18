// cards array holds all cards
//modified source code from here https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");
let answer =document.getElementsByClassName("answer");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");
//mos
 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1")

 // array for opened cards
var openedCards = [];
var roundnumber=0;
var secondscore=0;
var score=500;
var bo=0;
var randbox=0;
var boxflag = false;
var randanswer=0;
var rightcard;
// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description shuffles cards when page is refreshed / loads
console.log(document.getElementById('n'));
 console.log(Date());
document.body.onload = startGame();


// @description function to start a new play
function startGame(){
  boxflag = false;
  randbox = Math.floor(Math.random() * 10)+8;
  randanswer= Math.floor(Math.random() * cards.length);

  console.log(randbox)
    roundnumber+=1;
    console.log("roundnumber= ", roundnumber);
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled", "show1");
    }
    rightcard= cards[randanswer];
      document.getElementById("ans").className=("fa fa-"+rightcard.type);
    // reset moves


    //reset timer
    second = 15;
    minute = 0;
    hour = 0;
    document.getElementById("answer").style.visibility = "hidden";
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 15 secs";
    clearInterval(interval);
      startTimer();

}


// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 1){

        if(openedCards[0].type === rightcard.type){
            matched();

        } else {
            unmatched();
        }
    }
    console.log('score is', score);
    console.log('second score is',secondscore);
};


// @description when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
  //  openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
  //  openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
    score+=100;
    document.getElementById('score').innerHTML=score+secondscore;
    console.log('correct')
}


// description when cards don't match
function unmatched(){
  openedCards[0].classList.add("match", "disabled");
//  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
//  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
  score-=100;
  document.getElementById('score').innerHTML=score+secondscore;
  console.log('wrong')
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}




// @description game timer
var second = 15, minute = 0;
var timer = document.querySelector(".timer");
var timerover = document.querySelector(".overall");
var secondover=0, minuteover=1;
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        timerover.innerHTML = minuteover+"mins "+secondover+"secs";
        document.getElementById('score').innerHTML=score+secondscore;
        second--;
        secondover--;
        if(second == 0 && minute ==0){
          console.log("prit1")
          playAgain();
        }
        if(second<15 && second >10){
        for (var i = 0; i < cards.length; i++){
            cards[i].classList.add("show", "open", "match", "disabled");
        }
      }
      else {
        for (var i = 0; i < cards.length; i++){
            cards[i].classList.remove("show", "open", "match", "disabled");
        }
      }
        if(secondover <= 0 && minuteover <=0){


          location.replace("index.html");
        }

        if(second <= 0){
            second=15;
        }
        if(secondover <= 0){
          minuteover--;
          secondover=60;
        }
        if(second <=9){
          document.getElementById("answer").style.visibility = "visible";

        }
        if ( second <= 15-randbox && !boxflag){
          boxflag=true;
          document.getElementById("shape").style.visibility = "visible";
        }
        if(second > 10){
          document.getElementById("answer").style.visibility = "hidden";
          document.getElementById("shape").style.visibility = "hidden";
        }
    },1000);
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
  console.log('timeleft=',second);
  console.log('round left ', minuteover, secondover);
  console.log('level= 1');
    if (matchedCard.length == 1){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        // show congratulations modal
        modal.classList.add("show");
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}

function showAI(){
  score-=50
  ran=Math.floor(Math.random()*16)
  console.log('AI_used')
  console.log('time left toselect AI=',second);
  x=0;
  if(bo===0){
  for (var i = 0; i < cards.length; i++){
    if(cards[i].type==="diamond"  || i==ran){
      cards[i].classList.add("show1", "open", "match", "disabled");
      x+=1
    }
  }}
  console.log('number boxes AI=', x);
  bo=1;
};
// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      console.log("it ");
        if(document.getElementById("shape").style.visibility == "visible"){
          console.log("it works");
          document.getElementById("shape").style.visibility = "hidden";
          secondscore+=50;
          console.log(secondscore);
        }
    }
}


// @desciption for user to play Again
function playAgain(){
    modal.classList.remove("show", "show1");
    console.log(document.querySelector('input[name="fav_language"]:checked').value);
    console.log('overall', minuteover, secondover, 'round', second)
    bo=0;
    startGame();
}
document.getElementById('score').innerHTML = score+secondscore;

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
