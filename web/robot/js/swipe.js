window.G_touchdown = false;
var swipeTolerance = 250;
var startx = 0;
var dist = 0;

$(document).ready(function($) {
    if (screen.width <= 768){//if Phone
        $('.menuHead, .menuH2').bind('click', false);
    }

    document.body.addEventListener('touchstart', function(e){
        
        if ((e.changedTouches[0].pageX < 80)&&(!$("#wrapper").hasClass('toggled'))){
            $("#wrapper").toggleClass("toggled");//open menu
            $("#menuarrow").toggleClass("flipped");//flip pik
            $('.menuHead, .menuH2').unbind('click');

        }else if ((e.changedTouches[0].pageX > screen.width - 80)&&($("#wrapper").hasClass('toggled'))){
            $("#wrapper").toggleClass("toggled");//open menu
            $("#menuarrow").toggleClass("flipped");//flip pik
            $('.menuHead, .menuH2').bind('click', false);
        }
    });
});



