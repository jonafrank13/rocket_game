$( document ).ready(function(){
    var parallax = new Parallax(document.getElementById('space'));
    $("#info").parent().niceScroll();
    $("html").niceScroll()
});

function planet_details(planet){
	console.log(planet+' clicked');
}
