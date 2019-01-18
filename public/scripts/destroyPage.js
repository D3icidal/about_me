function replaceEachCharWithSpanWrapper(){
  $('.intro p *').html(function (i, html) {
    return this.innerText.replace(/(.)/g, '<span>$1</span>');
  });
};

function freezeChildHeights(parentElement) {
  if (parentElement === null) { return; }
  var children = parentElement.children;
  for(var i=0; i < children.length; i++) {
    var currentChild = children[i];
    $(currentChild).css('height', currentChild.offsetHeight);
  }
  return true;
};

function unwantedLettersRemaining(parentElement){
  return false;
  // return false if any parentElement.child contains a span without a class
}

function destroyPage() {
  var intro = document.getElementsByClassName("intro")[0];
  var lettersToKeep = ['h', 'i', 'r', 'e', 'm', 'e'];

  freezeChildHeights(intro);

  while (unwantedLettersRemaining()) {
    var children = parentElement.children;

    for(var i=0; i < children.length; i++) {
      var currentChild = children[i];
      // grab a current element
      // if it's one you want to keep, add class 'letter-kept'
      // else, add class 'letter-hidden'

      // var hideChar = document.createTextNode(intro.innerText.substr(intro.innerText.length - 1));
      // var hidden = document.getElementById("hidden");
      // hidden.appendChild(hideChar);
      // intro.innerText = intro.innerText.substr(0, intro.innerText.length - 1);
      // intro.appendChild(hidden);
    }
  }
}

function turnDestroyButtonIntoRebuildButton(destroyButton){
  $(destroyButton).text('Rebuild this page')
  $(destroyButton).click(function(e){
    location.reload();
  });
}

$(document).ready(function(){
  replaceEachCharWithSpanWrapper()

  var destroyButton = $('button[name="destroyButton"]');

  $(destroyButton).show();

  $(destroyButton).one('click', function(e){
    e.preventDefault();
    destroyPage();
    turnDestroyButtonIntoRebuildButton(destroyButton);
  });
});
