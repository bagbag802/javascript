//Config Arrays for Months
var MONTHS = {
	'001' : {
		name : 'January',
		abbv : 'Jan',
		days : 31
	},
	'002' : {
		name : 'February',
		abbv : 'Feb',
		days : 28
	},
	'003' : {
		name : 'March',
		abbv : 'Mar',
		days : 31
	},
	'004' : {
		name : 'April',
		abbv : 'Apr',
		days : 30
	},
	'005' : {
		name : 'May',
		abbv : 'May',
		days : 31
	},
	'006' : {
		name : 'June',
		abbv : 'Jun',
		days : 30
	},
	'007' : {
		name : 'July',
		abbv : 'Jul',
		days : 31
	},
	'008' : {
		name : 'August',
		abbv : 'Aug',
		days : 31
	},
	'009' : {
		name : 'September',
		abbv : 'Sept',
		days : 31
	},
	'010' : {
		name : 'October',
		abbv : 'Oct',
		days : 31
	},
	'011' : {
		name : 'November',
		abbv : 'Nov',
		days : 30
	},
	'012' : {
		name : 'December',
		abbv : 'Dec',
		days : 31
	}
};
var DAYS = {
		'Monday' : {
			dayOfWeek : 1,
			abbv : 'Mon'
		},
		'Tuesday' : {
			dayOfWeek : 2,
			abbv : 'Tue'
		},
		'Wednesday' : {
			dayOfWeek : 3,
			abbv : 'Wed'
		},
		'Thursday' : {
			dayOfWeek : 4,
			abbv : 'Thu'
		},
		'Friday' : {
			dayOfWeek : 5,
			abbv : 'Fri'
		},
		'Saturday' : {
			dayOfWeek : 6,
			abbv : 'Sat'
		},
		'Sunday' : {
			dayOfWeek : 7,
			abbv : 'Sun'
		}
}
var minYear = 1900;
var maxYear = 2100;
var firstDay = DAYS['Monday'];
//Helper Functions
	//Event Handler
	function addEventHandler(elem, eventType, handler) {
		if (elem.addEventListener)
	        elem.addEventListener (eventType, handler, false);
	    else if (elem.attachEvent)
	        elem.attachEvent ('on' + eventType, handler);
	}
	//Insert Options
	function insertOption(type, select, value, label) {
		var opt = document.createElement(type);
		opt.value = value;
		opt.innerHTML = label;
		select.appendChild(opt);
	};
//The Meat
window.onload = function() {
	outputYearSelect();
	outputMonthSelect();
};
function outputYearSelect() {
	var container = document.body;
	var select = document.createElement("select");
	select.name = "years";
	container.appendChild(select);
	//Insert Blank Option
	insertOption('option', select)
	for (var i = minYear; i<=maxYear; i++){
		insertOption('option', select, i, i)
	}
}
function outputMonthSelect() {
	var container = document.body;
	var select = document.createElement("select");
	select.name = "months";
	container.appendChild(select);
	//Insert Blank Option
	insertOption('option', select)
	for(var month in MONTHS){
		insertOption('option', select, MONTHS[month]['number'], MONTHS[month]['name'])
	}
}
function outputDaySelect(year, month) {
}