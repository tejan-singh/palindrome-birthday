const checkPalindrome = (date) => {
  var charStr = date.split("");
  var reverseList = charStr.reverse();
  var reverseStr = reverseList.join("");

  if (date === reverseStr) {
    return true;
  }
  return false;
};

const numToString = (date) => {
  if (date.month < 10 && date.day < 10) {
    return (date = {
      day: "0" + date.day.toString(),
      month: "0" + date.month.toString(),
      year: date.year.toString(),
    });
  }

  if (date.day < 10) {
    return (date = {
      day: "0" + date.day.toString(),
      month: date.month.toString(),
      year: date.year.toString(),
    });
  }

  if (date.month < 10) {
    return (date = {
      day: date.day.toString(),
      month: "0" + date.month.toString(),
      year: date.year.toString(),
    });
  }

  return (date = {
    day: date.day.toString(),
    month: date.month.toString(),
    year: date.year.toString(),
  });
};

const getDateVariations = (date) => {
  const strDate = numToString(date);
  const newDatesArray = [
    strDate.day + strDate.month + strDate.year,
    strDate.month + strDate.day + strDate.year,
    strDate.year + strDate.month + strDate.day,
    strDate.day + strDate.month + strDate.year.slice(2),
    strDate.month + strDate.day + strDate.year.slice(2),
    strDate.year.slice(2) + strDate.month + strDate.day,
  ];

  return newDatesArray;
};

const checkPalindromeForAllDates = (date) => {
  const allDates = getDateVariations(date);
  for (date of allDates) {
    if (checkPalindrome(date)) {
      return true;
    }
  }
  return false;
};

var date = { day: 10, month: 9, year: 2020 };

console.log(checkPalindromeForAllDates(date));
