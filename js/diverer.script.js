
var tab = [];

function getDataBetween2Date() {

  // recuperation des dates saisir pas l'utlisateur
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const apiUrl = `https://airqino-api.magentalab.it/getRange/SMART188/${startDate}/${endDate}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      tab = data.raw_data;

      //
      createPlotForDisplayData();
    })
    .catch(error => {
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
