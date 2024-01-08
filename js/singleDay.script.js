// ##########################################
// Air Quality 54 project
// ##########################################

var data_tab = [];


function validateInputData() {
  
  // Récupération les infos saisies par l'utilisateur
  const date = document.getElementById("date").value;
  const stationName = document.getElementById("stationName").value;

  // Vérification des champs non vides
  if (!date || !stationName) {
    alert("Veuillez saisir la date & le nom de la station.");
    return false;
  }
  return true;
}



function getDataForSingleDay() {

  // Validation des données
  if (!validateInputData()) {
    return;
  }

  // Récupération les infos saisies par l'utilisateur
  const date = document.getElementById("date").value;
  const stationName = document.getElementById("stationName").value;

  // Modifier l'apparence du bouton au clic
  const loadButton = document.getElementById('loadButton');
  loadButton.innerHTML = 'Chargement...';
  loadButton.disabled = true;

  const apiUrl = `https://airqino-api.magentalab.it/getSingleDay/${stationName}/${date}`;

  fetchData(apiUrl);
}

function fetchData(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data_tab = data.raw_data;

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
  const traces = Object.keys(data_tab[0]).map(key => {
    return {
      x: data_tab.map(entry => entry.utc_timestamp),
      y: data_tab.map(entry => entry[key]),
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

  Plotly.newPlot('chartsingleDay', traces, layout);
}

// Fonction d'initialisation du graphique
function initGraph() {
  var data = [{
      x: [1, 2, 3, 4, 5],
      y: [5, 10, 5, 8, 18],
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

  // Créez le graphique dans la div avec l'ID "chartsingleDay"
  Plotly.newPlot('chartsingleDay', data, layout);
}


