const queryString = location.search;
const params = new URLSearchParams(queryString);
const idUrl = params.get("id");

const eventFound = events.find((event) => event._id == idUrl);
const contenedorDetails = document.getElementById("contenedor");
contenedorDetails.innerHTML = ` 
<div class="card  mb-3" style="max-width: 600px;">
<div class="row g-0">
    <div class="col-md-4">
        <img src="${eventFound.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${eventFound.name}</h5>
            <p class="card-text">${eventFound.description}</p>
            <p class="card-text"><small class="text-muted">${eventFound.date}</small></p>
        </div>
    </div>
</div>
</div>
`;
