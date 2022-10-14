const date = new Date();
const locale = "pt-br"

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toLocaleDateString(locale);

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prevDate">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="nextDate">${j}</div>`;
    monthDays.innerHTML = days;
  }

  var numMes = (date.getMonth() + 1);

  

  changeToDoDay(numMes);
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  var numMes = (date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  var numMes = (date.getMonth() + 1);
  renderCalendar();
});

function changeToDoDay(Mes) {
  window.days.onclick = e => {
    var dia = (e.target.textContent);
    console.log(dia,Mes);

    if(Mes<10 && dia<10){
      document.getElementById("diaTitulo").innerHTML=("0"+dia+"/"+"0"+Mes);
    }
    else if(Mes<10){
      document.getElementById("diaTitulo").innerHTML=(dia+"/"+"0"+Mes);
    }
    else if(dia<10){
      document.getElementById("diaTitulo").innerHTML=("0"+dia+"/"+Mes);
    }
    else{
      document.getElementById("diaTitulo").innerHTML=(dia+"/"+Mes);
    }

  }
}



renderCalendar();








