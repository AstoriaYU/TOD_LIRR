var token = 'pk.eyJ1IjoiYXN0b3JpYSIsImEiOiJjanR1aWV5aTgwdG5qNDVtcDdkcGh4bWU3In0.6LPQecMoTd7G0V0APrkg3w';
/*var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
  center: [-73.129100, 40.820666]
});
*/

  /* =====================
  Leaflet Configuration
  =====================

// Try some differnet basemaps:
basemapURL = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
// basemapURL = "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
// basemapURL = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

var Stamen_TonerLite = L.tileLayer(basemapURL, {
// if you change the basemap, and publish it on the web, you should attribute accurately
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);*/

var map = L.map('map', {
  center: [40.820666, -73.129100],
  zoom: 10
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

var streetlayer=L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/streets-v11'
});

var lightlayer=L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/light-v10'
});

var darklayer=L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/dark-v10'
});

var outdoorlayer=L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/outdoors-v11'
});

var satelayer=L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/satellite-v9'
});


/*var gl = L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/streets-v11'
}).addTo(map);*/

/*var switchlayer = function(){
  if ($("#streets-v11").checked)
  {return 'mapbox://styles/mapbox/streets-v11';}
  else if ($("#light-v10").checked)
  {return 'mapbox://styles/mapbox/light-v10';}
  else if ($("#dark-v10").checked)
  {return 'mapbox://styles/mapbox/dark-v10';}
  else if ($("#outdoors-v11").checked)
  {return 'mapbox://styles/mapbox/outdoors-v11';}
  else if ($("#satellite-v9").checked)
  {return 'mapbox://styles/mapbox/satellite-v9';}
};*/
var switchlayer=()=>{
  map.removeLayer(streetlayer);
  map.removeLayer(lightlayer);
  map.removeLayer(darklayer);
  map.removeLayer(outdoorlayer);
  map.removeLayer(satelayer);
if ($("#streets-v11").prop('checked'))
{
  streetlayer.addTo(map);
}
else {
  map.removeLayer(streetlayer);
}
if ($("#light-v10").prop('checked'))
{
  lightlayer.addTo(map);
}
else {
  map.removeLayer(lightlayer);
}
if ($("#dark-v10").prop('checked'))
{
  darklayer.addTo(map);
}
else {
  map.removeLayer(darklayer);
}
if ($("#outdoors-v11").prop('checked'))
{
  outdoorlayer.addTo(map);
}
else {
  map.removeLayer(outdoorlayer);
}
if ($("#satellite-v9").prop('checked'))
{
  satelayer.addTo(map);
}
else {
  map.removeLayer(satelayer);
}
};


window.onload = function() {
  switchlayer();
	$("#chartContainer").CanvasJSChart({
		title: {
			text: "Weights of criteria"
		},
		data: [
		{
			type: "bar",
			toolTipContent: "{label}: weight {y}",
			dataPoints: [
        { label: "Walkability",       y: 0.02},
        { label: "Intensity",       y: 0.03},
        { label: "Travel Time Ratio", y: 0.04  },
        { label: "Available Land",           y: 0.05  },
        { label: "Residential Market", y: 0.06  },
        { label: "Non-Car Commuters",             y: 0.07},
        { label: "Development Activity",           y: 0.09},
        { label: "TCI",           y: 0.12},
        { label: "Non-Car Ownership",    y: 0.13  },
        { label: "Economy",            y: 0.19},
				{ label: "Job Access",             y: 0.20  }
			]
		}
		]
	});


  //alert("Click button to change background.click markers to see the location of my home, highschool, and college.");
};

function getColor(count) {
  return count > 20.83 ? '#581845' :
    count > 14.39 ? '#900C3F' :
    count > 8.64 ? '#C70039' :
    '#FF5733';
}

function pointStyle1(feature, latlng) {
    return L.circleMarker(latlng, {
        stroke: false, radius: 5, color: getColor(feature.properties.TOD_score), fillOpacity: 0.8}).bindPopup(feature.properties.stopname);
}

