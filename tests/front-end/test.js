var frontTests = (function() {
  var iframe = document.getElementById('iframe');
  var target = iframe.contentDocument || iframe.contentWindow.document;
  test('heading exists', function(assert) {
    assert.ok(target.getElementsByTagName('h1')[0], "passed");
  });
}());
