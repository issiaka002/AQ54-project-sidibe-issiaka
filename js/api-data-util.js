// ##########################################
// Air Quality 54 project
// ##########################################

// Attend que le DOM soit chargé avant d'exécuter la fonction getStationInfo
document.addEventListener("DOMContentLoaded", getStationInfo);

// Déclaration d'un tableau pour stocker les données des stations
var donnee = [];


// Fonction pour effectuer la requête HTTP et récupérer les données des stations
function getStationInfo() {
  // Effectuer la requête HTTP avec fetch
  fetch('https://airqino-api.magentalab.it/getStations/AQ54')
    .then(response => {
      // Vérifier si la requête a réussi (statut 200 OK)
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Stocker les données dans la variable globale 'donnee'
      donnee = data;
      // Appeler la fonction pour afficher les stations
      displayStations();
    })
    .catch(error => {
      // Gérer les erreurs lors de la requête
      console.error('Erreur lors de la requête fetch:', error);
    });
}




// Fonction pour afficher les données des stations dans la page HTML
function displayStations() {
  // Récupérer l'élément contenant les stations dans le HTML
  const container = document.getElementById("stationContainer");

  // Parcourir chaque station dans le tableau 'donnee'
  donnee.forEach(station => {
    // Créer un élément div pour représenter une station
    const stationDiv = document.createElement("div");
    stationDiv.classList.add("card");

    // Créer un élément div pour la partie supérieure de la carte (head)
    const headDiv = document.createElement("div");
    headDiv.classList.add("card-head");
    // Créer un titre h2 avec le nom de la station
    const h2 = document.createElement("h2");
    h2.textContent = station.station_name;
    // Créer une icône (span avec la classe "las la-thermometer-half")
    const span = document.createElement("span");
    span.classList.add("las", "la-thermometer-half");

    // Ajouter le titre et l'icône à la partie supérieure de la carte
    headDiv.appendChild(h2);
    headDiv.appendChild(span);

    // Créer un élément div pour la partie inférieure de la carte (progress)
    const progressDiv = document.createElement("div");
    progressDiv.classList.add("card-progress");
    // Créer un élément small pour afficher la latitude de la station
    const smallLatitude = document.createElement("small");
    smallLatitude.textContent = `Latitude: ${station.latitude}`;
    // Créer un saut de ligne (<br>)
    const _newLine = document.createElement("br");
    // Créer un élément small pour afficher la longitude de la station
    const smallLongitude = document.createElement("small");
    smallLongitude.textContent = `Longitude: ${station.longitude}`;

    // Ajouter les éléments à la partie inférieure de la carte
    progressDiv.appendChild(smallLatitude);
    progressDiv.appendChild(_newLine);
    progressDiv.appendChild(smallLongitude);

    // Ajouter la partie supérieure et inférieure de la carte à la stationDiv
    stationDiv.appendChild(headDiv);
    stationDiv.appendChild(progressDiv);

    // Ajouter la stationDiv à l'élément contenant les stations
    container.appendChild(stationDiv);
  });
}
