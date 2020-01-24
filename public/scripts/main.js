//Redudent pointers! make allButtons variable the live pointer
function disableAllButtons(){
  var allButtons = document.querySelectorAll(".button")
  for (var i = 0; i < allButtons.length; ++i) {
    // disableButton(allButtons[i].id)
    document.getElementById(allButtons[i].id).disabled = true
  }
}

function enableAllButtons(){
  var allButtons = document.querySelectorAll(".button")
  for (var i = 0; i < allButtons.length; ++i) {
    // enableButton(allButtons[i].id)
    document.getElementById(allButtons[i].id).disabled = false
  }
}

function hideButtons(){
  var buttonDissapearAnime = anime({
    targets: '.hideableButton',
    scale: [
      {value: .2, easing: 'easeOutSine', duration: 2000},
      {value: .01, easing: 'linear', duration: 1000},
      // {value: 1, easing: 'easeInOutQuad', duration: 1000} //reappear
    ],
    delay: anime.stagger(1200),
    begin: function(){
      disableAllButtons()
    },
    complete: function(){
      enableAllButtons()
    }
  })
}

function showButtons(){
  var buttonReapearAnime = anime({
    targets: '.hideableButton',
    scale: [
      {value: 1, easing: 'easeOutSine', duration: 3000},
      // {value: .01, easing: 'linear', duration: 1000},
      // {value: 1, easing: 'easeInOutQuad', duration: 1000} //reappear
    ],
    delay: anime.stagger(1000),
    begin: function(){
      disableAllButtons()
    },
    complete: function(){
      enableAllButtons()
    }
  })
}

function toggleDestroyRestoreButton(destroyButton){
  // destroyButton.innerText = "Rebuild This Page"
//Toggles destroy / rebuild text
  var newWord = destroyButton.innerText
  var des = "DESTROY THIS PAGE"
  var res = "RESTORE THIS PAGE"

  if (newWord == des){
    newWord = res;
    // destroyButton.onClick = "restoreThisPage()";
    destroyButton.setAttribute( "onClick", "restoreThisPage()" );
  }else {
    newWord = des;
    // destroyButton.onClick = "hideWords()";
    // toggleDestroyRestoreButton(document.getElementById("destroyButton"))
    destroyButton.setAttribute( "onClick", "hideWords(); toggleDestroyRestoreButton(document.getElementById(\"destroyButton\"))" );
  }

  var newWord = destroyButton.innerText == des ? res : des

  setTimeout(function() {
    var theLetters = "Thomas{#}Thomas#%+=-" //subliminal messaging is legal right?

    var speed = 40 // speed of code letters// Larger is slower
    var increment = 5 // letter changes for each char //speed of whole

    var si = 0;
    // var stri = 0;
    // var block = "";
    // var fixed = "";
    var stri = 0;
    var block = "";
    var fixed = "";
    //Call self x times, whole function wrapped in setTimeout
    (function rustle ( i ) {
    setTimeout(function () {
      if (--i){rustle(i)}
      nextFrame( i )
      si = si + 1
    }, speed)
  })( newWord.length * increment + 1)
    function nextFrame(pos){
      for (var i = 0; i < newWord.length - stri; i++) {
        //Random number
        var num = Math.floor(theLetters.length * Math.random())
        //Get random letter
        var letter = theLetters.charAt(num)
        block = block + letter
      }
      if (si == (increment-1)){
        stri++
      }
      if (si == increment){
      // Add a letter

      // every speed*10 ms
      fixed = fixed +  newWord.charAt(stri - 1)
      si = 0
      }
      $(".destroyButton").html(fixed + block)
      block = ""
    }
   }, 1000)
}


// function disableButton(buttonID){
//   document.getElementById(buttonID).disabled = true
//   console.log(buttonID.toString() + " button has been disabled.")
// }

// function enableButton( buttonID ) {
//   document.getElementById(buttonID).disabled = false
//   console.log(buttonID.toString() + " button has been enabled.")



function colorProtected(color) {
  var protectedColors = [
    '1EAEDB', // link color (hex)
    'rgb(30, 174, 219)', // link color (rgb)
    '0FA0CE',  // hover / visited link color (hex)
    'rgb(240, 95, 49)', // hover / visited link color (rgb)
  ]

  return (protectedColors.indexOf(color) > -1)

}

//JQuery Practice to invert colors on page

$(document).ready(function(){
  $(".invert-theme").click(function(e){
    var colorProperties = ['color', 'background-color']
    $.each($("*").not(".hideableChar"), function() {
      var color = null
      var currentColor = null

      for (var prop in colorProperties) {
        prop = colorProperties[prop]
        currentColor = $(this).css(prop)

        if (!currentColor || colorProtected(currentColor)) continue

        color = new RGBColor($(this).css(prop))
        if (color.ok) {
          $(this).css(prop, 'rgb(' + (255 - color.r) + ', ' + (255 - color.g) + ', ' + (255 - color.b) + ')')
        }
        color = null
        currentColor = null
      }
    })
  })

})





//   $(".destroyButton").click(function(e){
//
//     var $text = $('#hi')
//     console.log($text.text())
//     var initText = $.trim($text.text()), ptr = 0
//     console.log(initText)
//     var timer = setInterval(function() {
//       var ln = $.trim($text.find('.trans').text().length)
//       if (ln == initText.length) { //escape clause
//         $text.empty()
//         clearInterval(timer)
//       }
//       $('#hi').html(function() {
//         var current_letter = $(this).html(initText.substring(ptr++ , ptr)).text()
//         // console.log()
//         if (current_letter != 'p') {
//           return $('<span>').addClass('trans')
//             .html(initText.substring(ptr++ , ptr))
//             .before($('<span>').addClass('trans').
//                     html(initText.substring(0 , ptr-1)))
//             .after(initText.substring(ptr))
//         }
//         }).find('span.removeMe').animate({'opacity': 0}, 200)
//
//     }, 150)
//   })
//
// })
