// console.log(document);
var send = document.getElementById("findWord").getElementsByTagName('input')[0];
form.addEventListener('onclick', function(e) {
  e.preventDefault();
  var word = form.getElementsByTagName('input')[0].value;
  console.log(word);
});
