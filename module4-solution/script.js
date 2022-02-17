// Chad Williamson - Module 4
(function(window) {

  const names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // Print to console using speak
  names.forEach(name => {
    var selectedSpeaker = (name.charAt(0).toLowerCase() == "j") ? byeSpeaker : helloSpeaker;
    selectedSpeaker.speak(name);
  });

  // Named callback function to be used by map. Uses speakSimple for return value
  function speak(name) {
    var selectedSpeaker = (name.charAt(0).toLowerCase() == "j") ? byeSpeaker : helloSpeaker; 
    return selectedSpeaker.speakSimple(name); 
  };

  // Use Array.prototype.map
  var spokenNames = names.map(speak);
  
  // Print the results out from the map
  spokenNames.forEach( spoken => {
    console.log(spoken);
  });

  // Reduce to 'hello', and 'bye' arrays
  var initialValue = { hello: [], bye: [] };
  var spokenNameReduction = spokenNames.reduce(function(prev, curr){
    if (curr.charAt(0).toLowerCase() == "h") {
      return {hello: prev.hello.concat(curr), bye: prev.bye};
    }
    return {hello: prev.hello, bye: prev.bye.concat(curr)};
  }, initialValue);

  // Print the 'hello' array
  spokenNameReduction.hello.forEach( hello => {
    console.log(hello)
  });

  // Print the 'bye' array
  spokenNameReduction.bye.forEach( bye => {
    console.log(bye)
  });

})(window);