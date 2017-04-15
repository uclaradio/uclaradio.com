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

<<<<<<< HEAD
=======
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

>>>>>>> 6621c3f38b662ec4038e5698c4b4f9a5c1f03733
mod.numberOfDaysFromMonth = function(month){
  switch (month){
    case 'January':
      return 31;
    case 'February':
      return 29;
    case 'March':
      return 31;
    case 'April':
      return 30;
    case 'May':
      return 31;
    case 'June':
      return 30;
    case 'July':
      return 31;
    case 'August':
      return 31;
    case 'September':
      return 30;
    case 'October':
      return 31;
    case 'November':
      return 30;
    case 'December':
      return 31;
    default:
      return -1;
  }
}

mod.numberFromMonth = function(month){
  switch (month){
    case 'January':
      return 0;
    case 'February':
      return 1;
    case 'March':
      return 2;
    case 'April':
      return 3;
    case 'May':
      return 4;
    case 'June':
      return 5;
    case 'July':
      return 6;
    case 'August':
      return 7;
    case 'September':
      return 8;
    case 'October':
      return 9;
    case 'November':
      return 10;
    case 'December':
      return 11;
    default:
      return -1;
  }
}

mod.availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
<<<<<<< HEAD
mod.availableTimes = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
                        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
mod.availableMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];
=======
mod.availableTimes = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
mod.availableMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
>>>>>>> 6621c3f38b662ec4038e5698c4b4f9a5c1f03733


module.exports = dates;
