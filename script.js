
// Ejercicio 1
document.addEventListener("DOMContentLoaded", function () {
    if ("geolocation" in navigator) {
        // Obtener la posición actual del usuario
        navigator.geolocation.getCurrentPosition(position => {
            // latitud y longitud en la consola
            console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);

            // Mapa en el div con id "map" centrado en la ubicación del usuario
            var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 20);

            // capa de OpenStreetMap al mapa
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
                .bindPopup('Estás aquí') // Mostrar un mensaje al hacer clic en el marcador
                .openPopup(); // Abrir el popup de inmediato

        }, error => {
            console.error("Error al obtener la ubicación:", error);
        });
    } else {
        console.warn("Tu navegador no soporta Geolocalización!!");
    }
});



// 2. Dibujar en un mapa las coordenadas de posiciones donde hay terremotos

/// Inicializar el mapa y establecer la vista inicial
var map2 = L.map('map2').setView([20, 0], 2);

// Capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);

function getColor(magnitude) {
    if (magnitude < 2) return 'green';
    if (magnitude < 4) return 'yellow';
    if (magnitude < 5) return 'orange';
    if (magnitude < 6) return 'red';
    return 'purple';
}

// Función para obtener datos de terremotos y dibujar en el mapa
async function loadEarthquakeData() {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    const data = await response.json();

    // Iterar sobre cada terremoto en el conjunto de datos
    data.features.forEach(feature => {
        const coords = feature.geometry.coordinates;
        const properties = feature.properties;

        const magnitude = properties.mag;
        const title = properties.title;
        const time = new Date(properties.time).toLocaleString();
        const place = properties.place;
        const code = properties.code;
        const magType = properties.magType;

        //icono del marcador según la magnitud
        const marker = L.circleMarker([coords[1], coords[0]], {
            radius: magnitude * 0.8, // Tamaño del marcador en función de la magnitud
            fillColor: getColor(magnitude),
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map2);

        //popup 
        marker.bindPopup(`
            <strong>${title}</strong><br>
            <strong>Fecha:</strong> ${time}<br>
            <strong>Ubicación:</strong> ${place}<br>
            <strong>Código:</strong> ${code}<br>
            <strong>Magnitud:</strong> ${magnitude} (${magType})
        `);
    });
}

// cargar los datos de terremotos
loadEarthquakeData();

// 3.
var map3 = L.map('map3').setView([20, 0], 2);

// mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map3);

function getColor(magnitude) {
    if (magnitude < 2) return 'green';
    if (magnitude < 4) return 'yellow';
    if (magnitude < 5) return 'orange';
    if (magnitude < 6) return 'red';
    return 'purple';
}

// Función para obtener los datos de terremotos con filtros y dibujar en el mapa
async function loadFilteredEarthquakeData() {
    // Obtener los valores de los filtros
    const minMagnitude = document.getElementById('min-magnitude').value || 0;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    //URL con los parámetros de filtro
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=${minMagnitude}`;

    if (startDate) {
        url += `&starttime=${startDate}`;
    }
    if (endDate) {
        url += `&endtime=${endDate}`;
    }

    try {
        // Solicitar los datos de terremotos
        const response = await fetch(url);
        const data = await response.json();

        // Limpiar los marcadores anteriores en el mapa
        map3.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
                map3.removeLayer(layer);
            }
        });

        // Iterar sobre cada terremoto en el conjunto de datos
        data.features.forEach(feature => {
            const coords = feature.geometry.coordinates;
            const properties = feature.properties;

            const magnitude = properties.mag;
            const title = properties.title;
            const time = new Date(properties.time).toLocaleString();
            const place = properties.place;
            const code = properties.code;
            const magType = properties.magType;

            // marcador
            const marker = L.circleMarker([coords[1], coords[0]], {
                radius: magnitude * 0.8, // Tamaño del marcador en función de la magnitud
                fillColor: getColor(magnitude),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map3);

            // popup 
            marker.bindPopup(`
                <strong>${title}</strong><br>
                <strong>Fecha:</strong> ${time}<br>
                <strong>Ubicación:</strong> ${place}<br>
                <strong>Código:</strong> ${code}<br>
                <strong>Magnitud:</strong> ${magnitude} (${magType})
            `);
        });
    } catch (error) {
        console.error('Error al cargar los datos de terremotos:', error);
    }
}

// Datos de terremotos iniciales al abrir la página
loadFilteredEarthquakeData();
