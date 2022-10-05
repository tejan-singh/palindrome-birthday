const birthdayInput = document.querySelector("#birthday");
const checkBtn = document.querySelector(".btn");
const resultMsg = document.querySelector('#output')

const handleClick = () => {
  const InputDateValue = birthdayInput.value;
  if (InputDateValue !== "") {
    var date = InputDateValue.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    console.log(date);

    var dateStr = numToString(date);
    var list = checkPalindromeForAllDates(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!checkPalindrome) {
        const [count, nextDate] = getNextPalindromeDate(date);
        resultMsg.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${count} days.`;

      } else {
        resultMsg.innerText = 'Yay! Your birthday is palindrome!';
      }
  }
};

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

// check for next palindrome
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const checkLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }

  return false;
};

const getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  if (month !== 2) {
    if (day > daysInMonth[month - 1]) {
      return { day: 1, month: 1, year: year + 1 };
    }

    if (month >= 12) {
      return { day: 1, month: 1, year: year + 1 };
    }
    return { day: day, month: month, year: year };
  }

  if (month === 2) {
    if (checkLeapYear(year)) {
      // means there are 29 days in feb
      // increment day till 29
      if (day > 29) {
        return { day: 1, month: 3, year: year };
      }

      return { day: day, month: month, year: year };
    }
    //not leap year so increse day till 28
    if (day > 28) {
      return { day: 1, month: 3, year: year };
    }

    return { day: day, month: month, year: year };
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindromeDate = (date) => {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = numToString(nextDate);
    var resultList = checkPalindromeForAllDates(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

checkBtn.addEventListener("click", handleClick);
