import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timer = null;
let timer2 = null;
// let selectedDate;

function resetTimer() {
  clearInterval(timer);
  timer = null;
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function setDisplayValues(days = '0', hours = '0', minutes = '0', seconds = '0') {
  spanDaysRef.textContent = addLeadingZero(String(days));
  spanHoursRef.textContent = addLeadingZero(String(hours));
  spanMinutesRef.textContent = addLeadingZero(String(minutes));
  spanSecondsRef.textContent = addLeadingZero(String(seconds));
}

function updateTimerDisplay() {
  const selectedDate = fp.selectedDates[0];
  // const dateNow = new Date();
  let dateDiff = selectedDate - Date.now();//dateNow.getTime();
  if (dateDiff <= 0) {
    resetTimer();
    Notiflix.Notify.success('Time is up!');
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(dateDiff);
  setDisplayValues(days, hours, minutes, seconds);
}

function onStartClick(evt) {
  if (timer2) {
    clearTimeout(timer2);
    timer2 = null;
  }
  timer = setInterval(updateTimerDisplay, 1000);
  btnStartRef.disabled = true;
}

const btnStartRef = document.querySelector("[data-start]");
btnStartRef.addEventListener('click', onStartClick);
btnStartRef.disabled = true;
const spanDaysRef = document.querySelector("[data-days]");
const spanHoursRef = document.querySelector("[data-hours]");
const spanMinutesRef = document.querySelector("[data-minutes]");
const spanSecondsRef = document.querySelector("[data-seconds]");

const fp = flatpickr("input#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    if (timer2) {
      clearTimeout(timer2);
      timer2 = null;
    }
    if (timer) {
      resetTimer();
      setDisplayValues();
    }
    const dateNow = Date.now();//new Date();
    if (selectedDate < dateNow) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartRef.disabled = true;
      return;
    }
    btnStartRef.disabled = false;
    timer2 = setTimeout(() => {
      btnStartRef.disabled = true;
      Notiflix.Notify.warning('You late. Choose time again.');
    }, selectedDate - dateNow);//.getTime());
  },
});