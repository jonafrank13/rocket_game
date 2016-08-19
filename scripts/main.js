$( document ).ready(function(){
    var parallax = new Parallax(document.getElementById('space'));
    $("#info").parent().niceScroll();
    $("html").niceScroll();
    $('[max-distance]').tooltip(); 
});

function planet_details(planet){
	console.log(planet+' clicked');
}
