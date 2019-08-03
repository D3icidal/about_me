function destroyThisPage(){
  hideButtons()
  spanEachHideableChar(hideWords)
  toggleDestroyRestoreButton(document.getElementById("destroyButton"))
}

function restoreThisPage(){
  showButtons()
  showWords()
  toggleDestroyRestoreButton(document.getElementById("destroyButton"))
}

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
// }

function parseCodeLetters( codeLetters ) {
  return codeLetters.toLowerCase().split("")
}

// $(".destroyButton").click(function(e){
function spanEachHideableChar(callback) {
  var codeLetters = parseCodeLetters( 'Hire Thomas SystemsAdmin SoftwareEngineer' )

  // var $text = $('.hideable')

  var hideableSections = document.getElementsByClassName('hideable')
  for (let hideableString of hideableSections) {

    var parsedSpannedHTML = document.createElement('span')
    parsedSpannedHTML.classList.add('hideable_section')

  //add hideable to entire child for innerhtml elements like links
    innerHTMLChildren = hideableString.children
    if (innerHTMLChildren.length > 0){
      for (let i = 0; i < innerHTMLChildren.length; i++) {
        innerHTMLChildren[i].classList.add('codeLetters')
      }
    }

    for (let charI = 0; charI < hideableString.innerText.length + 1; charI++) {

      var hiddenCharSpan = document.createElement('span')
      hiddenCharSpan.classList.add('hideableChar')

      var hiddenChar = document.createTextNode(hideableString.innerText.charAt(charI))
      hiddenCharSpan.append(hiddenChar)

      if (hideableString.innerText.charAt(charI).toLowerCase() == codeLetters[0]) {
        // hiddenCharSpan.classList = 'codeLetters'
        hiddenCharSpan.classList.add('codeLetters')
        codeLetters.shift()
        // console.log(codeLetters)
      }
      // console.log(hiddenCharSpan.innerText)
      parsedSpannedHTML.append(hiddenCharSpan)

    }

      hideableString.innerHTML = parsedSpannedHTML.innerHTML

  }
  if (typeof callback === "function"){
    callback()
  }
    // $( this.innerHTML.innerText ).wrap("<span class='trans'></span>").
    // remaindingString.innerText = this.innerText.substring(charI + 1, this.innerText.length - 1)
    // console.log(parsedSpannedHTML.innerHTML)
}

function hideWords(){
  anime.timeline({loop: false})
    .add({
      targets: '.hideable .hideableChar',
      opacity: [1,0],
      // easing: "easeInOutQuad",
      easing: 'linear',
      // easing: 'easeInOutSine',
      duration: 750,
      // delay: anime.stagger(50)
      delay: function(el, i) {
        // return 50 * (i+1)
        return 10 * (i+1)
      },
      complete: function(){
        revealCodeWords()
      }
    })
}

function showWords(){
  anime.timeline({loop: false})
    .add({
      targets: '.hideable .hideableChar:not(.codeLetters) ',
      opacity: [0,1],
      easing: "easeInOutQuad",
      // easing: 'linear',
      // easing: 'easeInOutSine',
      duration: 850,
      delay: anime.stagger(10)
      // delay: function(el, i) {
      //   // return 50 * (i+1)
      //   return 10 * (i+1)
      // },
    })
}

function revealCodeWords(){
  anime.timeline({loop: false})
  .add({
    targets: '.hideable .codeLetters',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 850,
    delay: anime.stagger(50),
    // delay: function(el, i) {
    //   // return 50 * (i+1)
    //   return 100 * (i + 1)
    // }
  })
}






// .add({
//   targets: 'hideableChar',
//   opacity: 0.8,
//   duration: 3000,
//   easing: "easeInExpo",
//   delay: 7000
// })



