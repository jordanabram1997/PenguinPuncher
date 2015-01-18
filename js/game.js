var settings;

$(document).ready(function(){
	
	loadData();
	setEverything();
	setupUpgrades();
	setupDPS();

	$(".js-clicker").on("click", function(){
		settings.score = settings.score + settings.dpc;
		setEverything();
		saveData();
		ga('send', 'event', 'Penguin', 'click');
	})

	$(".game-container__upgrades").on("click", ".upgrade-item", function(){
		var upgrade = data.upgrades[$(this).data("id")];

		if (settings.score>=upgrade.price) {

			//Remove Price from Current Score
			settings.score = settings.score - upgrade.price;

			settings.dpc = settings.dpc + upgrade.dpc;
			settings.dps = settings.dps + upgrade.dps;
			setEverything();
			saveData();
			ga('send', 'event', 'Upgrade', 'click',upgrade.title);
		}

	})

});


function saveData(){
	localStorage.setItem('clickerSettings', JSON.stringify(settings));
}

function loadData(){
	var defaultSettings = {
		score: 0,
		dpc: 1,
		dps: 0
	};

	settings = JSON.parse(localStorage.getItem('clickerSettings')) || defaultSettings;
}

function setEverything(){
	$(".js-score").html(numberWithCommas(Math.floor(settings.score))); 
	$(".js-dpc").html(numberWithCommas(settings.dpc));
	$(".js-dps").html(numberWithCommas(settings.dps));
}

function setupUpgrades(){
	var source   = $("#upgrade-template").html();
	var template = Handlebars.compile(source);
	var html    = template(data);

	$(".output").html(html);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function setupDPS(){
	requestAnimFrame(setupDPS);

	// Update code here
	var update = settings.dps / 60;

	settings.score = settings.score + update;
	setEverything();		
	saveData();
}