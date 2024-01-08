// ##########################################
// Air Quality 54 project
// ##########################################

const optionsSMART = [
  { name: 'extT', color: 'black' },
  { name: 'rh', color: 'blue' },
  { name: 'o3', color: 'gray' },
  { name: 'co', color: 'wheat' },
  { name: 'no2', color: 'yellow' },
  { name: 'pm25', color: 'red' },
  { name: 'pm10', color: 'green' },
];


// Map des séries pour chaque capteur SMART
const seriesMaps = {
  SMART188: {},
  SMART189: {},
};



const configuration = {
  millisPerPixel: 15,
  grid: {
    fillStyle: 'white',
    borderVisible: false,
    strokeStyle: '#00FFFF',
    lineWidth: 1,
    millisPerLine: 450,
    verticalSections: 6,
  },
  labels: {
    fontSize: 15,
    precision: 3,
    showIntermediateLabels: true,
    fillStyle: '#3d15d1',
  },
  tooltip: true,
  tooltipLine: {
    strokeStyle: '#bbbbbb',
  },
  scrollBackwards: true,
  timestampFormatter: SmoothieChart.timeFormatter,
  yRangeFunction: myYRangeFunction,
};




// Fonction pour récupérer les données d'un capteur SMART
function fetchDataSMART(sensor, seriesMap) {
  fetch(`https://airqino-api.magentalab.it/getCurrentValues/${sensor}`)
    .then((response) => response.json())
    .then((data) => {
      const timestamp = Date.now();
      // Ajout des données dans les séries correspondantes
      data.values.forEach((sensorData, index) => {
        seriesMap[optionsSMART[index].name].append(timestamp, sensorData.value);
      });
    })
    .catch((error) => console.error('Erreur lors du chargement:', error));
}

// Fonction de la plage Y pour le graphique
function myYRangeFunction(range) {
  const min = -2;
  const max = 102.5;
  return { min, max };
}



// Fonction principale pour créer la timeline
function createTimeline() {
  // Liste des capteurs SMART à afficher
  const sensors = ['SMART188', 'SMART189'];

  // Création des graphiques pour chaque capteur SMART
  sensors.forEach((sensor) => {
    const chart = new SmoothieChart(configuration);
    const seriesMap = seriesMaps[sensor];

    // Ajout des séries au graphique
    optionsSMART.forEach(({ name, color }) => {
      const series = new TimeSeries();
      chart.addTimeSeries(series, { strokeStyle: color, fillToBottom: false, lineWidth: 1 });
      seriesMap[name] = series;
    });

    // Liaison du graphique à l'élément HTML correspondant
    chart.streamTo(document.getElementById(`chart${sensor}`), 1500);
  });

  // Récupération périodique des données pour chaque capteur SMART
  setInterval(() => {
    sensors.forEach((sensor) => {
      fetchDataSMART(sensor, seriesMaps[sensor]);
    });
  }, 1000);
}




// Fonction pour récupérer les données depuis l'API
function getMoreInfoFor2Station() {
  // Effectuez la requête fetch pour récupérer les données depuis l'API
  fetch('https://airqino-api.magentalab.it/getSessionInfo/AQ54')
    .then(response => response.json())
    .then(data => {
      // Construction le contenu HTML 
      const modalBody = document.querySelector('.modal-body');
      let content = '';

      // Boucle sur les données
      data.forEach(station => {
        content += `
          <p><b>Station:</b> ${station.station}</p>
          <p><b>Description:</b> ${station.description}</p> 
          <ul>
        `;

        // Ajout des capteurs intégrés
        station.integrated_sensors.forEach(sensor => {
          content += `<li>${sensor.type}: ${sensor.unit}</li>`;
        });

        content += '</ul><hr />';
      });

      // Ajouter le contenu construit à la modalBody
      modalBody.innerHTML = content;

      // Affichez la fenêtre modale
      $('#myModal').modal('show');
    })
    .catch(error => console.error('Erreur lors du chargement des données:', error));
}


