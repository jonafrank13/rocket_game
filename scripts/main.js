$(document).ready(function() {
    $("#info").parent().niceScroll();
    vehicle_view.$mount('#vehicles');
    planet_view.$mount('#space_box');
    visit_view.$mount('#visit_list');
    total_time_view.$mount('#total_time');
    $('[max-distance]').tooltip();
});

var game_model = {
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
    }],
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
    }],
    "visit_list": []
};

function get_total_used_vehicles() {
    var total_used = 0;
    Object.keys(game_model.vehicles).forEach(function(index) {
        total_used += game_model.vehicles[index].used;
    });
    return total_used;
}

function show_alert(msg_key) {
    $(msg_key).show();
    setTimeout(function() {
        $(msg_key).fadeOut();
    }, 2000);
}

var vehicle_view = new Vue({
    el: '#vehicles',
    data: game_model,
    init: function() {
        Object.keys(game_model.vehicles).forEach(function(index) {
            game_model.vehicles[index].id = index;
            game_model.vehicles[index].used = 0;
        });
    },
    methods: {
        use_vehicle: function(vehicle) {
            vehicle.used = ((vehicle.used + 1) > vehicle.total_no) ? vehicle.total_no : ++vehicle.used;
            game_model.visit_list[game_model.visit_list.length - 1].vehicle = vehicle;
            total_time_view.calculate_total_time();
        },
        remove_vehicle: function(vehicle) {
            if (game_model.visit_list[game_model.visit_list.length - 1].vehicle == vehicle) {
                vehicle.used = ((vehicle.used - 1) < 0) ? 0 : --vehicle.used;
                game_model.visit_list[game_model.visit_list.length - 1].vehicle = {};
            } else {
                show_alert('#cannot_remove_alert');
            }
        },
        disable_vehicle: function(vehicle) {
            if (vehicle.used == vehicle.total_no || get_total_used_vehicles() >= game_model.visit_list.length || game_model.visit_list.length > 0 && vehicle.max_distance < game_model.visit_list[game_model.visit_list.length - 1].distance) {
                return 'disable';
            } else {
                return '';
            }
        }
    }
});

var planet_view = new Vue({
    el: '#space_box',
    data: game_model,
    init: function() {
        Object.keys(game_model.planets).forEach(function(index) {
            game_model.planets[index].id = index;
            game_model.planets[index].vehicle = {};
        });
    },
    ready: function() {
        new Parallax(document.getElementById('space'));
    },
    methods: {
        visit_planet: function(planet) {
            if (game_model.visit_list.length < 4 && game_model.visit_list.indexOf(planet) < 0) {
                if (game_model.visit_list.length > 0 && $.isEmptyObject(game_model.visit_list[game_model.visit_list.length - 1].vehicle)) {
                    show_alert('#choose_planet_alert');
                } else {
                    game_model.visit_list.push(planet);
                }
            } else if (game_model.visit_list.length < 4) {
                show_alert('#visit_repeat_alert');
            } else {
                show_alert('#visit_limit_alert');
            }
        }
    }
});

var visit_view = new Vue({
    el: '#visit_list',
    data: game_model,
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
    data: {total_time:0},
    methods: {
        calculate_total_time: function() {
            var tot_time = 0;
            Object.keys(game_model.visit_list).forEach(function(index) {
                if (!$.isEmptyObject(game_model.visit_list[index].vehicle)) {
                    tot_time += (game_model.visit_list[index].distance / game_model.visit_list[index].vehicle.speed);
                }
            });
            this.total_time = tot_time;
        }
    },
    created: function(){
      this.calculate_total_time();
    }
});