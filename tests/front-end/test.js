setTimeout(function(event) {
  var iframe = document.getElementById('iframe');
  var target =  iframe.contentWindow.document || iframe.contentDocument;
  var inputDiv, inputBox, sendButton, f;

  test('heading exists', function(assert) {
    assert.ok(target.getElementsByTagName('h1')[0], "passed");
  });

  inputDiv = target.getElementsByClassName('inputDiv')[0];
  test('input elements exist', function(assert) {
    // assert.ok(target.getElementsByTagName('h1')[0], "passed");
    assert.ok(inputDiv, "inputDiv exists");
    inputBox = inputDiv.getElementsByTagName('input')[0];
    assert.ok(inputBox, "inputBox exists");
    sendButton = inputDiv.getElementsByTagName('button')[0];
    assert.ok(sendButton, "sent button exists");
  });
  front = iframe.contentWindow.front;
  test('front-end script exists', function(assert) {
    // assert.ok(target.getElementsByTagName('h1')[0], "passed");
    assert.ok(front, "script loaded");
  });

  test('correct query created', function(assert) {
    var f = front.findWordsQuery;
    assert.ok(typeof f === 'function', "function exists");
    var expected = "/find/:woah";
    inputBox.value = "woah";
    assert.equal(expected, f("woah"), "correct query found");
    expected = "/find/:";
    inputBox.value = "";
    assert.equal(expected, f(""), "correct query for empty search");
    expected = "/find/:abc";
    inputBox.value = ":!!...abc";
    assert.equal(f(":!!...abc"), expected, "punctuation handled");
  });

  // test('correct query created', function(assert) {
  //   sendButton.dispatchEvent(new Event('click'));
  // });

  // test('clicking send gets status code 200 response', function(assert) {
  //   assert.ok(target.getElementsByTagName('h1')[0], "passed");
  // });
}, 500);
