// Chad Williamson - Module 4
(function(window) {

  var helloSpeaker = {};
  var speakWord = "Hello";

  helloSpeaker.speak = function(name) {
    console.log([speakWord, name].join(" "));
  }

  helloSpeaker.speakSimple = function(name) {
    return [speakWord, name].join(" ");
  }

  window.helloSpeaker = helloSpeaker;
})(window);