//
// function destroyButton() {
//   // var timer = setInterval(function() {
//     var intro = document.getElementById("hi")
//     console.log("intro.innerText: " + intro.innerText)
//     console.log("intro.innerHTML: " + intro.innerHTML)
//     var ln = intro.innerText.length
//     console.log(ln)
//     // if (ln == 1) { //escape clause
//     //   clearInterval(timer)
//     // }
//     var hideChar = document.createTextNode(intro.innerText.substr(intro.innerText.length - 1))
//     console.log(hideChar)
//     var hidden = document.getElementById("hidden")
//     console.log("hidden before: " + hidden)
//
//     intro.innerText = wrap(intro.innerText, '<span class=\'.trans\' id=\'hide\'')
//     console.log("intro.innerHTML: " + intro.innerHTML)
//
//     if (hidden == true) {
//
//       hidden.appendChild(hideChar)
//       console.log("hidden after: " + hidden)
//       intro.innerText = intro.innerText.substr(0, intro.innerText.length-1)
//       intro.appendChild(hidden)
//       console.log(intro.innerHTML)
//     } else {
//       intro.innerText = intro.innerText.substr(0, intro.innerText.length-1)
//     }
//   }
//
// function wrap(originalText, wrapper) {
//   originalText.parentNode.prepend(wrapper, originalText)
//   wrapper.appendChild(originalText)
// }

        // console.log(remaindingString)
        // console.log(remaindingString.innerText.slice(charI, -1))
        // console.log(remaindingString.innerText.slice(charI, -1))
        // this.prepend(hiddenChar)
        // this.insertBefore(hiddenChar, this.lastChild)
        // this.innerText = remaindingString.innerText
        // this.append(remaindingString)
        // console.log(remaindingString)
        // console.log(hiddenChar)
        // this.append(remaindingString)
        // console.log(hiddenChar.innerHTML + "<>"+ remaindingString.innerHTML)
        // console.log(this.innerText.charAt(charI))

        // this.innerHTML = hiddenChar.innerHTML + remaindingString.innerText
        // this.firstChild.prependChild(hiddenChar)

        // hiddenChar.innerText = 't'



        // this.innerHTML.charAt(charI) = hiddenChar
        // this.insertBefore(hiddenChar, this.lastChild.previousSibling)


        // var hidden_span = document.createElement('span')
        // hidden_span.classList.add('blue')
        // hidden_span.innerText = this.innerText.substring(0, charI)
        // this.innerText = this.innerText.slice(charI, this.innerText.length)
        // // console.log(hidden_span)
        // this.insertBefore(hidden_span, this.firstChild)

      // anime.timeline({loop: false})
      //   .add({
      //     targets: '.blue',
      //     opacity: [1,0],
      //     easing: "easeInOutQuad",
      //     duration: 2000,
      //     // delay: 1000,
      //     delay: function(el, i) {
      //       return 1000 * (i+1)
      //     }
      //   })
        // .add({
        //   targets: '.blue .hideable',
        //   opacity: 0,
        //   duration: 1000,
        //   easing: "easeOutExpo",
        //   delay: 1000
        // })

      // hidden_span.innerText = this.innerText.charAt(charI)

      // $(span).animate({'opacity': 0.2}, 2000)
      // this.innerHTML.after(span)
      // this.appendChild(span)
      // this.innerText.charAt(charI) = hidden_span
      // this.find('span.blue').animate({'opacity': 10}, 2000)
      // this.getElementsByClassName('blue')[0].style.animate({'opacity': 0.5}, 500)


        //
        // var hidden_span = document.createElement('span')
        // .html(span.addClass('trans'))
        // var hideChar = document.createTextNode(this.innerText.charAt(charI))
        // var restOfString = document.createTextNode(this.innerText.substring(0, charI))
        // this.innerText = restOfString
        // console.log(hideChar)
        // this.innerText.charAt(charI) = hideChar

      // this.innerText = 'replacement test of whole element text'
      // console.log(this.innerText)
      //

    // var timer = setInterval(function() {
    //   var ln = $.trim(text.find('.trans').text().length)
    //   if (ln == initText.length) { //escape clause
    //     $text.empty()
    //     clearInterval(timer)
    //   }
    //   $('#hi').html(function() {
    //     var current_letter = $(this).html(initText.substring(ptr++ , ptr)).text()
    //     // console.log()
    //     if (current_letter != 'T') {
    //       return $('<span>').addClass('removeMe')
    //         .html(initText.substring(ptr++ , ptr))
    //         .before($('<span>').addClass('trans').
    //                 html(initText.substring(0 , ptr-1)))
    //         .after(initText.substring(ptr))
    //     }
    //   }).find('span.removeMe').animate({'opacity': 50}, 2000)
    //
    // }, 150)
  // })



  // WORKING JQUERY SLOWLY HIDES LETTER BY LETTER
  // $(".destroyButton").click(function(e){
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
  //         if (current_letter != 'T') {
  //           return $('<span>').addClass('removeMe')
  //             .html(initText.substring(ptr++ , ptr))
  //             .before($('<span>').addClass('trans').
  //                     html(initText.substring(0 , ptr-1)))
  //             .after(initText.substring(ptr))
  //         }
  //       }).find('span.removeMe').animate({'opacity': 50}, 2000)
  //
  //     }, 150)
  //   })



// function destroyButton() {
//   // var timer = setInterval(function() {
//     var intro = document.getElementById("hi")
//     console.log("intro.innerText: " + intro.innerText)
//     var ln = intro.innerText.length
//     console.log(ln)
//     // if (ln == 1) { //escape clause
//     //   clearInterval(timer)
//     // }
//     var hideChar = document.createTextNode(intro.innerText.substr(intro.innerText.length - 1))
//     var hidden = document.getElementById("hidden")
//     console.log("hidden before: " + hidden)


//     if (hidden == true) {
//       hidden.appendChild(hideChar)
//       console.log("hidden after: " + hidden)
//       intro.innerText = intro.innerText.substr(0, intro.innerText.length-1)
//       intro.appendChild(hidden)
//       console.log(intro.innerHTML)
//     } else {
//       intro.innerText = intro.innerText.substr(0, intro.innerText.length-1)
//     }
//   // }, 500)
// }









    //   $('#hi').html(function() {
    //     var current_letter = $(this).html(initText.substring(ptr++ , ptr)).text()
    //     // console.log()
    //     if (current_letter != 'p') {
    //       return $('<span>').addClass('removeMe')
    //         .html(initText.substring(ptr++ , ptr))
    //         .before($('<span>').addClass('trans').
    //                 html(initText.substring(0 , ptr-1)))
    //         .after(initText.substring(ptr))
    //     }
    //     }).find('span.removeMe').animate({'opacity': 0}, 200)

    // }, 150)

function colorProtected(color) {
  var protectedColors = [
    '1EAEDB', // link color (hex)
    'rgb(30, 174, 219)', // link color (rgb)
    '0FA0CE',  // hover / visited link color (hex)
    'rgb(240, 95, 49)', // hover / visited link color (rgb)
  ]

  return (protectedColors.indexOf(color) > -1)
}

$(document).ready(function(){

  $(".invert-theme").click(function(e){
    var colorProperties = ['color', 'background-color']
    $.each($("*"), function() {
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
