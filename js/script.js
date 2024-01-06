const optionsSMART = [
  { name: 'extT', color: 'black' },
  { name: 'rh', color: 'blue' },
  { name: 'o3', color: 'gray' },
  { name: 'co', color: 'wheat' },
  { name: 'no2', color: 'yellow' },
  { name: 'pm25', color: 'red' },
  { name: 'pm10', color: 'green' },
];

const seriesMapSMART188 = {};
const seriesMapSMART189 = {};

// Parametres de configurations des graphes
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
    fillStyle: '#3d15d1'
  },
  tooltip: true,
  tooltipLine: {
    strokeStyle: '#bbbbbb'
  },
  scrollBackwards: true,
  timestampFormatter: SmoothieChart.timeFormatter,
  yRangeFunction: myYRangeFunction
};


// recuperation des donnees du capteur SMART188
function fetchDataSMART188() {
  fetch('https://airqino-api.magentalab.it/getCurrentValues/SMART188')
    .then(response => response.json())
    .then(data => {
      const timestamp = Date.now();
      data.values.forEach((sensor, index) => {
        seriesMapSMART188[optionsSMART[index].name].append(timestamp, sensor.value);
      });
    })
    .catch(error => console.error('Erreur lors du chargement:', error));
}


// recuperation des donnees du capteur SMART189
function fetchDataSMART189() {
  fetch('https://airqino-api.magentalab.it/getCurrentValues/SMART189')
    .then(response => response.json())
    .then(data => {
      const timestamp = Date.now();
      data.values.forEach((sensor, index) => {
        seriesMapSMART189[optionsSMART[index].name].append(timestamp, sensor.value);
      });
    })
    .catch(error => console.error('Erreur lors du chargement:', error));
}

function myYRangeFunction(range) {
  const min = -2; // valeur minimum sur la courbe
  const max = 102.5; // valeur maximum sur la courbe
  return { min, max };
}

// Exécution de la fonction fetchDataSMART188() et fetchDataSMART189() chaque 2s 
setInterval(fetchDataSMART188, 1000);
setInterval(fetchDataSMART189, 1000);

function createTimeline() {
  // creer deux graphes (SMART188, SMART189)
  const chart1 = new SmoothieChart(configuration);
  const chart2 = new SmoothieChart(configuration);

  optionsSMART.forEach((option) => {
    const seriesSMART188 = new TimeSeries();
    const seriesSMART189 = new TimeSeries();

    chart1.addTimeSeries(seriesSMART188, { strokeStyle: option.color, fillToBottom: false, lineWidth: 1 });
    chart2.addTimeSeries(seriesSMART189, { strokeStyle: option.color, fillToBottom: false, lineWidth: 1 });

    seriesMapSMART188[option.name] = seriesSMART188;
    seriesMapSMART189[option.name] = seriesSMART189;
  });

  chart1.streamTo(document.getElementById("chart1"), 1450);
  chart2.streamTo(document.getElementById("chart2"), 1450);
}
