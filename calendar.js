const calendarCon = document.querySelector('.calendar-container');
const selectDate = document.querySelector('.select-date');
const calendarNav = document.querySelector('.calendar-nav');

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

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

const renderCalendar = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();
  const lastDayOfLastMonth = new Date(year, month, 0).getDate();

  const navMonth = document.querySelector('.nav-month');
  const navYear = document.querySelector('.nav-year');

  // 현재 년,월 보이기
  navMonth.innerText = months[month];
  navYear.innerText = year;

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
    if (
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
    ) {
      day.classList.add('today');
    }
    dates.append(day);
  }

  //현재 달에 다음달 불러오기
  for (let i = lastDay; i < 6; i++) {
    const day = document.createElement('div');
    day.classList.add('next-date');
    day.innerText = i - lastDay + 1;
    dates.append(day);
  }

  showSelectDate(month, year, dates);
};

// 버튼 클릭 시 네브에 년,월 업데이트
const updateDate = (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  e.target.id === 'prev' ? currentMonth-- : currentMonth++;

  // 1월 보다 작거나(이전년도), 12월 보다 큰 경우(다음년도)
  if (currentMonth < 0 || currentMonth > 11) {
    date = new Date(currentYear, currentMonth);
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
  }

  renderCalendar(currentMonth, currentYear);
};

// 날짜 선택 시 인풋에 보여주기
const showSelectDate = (month, year, dates) => {
  dates.addEventListener('click', (e) => {
    if (e.target.matches('.pre-date, .next-date') || e.target === dates) return;

    dates
      .querySelectorAll('.select')
      .forEach((day) => day.classList.remove('select'));
    e.target.classList.add('select');

    const day = e.target.innerText;
    selectDate.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
  });
};

// 날짜 선택 창 클릭 시 달력 보이기
const showCalendar = (e) => {
  e.stopPropagation();
  calendarCon.classList.toggle('hide');
};

//캘린더외에 다른영역이 클릭되면 숨기기
const hideCalendar = (e) => {
  if (!calendarCon.contains(e.target) && !selectDate.contains(e.target)) {
    calendarCon.classList.add('hide');
  }
};

renderCalendar(currentMonth, currentYear);

calendarNav.addEventListener('click', updateDate);
selectDate.addEventListener('click', showCalendar);
document.addEventListener('click', hideCalendar);
