

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
      if (inputTxt.length >= 3 && inputTxt.length !== lastLength) {
        var query = wordsQuery(input.value);
        var req = new XMLHttpRequest();
        req.open('GET', query);
        req.onreadystatechange = function() {
          if (req.readyState === 4 && req.status === 200) {
            arr = printWords(req.responseText.split(','));
          }
        }
        req.send();
      }
      lastLength = inputTxt.length;
    }
  });


  var printWords = function(words_) {
    words = words_;
    var html = "<ul>";
    var i = 0;
    words.forEach(function(word) {
      html += !i ? "<li>*" : "<li>";
      html += word + "</li>";
      i++;
    });
    html += "</ul>";
    wordListDiv.innerHTML = html;
  };

  return {
    requestState : requestState,
    findWordsQuery: dictionaryQuery
  };
}());

console.log(front);
console.log(typeof front.findWordsQuery);
