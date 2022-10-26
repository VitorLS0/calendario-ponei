
const date = new Date();
const locale = "pt-br"

var last = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDate();

console.log(last);

const listaTarefasMock = {
  "tarefas": [
    {
      "nome": "",
      "dia": "",
      "prazo": "",
      "descricao": "",
      "color": ""
    }
  ]
}

let listaTarefas = JSON.parse(localStorage.getItem("dbTasks"));
if (!listaTarefas) {
  listaTarefas = listaTarefasMock;
}




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

  document.querySelector(".date p").innerHTML = "Hoje:<br>" + new Date().toLocaleDateString(locale);

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prevDate">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today" id="d${i}">${i}</div>`;
    } else {
      days += `<div id="d${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="nextDate">${j}</div>`;

    monthDays.innerHTML = days;
  }

  var numMes = (date.getMonth() + 1);



  changeToDoDay(numMes);

  renderTarefas(numMes);

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

// Define o título da parte de tarefas de acordo com o dia atual

var dia = new Date().getDate();
var Mes = new Date().getMonth() + 1;
document.getElementById("toDoHoje").innerHTML = ("Hoje");

if (Mes < 10) {
  document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
}
else {
  document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);

  //
}

renderCalendar();

renderTarefas();

// Muda o título da parte de tarefas de acordo com o dia clicado no calendário

function changeToDoDay(MesReset) {
  window.days.onclick = e => {
    dia = (e.target.textContent).match(/\d+/g); // Separa os números na string
    console.log(dia, Mes);
    Mes = MesReset;

    // Muda o título (dd/mm) e coloca um "0" em números do dia e mês menores que 10

    if (e.target.className.includes("prevDate")) {
      Mes -= 1;
    }

    if (e.target.className.includes("nextDate")) {
      if (Mes == 12) {
        Mes = 1;
      }
      else {
        Mes += 1;
      }
    }


    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }



    // Muda o subtítulo

    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }



  }
}


// Volta pro dia atual

function Hoje() {

  var dia = new Date().getDate();
  var Mes = new Date().getMonth() + 1;
  document.getElementById("toDoHoje").innerHTML = ("Hoje");

  if (Mes < 10 && dia < 10) {
    document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
  }
  else if (Mes < 10) {
    document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
  }
  else if (dia < 10) {
    document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
  }
  else {
    document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
  }

  date.setMonth(new Date().getMonth());
  renderCalendar();
}


// Volta um dia 

function funcPrevDia() {

  if (dia > 1) {

    dia -= 1;

    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }


    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }
  }

  console.log(dia);
}


// Avança um dia

function funcNextDia() {

  if (dia < last) {

    console.log(last);
    dia = dia - 1 + 1;
    dia += 1;

    if (Mes < 10 && dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + "0" + Mes);
    }
    else if (Mes < 10) {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + "0" + Mes);
    }
    else if (dia < 10) {
      document.getElementById("diaTitulo").innerHTML = ("0" + dia + "/" + Mes);
    }
    else {
      document.getElementById("diaTitulo").innerHTML = (dia + "/" + Mes);
    }


    if (dia == new Date().getDate() && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Hoje");
    }
    else if (dia == new Date().getDate() - 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Ontem");
    }
    else if (dia == new Date().getDate() + 1 && Mes == new Date().getMonth() + 1) {
      document.getElementById("toDoHoje").innerHTML = ("Amanhã");
    }
    else {
      document.getElementById("toDoHoje").innerHTML = ("");
    }
  }

  console.log(dia);

}


// Abre o formulário para criar nova tarefa

function novaTarefa() {

  document.getElementById("formDiv").style.display = "inline";
}


// Transforma os dados do formulário em uma array e salva no local storage

function funcForm() {

  var dataHoje = document.getElementById("diaTitulo").innerHTML;

  let task = Array.from(document.querySelectorAll('#formulario input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  task.dia = dataHoje;
  task.cor = document.querySelector("#cor").value;
  console.log(task)
  listaTarefas.tarefas.push(task)
  console.log(listaTarefas.tarefas)
  localStorage.setItem("dbTasks", JSON.stringify(listaTarefas))


  document.getElementById("formDiv").style.display = "none";
  document.getElementById("formulario").reset();
  renderTarefas();
  renderCalendar();
}


// Coloca a cor no dia com tarefa

//const matches = [];
//for (const div of days.querySelectorAll('div')) {
//  if (div.textContent == "1" && div.className != "prevDate" && div.className != "nextDate") {
//    matches.push(div);
//    days.div.innerHTML += "&nbsp <b id='b' class='blue'></b>";
//  }
//}

function renderTarefas(Mes) {

  var j = 1;

  for (var i = 1; i < (listaTarefas.tarefas.length); i++) {


    if (listaTarefas.tarefas[i].dia.slice(0, 2) < 10) {

      var diaTarefa = listaTarefas.tarefas[i].dia.slice(1, 2);
      var diaDiv = document.querySelector(".d" + diaTarefa);

      if (Mes == listaTarefas.tarefas[i].dia.slice(3, 5)) {

        document.querySelector("#d" + diaTarefa).innerHTML += `&nbsp<b id='circulo${j}' > ● </b>`;
        document.querySelector("#circulo" + j).setAttribute('class', (listaTarefas.tarefas[i].cor));

        j += 1;
      }

    }

    else {

      var diaTarefa = listaTarefas.tarefas[i].dia.slice(0, 2);
      var diaDiv = document.querySelector("#d" + diaTarefa);

      if (Mes == listaTarefas.tarefas[i].dia.slice(3, 5)) {
        console.log(diaTarefa);
        console.log(diaDiv);

        document.querySelector("#d" + diaTarefa).innerHTML += `&nbsp <b id='circulo${j}' > ● </b>`;
        document.querySelector("#circulo" + j).setAttribute('class', (listaTarefas.tarefas[i].cor));

        j += 1;
      }

    }

  }

}



//const matches = [];
//for (const div of document.querySelectorAll('div')) {
//  if (div.className.includes("prevDate")) {
//    matches.push(div);
//  }
//}
//
//console.log(matches); // 👉️ [div.box]




//function liveSearch() {
//  // Locate the card elements
//  let cards = document.querySelectorAll('.cards')
//  // Locate the search input
//  let search_query = document.getElementById("searchbox").value;
//  // Loop through the cards
//  for (var i = 0; i < cards.length; i++) {
//    // If the text is within the card...
//    if(cards[i].innerText.toLowerCase()
//      // ...and the text matches the search query...
//      .includes(search_query.toLowerCase())) {
//        // ...remove the `.is-hidden` class.
//        cards[i].classList.remove("is-hidden");
//    } else {
//      // Otherwise, add the class.
//      cards[i].classList.add("is-hidden");
//    }
//  }
//}