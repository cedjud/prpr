var Questions = class {
  constructor(something) {
    
    console.log(this.something);
    this.questions = document.querySelectorAll('.question');
    this.continues = document.querySelectorAll('.btn--continue');

    this.questionsArray = this.createQuestionArray(this.questions);
    this.continuesArray = this.createQuestionArray(this.continues);


    this.questionIndex = 0;

    this.continuesArray.forEach( (continueButton) => {
      continueButton.addEventListener('click', () => {
        this.displayNextCard();
        tester();
      });
    });

    this.displayCard(this.questionsArray[this.questionIndex]);
    console.log(something.id)

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

module.exports = Questions;
