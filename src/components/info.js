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

module.exports = Info;
