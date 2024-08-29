const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");

const countryData = async () => {
  const BASE_URL = "https://restcountries.com/v3.1/";
  const type = "all";
  try {
    const URL = `${BASE_URL}${type}`;
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("something went wrong");
    }
    const data = await res.json();
    renderCountries(data);
  } catch (error) {
    console.error(error);
  }
};

countryData();

const renderCountries = (data) => {

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    searchDiv.innerHTML = "";
    const filteredCountries = data.filter(country =>
      country.name.common.toLowerCase().includes(query)
      
    );
    filteredCountries.forEach((country) => {
      const countrySpan = document.createElement("span");
      countrySpan.classList.add(
        "list",
        "rounded-3",
        "border",
        "border-2",
        "p-1"
      );
      countrySpan.textContent = country.name.common;
      countrySpan.addEventListener("click", () => {
      displayCountryDetails(country);
    });
    searchDiv.appendChild(countrySpan)
    });    
  });
};
 const displayCountryDetails=(country)=>{
  countries.innerHTML=`<div class="card shadow-lg" style="width: 22rem">
             <img src="${country.flags.png}" class="card-img-top shadow" alt="..." />
            <div >
              <h5 class="p-2 text-center">${country.name.common}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${country.region}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i>
                <span class="fw-bold"> Capitals:</span> ${country.capital}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i>
                <span class="fw-bold"> Languages:</span> ${country.languages}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                <span class="fw-bold"> Currencies:</span> ${country.currencies}
              </li>
              <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i></i>
              <span class="fw-bold"> Population:</span> ${country.population}
            </li>
              <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold"> Borders:</span>  ${country.borders}
            </li>
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="harita adresi" target='_blank'> ${country.maps.googleMaps}</a> </li>
            </ul>
          </div>`
 }