require('./index.html');
require('./hamburgers.min.css');
require('./scss/style.scss');
require('./js/hammer.min.js');
var Navigation= require('./components/navigation.js');

var App = class {
  constructor() {
    this.navigation = new Navigation();
    this.info = new Info();
    this.questions = new Questions();
  }
}

var Info = class {
  constructor() {
    this.toggle = document.querySelector(".info .toggle");
    this.content = document.querySelector(".content");
    var _content = this.content;
    this.infoPanel = document.querySelector(".info");
    this.formPanel = document.querySelector(".form");
    var formSwipe = new Hammer(this.formPanel);
    formSwipe.on('swiperight', function() {
        _content.classList.toggle('info');
    });
    var infoSwipe = new Hammer(this.infoPanel);
    infoSwipe.on('swipeleft', function() {
      _content.classList.toggle('info');
    });
    console.log(this.toggle);
    this.toggle.addEventListener("click", () => {
      this.content.classList.toggle('info');
    });
  };
}

var Questions = class {
  constructor() {

    this.questions = document.querySelectorAll('.question');
    this.continues = document.querySelectorAll('.btn--continue');

    this.questionsArray = this.createQuestionArray(this.questions);
    this.continuesArray = this.createQuestionArray(this.continues);


    this.questionIndex = 0;

    this.continuesArray.forEach( (continueButton) => {
      continueButton.addEventListener('click', () => {
        this.displayNextCard();
      });
    });

    this.displayCard(this.questionsArray[this.questionIndex]);

  }
  createQuestionArray(nodeList) {
    var tempArray = [];
    nodeList.forEach( (question) => {
      tempArray.push(question);
    });
    return tempArray;
  }
  displayNextCard() {
    if (this.questionIndex < this.questionsArray.length - 1){
      this.displayNthCard(this.questionIndex + 1);
    } else {
      this.displayNthCard(0);
    }
  }
  displayNthCard(index) {
    console.log(this.questionIndex);
    console.log(index);
    this.removeCard(this.questionsArray[this.questionIndex]);
    this.displayCard(this.questionsArray[index]);
  }
  displayCard(card) {
    this.questionIndex = card.dataset.questionId - 1;
    card.classList.add('visible','appearing');
    // card.style.display = "initial";
    var entryTimeOut = window.setTimeout(function(){
      card.classList.remove('appearing');
    }, 350)
  }
  removeCard(card) {
    // card.style.display = "none";
    card.classList.add('disappearing');
    var exitTimeOut = window.setTimeout(function(){
      card.classList.remove('visible','disappearing');
    }, 150);
  }
  listQuestion() {
    this.questions.forEach( (question) => {
      console.log(question);
    });
  }
}

// helpers

// forEach method, could be shipped as part of an Object Literal/Module



var nav = document.querySelector('.navigation');
// var hammertime = new Hammer(nav);
// hammertime.on('swipeleft', function(ev) {
// 	console.log(ev);
// });

var Prepr = new App();
