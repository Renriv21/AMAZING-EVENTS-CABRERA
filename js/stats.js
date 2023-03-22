console.log("Prueba");

let tabla1 = document.getElementById("tabla1");
let tabla2 = document.getElementById("tabla2");
let tabla3 = document.getElementById("tabla3");

const apiURL = "https://mindhub-xj03.onrender.com/api/amazing";

// FUNCION ASINCRONA
async function getData() {
  let respuesta = await fetch(apiURL);
  let data = await respuesta.json();
  let eventos = await data.events;
  const currentDate = await data.currentDate;

  const pastEvents = await eventos.filter((e) => e.date < currentDate); //Filtra los eventos pasados
  const upEvents = await eventos.filter((e) => e.date >= currentDate); //Filtra los eventos futuros

  const upEventsPercentaje = await evenstPercentage(upEvents);
  const pastEventsPercentaje = await evenstPercentage(pastEvents);

  let sortedEventsPast = await pastEvents // Devuelve los 3 primeros eventos pasados por capacidad
    .sort((a, b) => b.capacity - a.capacity)
    .slice(0, 3);

  let evenstPastPercentageMax = evenstPercentage(pastEvents) // Devuelve los 3 primeros eventos pasados por %
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  let evenstPastPercentageMin = evenstPercentage(pastEvents) // Devuelve los 3 ultimos eventos pasados por %
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);
  // CREA LAS TABLAS EN HTML
  tabla1.innerHTML = crearTablas(
    evenstPastPercentageMax,
    evenstPastPercentageMin,
    sortedEventsPast
  );
  tabla2.innerHTML = crearTabla2(upEventsPercentaje);
  tabla3.innerHTML = crearTabla2(pastEventsPercentaje);

  //crearTables(data);
}

getData();

// FUNCION LOGICA NECESARIA PARA DETERMINAR LOS PORCENTAJES DE ASISTENCIA Y REVENUES
function evenstPercentage(array) {
  let crearTopsPercentage = [];
  for (element of array) {
    if (element.assistance != undefined) {
      crearTopsPercentage.push({
        id: element._id,
        nombre: element.name,
        category: element.category,
        capacity: element.capacity,
        assistance: element.assistance,
        percentage: ((element.assistance / element.capacity) * 100).toFixed(2),
        revenues: element.price * element.assistance,
      });
    } else {
      crearTopsPercentage.push({
        id: element._id,
        nombre: element.name,
        category: element.category,
        capacity: element.capacity,
        assistance: element.estimate,
        percentage: ((element.assistance / element.capacity) * 100).toFixed(2),
        revenues: element.price * element.estimate,
      });
    }
  }

  return crearTopsPercentage;
}

// FUNCION PARA CREAR LA PRIMER TABLA "EVENST STATS"
function crearTablas(arr1, arr2, arr3) {
  let tablas = "";
  for (let i = 0; i < 3; i++) {
    tablas += ` 
    <tr>
    <td> ${arr1[i].nombre}: (${arr1[i].percentage} %) </td>
    <td> ${arr2[i].nombre}: (${arr2[i].percentage} %) </td>
    <td> ${arr3[i].name}: ${arr3[i].capacity} Persons </td>
    </tr>`;
  }
  return tablas;
}
// FUNCION PARA CREAR LA SEGUNDA Y TERCER TABLA "UP Y PAST EVENTS STATS"
function crearTabla2(array) {
  let allCategorias = new Set(array.map((element) => element.category).sort());
  let tablas = "";
  for (categoria of allCategorias) {
    let sumaCat = 0;
    let acumAssis = 0;
    let acumCapa = 0;
    let porcentaje = 0;
    for (let i of array) {
      if (categoria == i.category) {
        sumaCat += i.revenues;
        acumCapa += i.capacity;
        acumAssis += i.assistance;
      }
    }
    porcentaje = ((acumAssis / acumCapa) * 100).toFixed(2);
    tablas += ` 
    <tr>
    <td> ${categoria} </td>
    <td> $ ${sumaCat} .- </td>
    <td> ${porcentaje} % </td>
    </tr>`;
  }
  return tablas;
}

console.log("fin del codigo");
