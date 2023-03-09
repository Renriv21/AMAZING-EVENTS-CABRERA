const contenedorTarjetas = document.getElementById("contenedor");
const checkboxes = document.querySelectorAll('input[name="categoria"]');

function crearTarjetas(arrayData) {
  let tarjetas = "";
  for (const event of arrayData.events) {
    tarjetas += `
            <div class="col" id="event-${event._id}">
                <div class="card h-100 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${event.image}" class="card-img-top" alt="card">
                    <div class="card-body">
                        <h4 class="card-title">${event.name}</h4>
                        <p class="card-text">${event.description}</p>
                        <h6 class ="card-category">Category: ${event.category}<h6>
                        <h6 class="card-stock">${event.date}</h6>
                    </div>
                    <div class="card-footer d-inline-flex justify-content-around">
                        <div class="d-flex align-items-center">
                            <h5>Price: ${event.price}$</h5>
                        </div>
                        <a class="btn btn-pink2 text-dark" href="../details.html?id=${event._id}">More Info</a>
                    </div>
                </div>
            </div>
        `;
  }

  return tarjetas;
}

contenedorTarjetas.innerHTML = crearTarjetas(Events);

function filtrarPorCategoria(eventos, categorias) {
  if (categorias.length === 0) {
    return eventos;
  } else {
    const eventosFiltrados = eventos.filter((evento) =>
      categorias.includes(evento.category)
    );
    return eventosFiltrados;
  }
}

function actualizarTarjetas() {
  const categoriasSeleccionadas = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  const eventosFiltrados = filtrarPorCategoria(
    Events.events,
    categoriasSeleccionadas
  );

  contenedorTarjetas.innerHTML = crearTarjetas({ events: eventosFiltrados });
}

function buscarEvento() {
  const inputBuscador = document.getElementById("buscador");
  const busqueda = inputBuscador.value.toLowerCase();
  const tarjetas = document.getElementsByClassName("col");

  let resultadosEncontrados = 0;
  for (const tarjeta of tarjetas) {
    const titulo = tarjeta
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const descripcion = tarjeta
      .querySelector(".card-text")
      .textContent.toLowerCase();
    const categoria = tarjeta
      .querySelector(".card-category")
      .textContent.toLowerCase();
    if (
      titulo.includes(busqueda) ||
      descripcion.includes(busqueda) ||
      categoria.includes(busqueda)
    ) {
      tarjeta.style.display = "block";
      resultadosEncontrados++;
    } else {
      tarjeta.style.display = "none";
    }
  }

  if (resultadosEncontrados === 0) {
    const contenedorTarjetas = document.getElementById("contenedor");
    contenedorTarjetas.innerHTML = `
        <div class="home w-100">
        <p class="mt-4 fs-1 fw-bold">Not Found </p>
        <img class="inline-block" src="https://cdn.discordapp.com/attachments/1066019385652822147/1083253573632147516/AmazingNotFound.png">
 
        </div>
 
        `;
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", actualizarTarjetas);
});

btnBuscar.addEventListener("click", buscarEvento);
