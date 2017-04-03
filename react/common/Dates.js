// Dates.js
// helper functions for date/time elements

var dates = {};

dates.dayFromVar = function(day) {
  switch (day) {
  case 'Mon':
    return 'Monday';
  case 'Tue':
    return 'Tuesday';
  case 'Wed':
    return 'Wednesday';
  case 'Thu':
    return 'Thursday';
  case 'Fri':
    return 'Friday';
  case 'Sat':
    return 'Saturday';
  case 'Sun':
    return 'Sunday';
  default:
    return '';
  }
};

dates.abbreviatedDay = function(day) {
  switch (day) {
  case 'monday':
    return 'Mon';
  case 'tuesday':
    return 'Tue';
  case 'wednesday':
    return 'Wed';
  case 'thursday':
    return 'Thu';
  case 'friday':
    return 'Fri';
  case 'saturday':
    return 'Sat';
  case 'sunday':
    return 'Sun';
  default:
    return '';
  }
};

dates.availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
dates.availableTimes = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
  '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

module.exports = dates;
