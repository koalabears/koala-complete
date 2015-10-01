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
  var wordListDiv = document.getElementById('word-list');
  var defDiv = document.getElementById('definition');

  var lastLength = 0;

  var dictionaryQuery = function(word) {
    return "/find/:" + word.replace(/[^\w+]/g, '');
  };

  var wordsQuery = function(word) {
    return "/findWords/:" + word.replace(/[^\w+]/g, '');
  };

  // button.addEventListener('click', function() {
  //   var query = dictionaryQuery(input.value);
  //   var req = new XMLHttpRequest();
  //   req.open('GET', query);
  //   req.onreadystatechange = function() {
  //     if (req.readyState === 4 && req.status === 200) {
  //       console.log(req.responseText);
  //     }
  //   }
  //   req.send();
  // });

  input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
      var query = dictionaryQuery(words[0]);
      var req = new XMLHttpRequest();
      req.open('GET', query);
      req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
          defDiv.innerHTML = req.responseText;
        }
      }
      req.send();
    } else {
      var inputTxt = input.value;
      words = testWords.filter(function(word) {
        return (word.search(input.value) === 0);
      });
      printWords(words);
      if (lastLength === 2 && inputTxt.length === 3) {
        var query = wordsQuery(input.value);
        var req = new XMLHttpRequest();
        req.open('GET', query);
        req.onreadystatechange = function() {
          if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
          }
        }
        req.send();
      }
      lastLength = inputTxt.length;
    }
  })

  var printWords = function(words) {
    var html = "<ul>";
    var i = 0;
    words.forEach(function(word) {
      html += !i ? "<li>*" : "<li>";
      html += word + "</li>";
      i++;
    });
    html += "</ul>";
    wordListDiv.innerHTML = html;
  }

  var testWords = [
    "hello",
    "how",
    "are",
    "you",
    "mellon",
    "marie",
    "tomato",
    "eoin",
    "jack",
    "naaz",
    "justin"
  ];

  var words = testWords;
  printWords(words);

  return {
    requestState : requestState,
    findWordsQuery: dictionaryQuery
  };
}());

console.log(front);
console.log(typeof front.findWordsQuery);
