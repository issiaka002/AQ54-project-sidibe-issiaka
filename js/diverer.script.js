
var tab = [];

function getDataBetween2Date() {

  // recuperation des dates saisir pas l'utlisateur
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  // Modifier l'apparence du bouton au clic
  const loadButton = document.getElementById('loadButton');
  loadButton.innerHTML = 'Chargement...';
  loadButton.disabled = true;

  const apiUrl = `https://airqino-api.magentalab.it/getRange/SMART188/${startDate}/${endDate}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      tab = data.raw_data;

      //
      createPlotForDisplayData();
      // Rétablir l'apparence normale du bouton
      loadButton.innerHTML = 'Charger les données';
      loadButton.disabled = false;
    })
    .catch(error => {
      // En cas d'erreur, rétablir l'apparence normale du bouton
      loadButton.innerHTML = 'Charger les données';
      loadButton.disabled = false;

      console.error('Erreur lors de la requête fetch:', error);
    });
}


function createPlotForDisplayData() {
  //
  const traces = Object.keys(tab[0]).map(key => {
    return {
      x: tab.map(entry => entry.utc_timestamp),
      y: tab.map(entry => entry[key]),
      type: 'scatter',
      mode: 'lines+markers',
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


