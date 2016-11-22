
var Navigation = class {
  constructor() {
    this.toggle = document.querySelector(".header .toggle");
    this.navPanel = document.querySelector(".navigation");
    var _navPanel = this.navPanel;
    var hammertime = new Hammer(this.navPanel);
    hammertime.on('swipeleft', function() {
    	// console.log(ev);
      _navPanel.classList.toggle('open');
    });
    this.toggle.addEventListener('click', () => {
      this.toggle.classList.toggle('is-active');
      this.navPanel.classList.toggle('open');
    });
  }
}

module.exports = Navigation;
