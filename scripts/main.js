$(document).ready(function() {
  $("#info").parent().niceScroll();
  vehicle_view.$mount('#vehicles');
  planet_view.$mount('#space_box');
  visit_view.$mount('#visit_list');
  total_time_view.$mount('#total_time');
  $('[max-distance]').tooltip();
});

var vehicles = {
  "vehicles": [{
    "name": "Space pod",
    "total_no": 2,
    "max_distance": 200,
    "speed": 2
  }, {
    "name": "Space rocket",
    "total_no": 1,
    "max_distance": 300,
    "speed": 4
  }, {
    "name": "Space shuttle",
    "total_no": 1,
    "max_distance": 400,
    "speed": 5
  }, {
    "name": "Space ship",
    "total_no": 2,
    "max_distance": 600,
    "speed": 10
  }]
};
var planets = {
  "planets": [{
    "name": "Donlon",
    "distance": 100
  }, {
    "name": "Enchai",
    "distance": 200
  }, {
    "name": "Jebing",
    "distance": 300
  }, {
    "name": "Sapir",
    "distance": 400
  }, {
    "name": "Lerbin",
    "distance": 500
  }, {
    "name": "Pingasor",
    "distance": 600
  }]
};
var visit_list = {
  "visit_list": []
};

function get_total_used_vehicles() {
  var total_used = 0;
  Object.keys(vehicles.vehicles).forEach(function(index) {
    total_used += vehicles.vehicles[index].used;
  });
  return total_used;
}

var vehicle_view = new Vue({
  el: '#vehicles',
  data: vehicles,
  init: function() {
    Object.keys(vehicles.vehicles).forEach(function(index) {
      vehicles.vehicles[index].id = index;
      vehicles.vehicles[index].used = 0;
    });
  },
  methods: {
    use_vehicle: function(vehicle) {
      vehicle.used = ((vehicle.used + 1) > vehicle.total_no) ? vehicle.total_no : ++vehicle.used;
      visit_list.visit_list[visit_list.visit_list.length - 1].vehicle = vehicle;
    },
    remove_vehicle: function(vehicle) {
      if (visit_list.visit_list[visit_list.visit_list.length - 1].vehicle == vehicle) {
        vehicle.used = ((vehicle.used - 1) < 0) ? 0 : --vehicle.used;
        visit_list.visit_list[visit_list.visit_list.length - 1].vehicle = {};
      } else {
        $('#cannot_remove_alert').show();
        setTimeout(function() {
          $('#cannot_remove_alert').fadeOut();
        }, 2000);
      }
    },
    disable_vehicle: function(vehicle) {
      if (vehicle.used == vehicle.total_no || get_total_used_vehicles() >= visit_list.visit_list.length || visit_list.visit_list.length > 0 && vehicle.max_distance < visit_list.visit_list[visit_list.visit_list.length - 1].distance) {
        return 'disable';
      } else {
        return '';
      }
    }
  }
});

var planet_view = new Vue({
  el: '#space_box',
  data: planets,
  init: function() {
    Object.keys(planets.planets).forEach(function(index) {
      planets.planets[index].id = index;
      planets.planets[index].vehicle = {};
    });
  },
  ready: function() {
    var parallax = new Parallax(document.getElementById('space'));
  },
  methods: {
    visit_planet: function(planet) {
      if (visit_list.visit_list.length < 4 && visit_list.visit_list.indexOf(planet) < 0) {
        if (visit_list.visit_list.length > 0 && $.isEmptyObject(visit_list.visit_list[visit_list.visit_list.length - 1].vehicle)) {
          $('#choose_planet_alert').show();
          setTimeout(function() {
            $('#choose_planet_alert').fadeOut();
          }, 2000);
        } else {
          visit_list.visit_list.push(planet);
        }
      } else if (visit_list.visit_list.length < 4) {
        $('#visit_repeat_alert').show();
        setTimeout(function() {
          $('#visit_repeat_alert').fadeOut();
        }, 2000);
      } else {
        $('#visit_limit_alert').show();
        setTimeout(function() {
          $('#visit_limit_alert').fadeOut();
        }, 2000);
      }
    }
  }
});

var visit_view = new Vue({
  el: '#visit_list',
  data: visit_list,
  watch: {
    'visit_list': function() {
      $('[max-distance]').tooltip();
    }
  },
  methods: {
    dont_visit: function(visit, event) {
      $(event.target.parentNode).tooltip('destroy');
      visit.vehicle.used--;
      visit.vehicle = {};
      this.visit_list.$remove(visit);
    }
  }
});

var total_time_view = new Vue({
  el: "#total_time",
  data: visit_list,
  computed: {
    total_time: function() {
      var tot_time = 0;
      Object.keys(this.visit_list).forEach(function(index) {
        if(!$.isEmptyObject(this.visit_list.visit_list[index].vehicle)){
          tot_time += (this.visit_list.visit_list[index].distance / this.visit_list.visit_list[index].vehicle.speed);
        }
      });
      return tot_time;
    }
  }
});