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
  // 1일 시작 요일,
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(firstDay);
  // 이번 달 마지막 날짜, 요일
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDay = new Date(currentYear, currentMonth, lastDate).getDay();
  console.log(lastDate);
  console.log(lastDay);
  // 지난 달 마지막 날짜
  const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  console.log(lastDayOfLastMonth);

  const navMonth = document.querySelector('.nav-month');
  const navYear = document.querySelector('.nav-year');

  // 현재 년,월 보이기
  navMonth.innerText = months[currentMonth];
  navYear.innerText = currentYear;

  const dates = document.querySelector('.dates');
  dates.innerHTML = '';

  //현재 달에 이전 달 불러오기
  for (let i = firstDay; i > 0; i--) {
    const day = document.createElement('div');
    day.classList.add('pre-date');
    day.innerText = lastDayOfLastMonth - i + 1;
    dates.append(day);
  }

  //현재 달 만들기
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.innerText = i;
    day.classList.add('cur-date');
    dates.append(day);
    //오늘 표시
    if (
      i - firstDay + 1 === date.getDate() &&
      currentMonth === date.getMonth()
    ) {
      day.classList.add('today');
    }
  }

  //현재달에 다음달 불러오기
  for (let i = lastDay; i < 6; i++) {
    const day = document.createElement('div');
    day.classList.add('next-date');
    day.innerText = i - lastDay + 1;
    dates.append(day);
  }
};

renderCalendar();
