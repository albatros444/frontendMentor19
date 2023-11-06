const button = document.querySelector("button");
const allInputs = document.querySelectorAll("input");
const allErrorTexts = document.querySelectorAll(".errorText");
const dayInput = document.querySelector(".card__inputs__day");
const monthInput = document.querySelector(".card__inputs__month");
const yearInput = document.querySelector(".card__inputs__year");
const years = document.querySelector(".yearsOutput");
const months = document.querySelector(".monthsOutput");
const days = document.querySelector(".daysOutput");

button.addEventListener("click", handleButton);

let day;
let month;
let year;

function handleButton(e) {
  let isAllVal;
  e.preventDefault();
  const val1 = dayVal();
  const val2 = monthVal();
  const val3 = yearVal();
  if (val1 && val2 && val3) {
    isAllVal = allDateVal();
  }
  isAllVal && getResult();
}

const dayVal = () => {
  day = allInputs[0].value;
  const isDay = Number(day) > 0 && Number(day) < 32;

  if (day === "") {
    dayInput.classList.add("wrong");
    allErrorTexts[0].innerText = "This field is required";
  } else if (!isDay) {
    dayInput.classList.add("wrong");
    allErrorTexts[0].innerText = "Must be a valid day";
  } else {
    dayInput.classList.remove("wrong");
    return true;
  }
  return false;
};
///////
const monthVal = () => {
  month = allInputs[1].value;
  const isMonth = Number(month) > 0 && Number(month) < 13;
  if (month === "") {
    monthInput.classList.add("wrong");
    allErrorTexts[1].innerText = "This field is required";
  } else if (!isMonth) {
    monthInput.classList.add("wrong");
    allErrorTexts[1].innerText = "Must be a valid month";
  } else {
    monthInput.classList.remove("wrong");
    allErrorTexts[1].innerText = "";
    return true;
  }
  return false;
};
const yearVal = () => {
  year = allInputs[2].value;
  const today = new Date();
  const isInPast = Number(year) <= today.getFullYear() && Number(year) >= 0;
  if (year === "") {
    yearInput.classList.add("wrong");
    allErrorTexts[2].innerText = "This field is required";
  } else if (isNaN(year)) {
    yearInput.classList.add("wrong");
    allErrorTexts[2].innerText = "Must be a number";
  } else if (!isInPast) {
    yearInput.classList.add("wrong");
    allErrorTexts[2].innerText = "Must be in the past";
  } else {
    yearInput.classList.remove("wrong");
    allErrorTexts[2].innerText = "";
    return true;
  }
  return false;
};

const allDateVal = () => {
  let allInput = new Date(`${year}/${month}/${day}`);
  const getDay = allInput.getDate(); //checking if date valid. If February 31, day will be march 3 and they're not the same

  if (Number(day) !== getDay) {
    dayInput.classList.add("wrong");
    monthInput.classList.add("wrong");
    yearInput.classList.add("wrong");
    allErrorTexts[0].innerText = "Must be a valid date";
    return false;
  } else {
    dayInput.classList.remove("wrong");
    monthInput.classList.remove("wrong");
    yearInput.classList.remove("wrong");
    return true;
  }
};

const getResult = () => {
  const allInput = new Date(`${year}/${month}/${day}`);

  let yearsRes;
  let monthsRes;
  let daysRes;

  const inpYear = allInput.getFullYear();
  const inputMonth = allInput.getMonth();
  const inputDay = allInput.getDate();
  // console.log(inpYear, inputMonth, inputDay);

  const now = new Date();
  const yearNow = now.getFullYear();
  const monthNow = now.getMonth();
  const dayNow = now.getDate();
  // console.log(yearNow, monthNow, dayNow);

  yearsRes = yearNow - inpYear;
  if (inputMonth <= monthNow) {
    monthsRes = monthNow - inputMonth;
  } else {
    yearsRes--;
    monthsRes = monthNow + 12 - inputMonth;
  }
  if (inputDay <= dayNow) {
    daysRes = dayNow - inputDay;
  } else {
    monthsRes--;
    daysRes = 31 + dayNow - inputDay;
  }
  console.log(yearsRes, monthsRes, daysRes);
  years.innerText = yearsRes;
  years.style.letterSpacing = "-0.02em";
  years.style.marginRight = "12px";
  months.innerText = monthsRes;
  months.style.letterSpacing = "-0.02em";
  months.style.marginRight = "12px";
  days.innerText = daysRes;
  days.style.letterSpacing = "-0.02em";
  days.style.marginRight = "12px";
};
