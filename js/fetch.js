document.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
  // Effectuer la requête HTTP avec fetch
  fetch('https://airqino-api.magentalab.it/getStations/AQ54')
    .then(response => {
      // Vérifier si la requête a réussi (statut 200 OK)
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      // Convertir la réponse JSON en objet JavaScript
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Appeler la fonction pour afficher les données dans le tableau HTML
      affichage(data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête fetch:', error);
    });
}

function affichage(data) {
  const card = document.querySelector('#card');

  // Effacer le contenu précédent du tableau
  card.innerHTML = '<div></div>';

  // Parcourir le tableau d'objets et ajouter chaque objet au tableau HTML
  data.forEach(item => {
    const container = document.createElement('div');
    const stationName = document.createElement('div');
    const longitude = document.createElement('div');
    const latitude = document.createElement('div');

    stationName.textContent = item.station_name;
    longitude.textContent = item.longitude;
    latitude.textContent = item.latitude;

    container.appendChild(stationName);
    container.appendChild(longitude);
    container.appendChild(latitude);

    card.appendChild(container);
  });
}
