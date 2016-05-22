//Config Arrays for Months
var MONTHS = {
	'1' : {
		number : 01,
		name : 'January',
		abbv : 'Jan',
		days : 31
	},
	'2' : {
		number : 02,
		name : 'February',
		abbv : 'Feb',
		days : 28
	},
	'3' : {
		number : 03,
		name : 'March',
		abbv : 'Mar',
		days : 31
	},
	'4' : {
		number : 04,
		name : 'April',
		abbv : 'Apr',
		days : 30
	},
	'5' : {
		number : 05,
		name : 'May',
		abbv : 'May',
		days : 31
	},
	'6' : {
		number : 06,
		name : 'June',
		abbv : 'Jun',
		days : 30
	},
	'7' : {
		number : 07,
		name : 'July',
		abbv : 'Jul',
		days : 31
	},
	'8' : {
		number : 08,
		name : 'August',
		abbv : 'Aug',
		days : 31
	},
	'9' : {
		number : 09,
		name : 'September',
		abbv : 'Sept',
		days : 31
	},
	'10' : {
		number : 10,
		name : 'October',
		abbv : 'Oct',
		days : 31
	},
	'11' : {
		number : 11,
		name : 'November',
		abbv : 'Nov',
		days : 30
	},
	'12' : {
		number : 12,
		name : 'December',
		abbv : 'Dec',
		days : 31
	}
};
var DAYS = {
		'Monday' : {
			dayOfWeek : 1,
			name : 'Monday',
			abbv : 'Mon'
		},
		'Tuesday' : {
			dayOfWeek : 2,
			name : 'Tuesday',
			abbv : 'Tue'
		},
		'Wednesday' : {
			dayOfWeek : 3,
			name : 'Wednesday',
			abbv : 'Wed'
		},
		'Thursday' : {
			dayOfWeek : 4,
			name : 'Thursday',
			abbv : 'Thu'
		},
		'Friday' : {
			dayOfWeek : 5,
			name : 'Friday',
			abbv : 'Fri'
		},
		'Saturday' : {
			dayOfWeek : 6,
			name : 'Saturday',
			abbv : 'Sat'
		},
		'Sunday' : {
			dayOfWeek : 7,
			name : 'Sunday',
			abbv : 'Sun'
		}
}

//Some constants to make things work properly
	var FEBRUARY = 'February';
	var FIRST_LEAP_YEAR = 1584;
	//first day of 1584, used to calculate day of week
	var FIRST_DAY = DAYS['Sunday'];
	var DAYS_IN_COMMON_YEAR = 365;
	var DAYS_IN_A_WEEK = 7;
//Couple options
	var minYear = 1582;
	var maxYear = 2100;
//Helper Functions
	//Event Handler
	function addEventHandler(elem, eventType, handler) {
		if (elem.addEventListener) {
	        elem.addEventListener (eventType, handler, false);
		}
	    else if (elem.attachEvent) {
	        elem.attachEvent ('on' + eventType, handler);
	    }
	}
	//Insert Selects
	function outputSelect(name, container) {
		var select = document.createElement('select');
		select.name = name;
		select.id = name;
		container.appendChild(select);
		return select;
	};
	//Insert Options
	function insertOption(select, value, label) {
		var opt = document.createElement('option');
		opt.value = value;
		opt.innerHTML = label;
		select.appendChild(opt);
	};
	//Check If Leap Year
	function calculateIfLeapYear(year) {
		//Must be divisible by 4 to be a leap year
		if(year == FIRST_LEAP_YEAR) {
			return true;			
		} else if (year % 4 == 0) {
			//May not be a leap year if it's divisible by 100
			if(year % 100 == 0) {
				//Unless it's divisible by 400 as well
				if(year % 400 == 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;	
		}
	};

//The Meat
	window.onload = function() {
		outputYearSelect();
	    addEventHandler(document.getElementById('years'), 'change', function() {
			outputMonthSelect();
	    });
	};
	function outputYearSelect() {
		var container = document.body;
		select = outputSelect('years', container);
		insertOption(select, '', '')
		for (var i = minYear; i<=maxYear; i++){
			insertOption(select, i, i)
		}
	}
	function outputMonthSelect() {
		var container = document.body;
		select = outputSelect('months', container);
		//Insert Blank Option
		insertOption(select, '', '')
		for(var month in MONTHS){
			insertOption(select, MONTHS[month]['number'], MONTHS[month]['name'])
		}
	    addEventHandler(document.getElementById('months'), 'change', function() {
	    	outputDaySelect();
	    });
	}
	function outputDaySelect() {
		var container = document.body;
		select = outputSelect('days', container);
		//Insert Blank Option
		insertOption(select, '', '')
		var year = document.getElementById('years').value;
		var month = document.getElementById('months').value;
		var numOfDays = MONTHS[month]['days'];
		if(MONTHS[month]['name'] == FEBRUARY) {
			if(calculateIfLeapYear(year)){
				//Add a day to February in leap years
				numOfDays = numOfDays + 1;
			};
		}
		for (var i = 1; i<=numOfDays; i++){
			insertOption(select, i, i)
		}
		//Add event listener to the days select
	    addEventHandler(document.getElementById('days'), 'change', function() {
	    	var firstDayOfYear = calculateFirstDayOfYear(year);
	    	//var dayOfWeek = calculateDayOfWeek(month, year);
	    });
	}
	function calculateFirstDayOfYear(year) {
		totalDays = 0;
		for (var i = FIRST_LEAP_YEAR; i<year; i++){
			totalDays = totalDays + DAYS_IN_COMMON_YEAR;
			if(calculateIfLeapYear(i)){				
				totalDays = totalDays + 1;
			}
		}
		return getDayByDayOfWeek(totalDays % DAYS_IN_A_WEEK);
	}
	function getDayByDayOfWeek(dayOfTheWeek){
		for(var day in DAYS){
			if(DAYS[day]['dayOfWeek'] == dayOfTheWeek){
				return DAYS[day]['name'];
			}
		}
	}