/**
 * Created by alejandroabadmartinez on 12/4/18.
 */
$(document).ready(function(){
    $('.ir-arriba').click(function () {
        $('body, html').animate({
            scrollTop:'0px'
        }, 300); //Determina el tiempo de subida
    });
    $(window).scroll(function () {
        if($(this).scrollTop() > 0){
            $('.ir-arriba').slideDown(300);
        }else{
            $('.ir-arriba').slideUp(300);
        }
		
    });
	
	
});