// console.log(document);
// var send = document.getElementById("findWord").getElementsByTagName('input')[0];
// form.addEventListener('onclick', function(e) {
//   e.preventDefault();
//   var word = form.getElementsByTagName('input')[0].value;
//   console.log(word);
// });
//

var front = (function() {
  var requestState = false
  var button = document.getElementsByTagName('button')[0];
  var input = document.getElementsByTagName('input')[0];

  var findWordsQuery = function(word) {
    return "/find/:" + word.replace(/[^\w+]/g, '');
  };

  button.addEventListener('click', function() {
    var query = findWordsQuery(input.value);
    var req = new XMLHttpRequest();
    req.open('GET', query);
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
      }
    }
    req.send();


  });

  return {
    requestState : requestState,
    findWordsQuery: findWordsQuery
  };
}());

console.log(front);
console.log(typeof front.findWordsQuery);
