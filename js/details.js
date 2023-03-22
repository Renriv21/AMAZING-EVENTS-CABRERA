const queryString = location.search;
const params = new URLSearchParams(queryString);
const idUrl = params.get("id");

const eventFound = events.find((event) => event._id == idUrl);
const contenedorDetails = document.getElementById("contenedor");
contenedorDetails.innerHTML = ` 
<div class="col-12 col-sm-6 my-5" id="event-${eventFound._id}">
<div class="card p-1 bg-body-tertiary rounded ">
<img src="${eventFound.image}" id="detailsimage" class="card-img-top p-3 " alt="card">
<div class="card-body">
  <h4 class="card-title">${eventFound.name}</h4>
    <p class="card-text">${eventFound.description}</p>
  <h6 class ="card-category">Category: ${eventFound.category}</h6>
  <h6 class ="card-category">Capacity: ${eventFound.capacity}</h6>
  <h6 class ="card-category">Date: ${eventFound.date}</h46>
  <h6 class ="card-category">Place: ${eventFound.place}</h6>
  <h6 class ="card-category">Assistance: ${eventFound.assistance}</h6>
  <h6 class ="card-category">Estimate: ${eventFound.estimate}</h6>
  </div>
 
  <div class="card-footer d-inline-flex justify-content-around">
                        <div class="d-flex align-items-center">
                        <h5>Price: ${eventFound.price}$</h5>
                        </div>
                        <a class="btn btn-pink2 text-dark" href="#">To buy</a>
            </div>
        </div>
    </div>
`;
