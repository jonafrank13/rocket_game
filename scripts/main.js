$( document ).ready(function(){
    $("#info").parent().niceScroll();
    $("html").niceScroll();
    vehicle_view.$mount('#vehicles');
    planet_view.$mount('#space_box');
    $('[max-distance]').tooltip();
});

function planet_details(planet){
	console.log(planet+' clicked');
}

function use_vehicle(id){
	console.log(id);
	vehicles.vehicles[id].used += 1;
	vehicles.vehicles[id].used = (vehicles.vehicles[id].used > vehicles.vehicles[id].total_no) ? vehicles.vehicles[id].total_no : vehicles.vehicles[id].used;
}

var vehicles = {"vehicles":[
  {
    "name": "Space pod",
    "total_no": 2,
    "max_distance": 200,
    "speed": 2
  },
  {
    "name": "Space rocket",
    "total_no": 1,
    "max_distance": 300,
    "speed": 4
  },
  {
    "name": "Space shuttle",
    "total_no": 1,
    "max_distance": 400,
    "speed": 5
  },
  {
    "name": "Space ship",
    "total_no": 2,
    "max_distance": 600,
    "speed": 10
  }
]};

var planets = {"planets":[
  {
    "name": "Donlon",
    "distance": 100
  },
  {
    "name": "Enchai",
    "distance": 200
  },
  {
    "name": "Jebing",
    "distance": 300
  },
  {
    "name": "Sapir",
    "distance": 400
  },
  {
    "name": "Lerbin",
    "distance": 500
  },
  {
    "name": "Pingasor",
    "distance": 600
  }
]};

var vehicle_view = new Vue(
							{
  								el   		: 	'#vehicles',
  								data 		: 	vehicles,
  								init		: 	function(){		Object.keys(vehicles.vehicles).forEach( function (vehicle,index){	vehicles.vehicles[index].id = index;vehicles.vehicles[index].used = 0;	} );	}
							}
						);

var planet_view = new Vue(
							{
  								el   		: 	'#space_box',
  								data 		: 	planets,
  								init		: 	function(){		Object.keys(planets.planets).forEach( function (planet,index){	planets.planets[index].id = index;	} );	},
  								ready		: 	function(){		var parallax = new Parallax(document.getElementById('space'));		}
							}
						);