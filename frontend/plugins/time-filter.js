import Vue from 'vue'

const timeFilter = value => {
  return formatDate(value);
};

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const minute = toDoubleDigits(date.getMinutes());
  const hour = toDoubleDigits(date.getHours());
  const formattedDate = hour + ":" + minute;
  return formattedDate;
}
function toDoubleDigits(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
}
Vue.filter('time', timeFilter)
