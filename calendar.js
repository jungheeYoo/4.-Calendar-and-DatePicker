const calendarGrid = document.querySelector('.calendar-grid .dates');
const monthElement = document.querySelector('.nav-month-year .month');
const yearElement = document.querySelector('.nav-month-year .year');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
console.log(currentMonth);
console.log(currentYear);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const renderCalendar = () => {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(firstDay);
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDay = new Date(currentYear, currentMonth, lastDate).getDay();
  const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  const navMonth = document.querySelector('.nav-month');
  const navYear = document.querySelector('.nav-year');

  // 현재 년,월 보이기
  navMonth.innerText = months[currentMonth];
  navYear.innerText = currentYear;

  const dates = document.querySelector('.dates');
  dates.innerHTML = '';

  //현재달에 이전달 불러오기
  for (let i = firstDay; i > 0; i--) {
    const $day = document.createElement('li');
    $day.classList.add('notCurrDay');
    $day.innerText = lastDayOfLastMonth - i + 1;
    dates.append($day);
  }
};

renderCalendar();
