// Chad Williamson - Module 4
(function(window) {

  var byeSpeaker = {};
  var speakWord = "Good Bye";

  byeSpeaker.speak = function(name) {
    console.log([speakWord, name].join(" "));
  }

  byeSpeaker.speakSimple = function(name) {
    return [speakWord, name].join(" ");
  }

  window.byeSpeaker = byeSpeaker;
})(window);