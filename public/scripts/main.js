function colorProtected(color) {
  var protectedColors = [
    '1EAEDB', // link color (hex)
    'rgb(30, 174, 219)', // link color (rgb)
    '0FA0CE', // hover / visited link color (hex)
    'rgb(240, 95, 49)', // hover / visited link color (rgb)
  ];
  
  return (protectedColors.indexOf(color) > -1);
}

$(document).ready(function(){

  $(".invert-theme").click(function(e){
    var colorProperties = ['color', 'background-color'];
    $.each($("*"), function() {
      var color = null;
      var currentColor = null;

      for (var prop in colorProperties) {
        prop = colorProperties[prop];
        currentColor = $(this).css(prop);

        if (!currentColor || colorProtected(currentColor)) continue;

        color = new RGBColor($(this).css(prop));
        if (color.ok) {
          $(this).css(prop, 'rgb(' + (255 - color.r) + ', ' + (255 - color.g) + ', ' + (255 - color.b) + ')');
        }
        color = null;
        currentColor = null;
      }
    });
  });
});
