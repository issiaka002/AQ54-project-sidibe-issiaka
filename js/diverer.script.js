// ##########################################
// Air Quality 54 project
// ##########################################

var donnee = [];

function validateDates() {
  
  // Récupération des dates saisies par l'utilisateur
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const stationName = document.getElementById("stationName").value;

  // Vérification des champs non vides
  if (!startDate || !endDate || !stationName) {
    alert("Veuillez saisir le nom de la station et les deux dates !!!");
    return false;
  }

  // Conversion des dates en objets Date
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Vérification que startDate est antérieur à endDate
  if (startDateObj >= endDateObj) {
    alert("La date de début doit être antérieure à la date de fin.");
    return false;
  }
  return true;

}

function getDataBetween2Date() {

  // Validation des données
  if (!validateDates()) {
    return;
  }

  // Récupération des données saisies par l'utilisateur
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const stationName = document.getElementById("stationName").value;

  // Modifier l'apparence du bouton au clic
  const loadButton = document.getElementById('loadButton');
  loadButton.innerHTML = 'Chargement...';
  loadButton.disabled = true;

  const apiUrl = `https://airqino-api.magentalab.it/getRange/${stationName}/${startDate}/${endDate}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      donnee = data.raw_data;

      // Appeler la fonction pour rafraichir le graphique
      createPlotForDisplayData();
      // Rétablir l'apparence normale du bouton
      loadButton.innerHTML = 'Charger les données';
      loadButton.disabled = false;
    })
    .catch(error => {

      // En cas d'erreur, rétablir l'apparence normale du bouton
      loadButton.innerHTML = 'Charger les données';
      loadButton.disabled = false;
      // Affichage des erreurs dans la console
      alert("Il y a eu une erreur lors du chargement des données, veillez vérifier que les données sont bien renseignées et réessaiyee svp !!");
      console.error('Erreur lors de la requête http :', error);
    });
}


function createPlotForDisplayData() {
  //
  const traces = Object.keys(donnee[0]).map(key => {
    return {
      x: donnee.map(entry => entry.utc_timestamp),
      y: donnee.map(entry => entry[key]),
      type: 'line',
     
      name: key
    };
  });

  // Parametre du graphe
  const layout = {
    title: 'Évolution des données au fil du temps',
    xaxis: {
      title: 'Temps'
    },
    yaxis: {
      title: 'Valeurs'
    }
  };

  Plotly.newPlot('plotlyChart', traces, layout);
}

// Fonction d'initialisation du graphique
function initGraph() {
  var data = [{
      x: [1, 2, 3, 4, 5],
      y: [10, 11, 12, 13, 14],
      type: 'line'
  }];

  // Paramètres de mise en page du graphique
  var layout = {
      title: 'Évolution des données au fil du temps',
      xaxis: {
          title: 'Temps'
      },
      yaxis: {
          title: 'Valeurs '
      }
  };

  // Créez le graphique dans la div avec l'ID "plotlyChart"
  Plotly.newPlot('plotlyChart', data, layout);
}