function onEachFeature(feature, layer) {
  layer.bindPopup("<b>"+feature.properties.stopname+"</b>"+ "</br>"+"TOD score: "+feature.properties.TOD_score+
  "</b>"+ "</br>"+"Job Access: "+feature.properties.job_access+
  "</b>"+ "</br>"+"Economy: "+feature.properties.customer_a+
  "</b>"+ "</br>"+"Non-car Ownership: "+feature.properties.HH_0_car+
  "</b>"+ "</br>"+"TCI: "+feature.properties.TCI+
  "</b>"+ "</br>"+"Development Activity: "+feature.properties.high_dev+
  "</b>"+ "</br>"+"Non-car Commuter: "+feature.properties.WK_0_car+
  "</b>"+ "</br>"+"Residential Market: "+feature.properties.Med_Hval+
  "</b>"+ "</br>"+"Available Land: "+feature.properties.avlb_land+
  "</b>"+ "</br>"+"Travel Time Ratio: "+feature.properties.AT_ratio+
  "</b>"+ "</br>"+"Intensity: "+feature.properties.intensity+
  "</b>"+ "</br>"+"Walkability: "+feature.properties.walkscore);
  layer.on('click', function(e) {
    map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 16);
    if(feature.properties) {
      console.log(feature.properties.stopname);
      $('#station').text("Station: "+feature.properties.stopname);
      $('#route').text("Route: "+feature.properties.routename);
      $('#street').text("Address: "+feature.properties.streetname+", "+feature.properties.County);
      $('#tod').html("TOD Score: "+feature.properties.TOD_score);
  }
});
}

var linelayer = L.geoJSON(lineGeoJson, {style: function(feature) {
        switch (feature.properties.routename) {
            case 'Babylon': return {color: "#c11b1b", weight: 1, opacity: 0.7};
            case 'Belmont': return {color: "#c15d1b", weight: 1, opacity: 0.7};
            case 'City Zone':   return {color: "#bfa918", weight: 1, opacity: 0.7};
            case 'Far Rockaway':   return {color: "#8abf18", weight: 1, opacity: 0.7};
            case 'Hempstead': return {color: "#36bf18", weight: 1, opacity: 0.7};
            case 'Long Beach':   return {color: "#18bf98", weight: 1, opacity: 0.7};
            case 'Montauk': return {color: "#18aebf", weight: 1, opacity: 0.7};
            case 'Oyster Bay':   return {color: "#1965c1", weight: 1, opacity: 0.7};
            case 'Port Jefferson': return {color: "#1619ba", weight: 1, opacity: 0.7};
            case 'Port Washington':   return {color: "#7415af", weight: 1, opacity: 0.7};
            case 'Ronkonkoma': return {color: "#aa12a3", weight: 1, opacity: 0.7};
            case 'West Hempstead':   return {color: "#a3106d", weight: 1, opacity: 0.7};
        }
    }});

map.addLayer(linelayer);

var layer1 = L.geoJSON(stationGeoJson, {pointToLayer: pointStyle1, onEachFeature: onEachFeature});

var layer2 = L.geoJSON(bufferGeoJson, {style: {
  fillcolor: "#a3106d", color: "#18aebf", opacity: 0.5}, onEachFeature: onEachFeature
});

var legend = $('#legend');


/*legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 8.64, 14.39, 20.83, 100],
        labels = [0, 8.64, 14.39, 20.83, 100];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};*/


//build slides
var slides = [{
    title: "LIRR Station TOD Opportunity",
    text: "Click a station to explore TOD opportunity",
    layer: layer1
  }
];

var currentSlide = 0;

var addTitle = (title) => {
  $('.sidebar').prepend(`<h1 id='title'>${title}</h1>`);
}

var addText = (text) => {

  $('#title').after(`<p class = "textinfo" id='text'>${text}</p>`);
}

var setLayer = (layer) => {
layer=layer1
layer.addTo(map);
$('.sidebar').append(legend);
map.on('click', onEachFeature);
};

var numtodlayer=[];

var filterLayer = () => {
  map.removeLayer(layer1);
  map.removeLayer(layer2);
  mintod = $('#numeric-input1').val();
  maxtod = $('#numeric-input2').val();
  numtodlayer = L.geoJson(stationGeoJson, {
    pointToLayer: pointStyle1,
    filter: function(feature, layer) {
      return feature.properties.TOD_score >= mintod && feature.properties.TOD_score <= maxtod;
    },
    onEachFeature: onEachFeature
  });
  numtodlayer.addTo(map);
};

var cleanup = () => {
  map.removeLayer(layer2);
  map.removeLayer(numtodlayer);
  map.setView([40.820666, -73.129100], 10);

};

var buildSlide = (slideObject) => {
addTitle(slideObject.title);
addText(slideObject.text);
setLayer(slideObject.layer);
}

buildSlide(slides[currentSlide]);

var resetSlide = (slideObject) => {
  $('#station').text("Station");
  $('#route').text("Route");
  $('#street').text("Address");
  $('#tod').html("TOD Score");
  $('#numeric-input1').val("");
  $('#numeric-input2').val("");
  setLayer(slideObject.layer);
}

$("#buffer").click(() => {
  map.removeLayer(layer1);
  layer2.addTo(map);
  layer1.addTo(map);
})

$("#filter").click(() => {
  cleanup();
  filterLayer();
})

$("#change").click(() => {
  switchlayer();
})

$( "#reset" ).click(() => {
  cleanup();
  resetSlide(slides[currentSlide]);
});
