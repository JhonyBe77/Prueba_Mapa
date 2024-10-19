# Proyecto de Visualización de Terremotos 🌋

Este proyecto tiene como objetivo visualizar la ubicación de terremotos en un mapa interactivo utilizando la librería Leaflet. Además, se implementan filtros para mostrar solo aquellos terremotos que cumplan con ciertos criterios de magnitud y fechas.

## 🔍 Funcionalidades

1. **Posicionamiento en un mapa**: Utiliza Leaflet para cargar un mapa y posicionar al usuario.
2. **Visualización de Terremotos**: Dibuja en el mapa las coordenadas de las posiciones donde han ocurrido terremotos, utilizando marcadores o círculos.
3. **Filtrado de Terremotos**: Permite al usuario filtrar los terremotos por magnitud y por un rango de fechas (inicio y fin).

## 📋 Requisitos

Asegúrate de tener instaladas las siguientes librerías:

- [Leaflet](https://leafletjs.com/)

## 🚀 Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/JhonyBe77/Prueba_Mapa.git

Abre el archivo index.html en tu navegador para visualizar el mapa.

## Uso 🗺️
Ejercicio 1 Cargar el Mapa: Al abrir el archivo index.html, se cargará un mapa centrado en una ubicación predeterminada.
Ejercicio 2 Mostrar Terremotos: Se mostrarán los terremotos en el mapa como puntos (marcadores o círculos) en función de las coordenadas obtenidas de una API o de un conjunto de datos.
Ejercicio 3 Filtrar Terremotos: Utiliza los controles de filtrado para seleccionar terremotos por magnitud y por fechas. Los datos se actualizarán dinámicamente en el mapa.
Ejemplo de Código 💻
Aquí hay un ejemplo de cómo puedes implementar la visualización de terremotos utilizando Leaflet:

javascript
Copiar código
// Inicialización del mapa
var map = L.map('map').setView([20.0, 0.0], 2);

// Capa de mapas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Ejemplo de datos de terremotos
var terremotos = [
    { lat: 37.7749, lon: -122.4194, magnitud: 5.1, fecha: '2024-10-10' },
    { lat: 34.0522, lon: -118.2437, magnitud: 4.5, fecha: '2024-10-15' },
    // Más datos...
];

// Dibujar terremotos en el mapa
terremotos.forEach(function(terremoto) {
    L.circle([terremoto.lat, terremoto.lon], {
        color: 'red',
        radius: terremoto.magnitud * 10000
    }).addTo(map).bindPopup(`🌋 Magnitud: ${terremoto.magnitud}<br>📅 Fecha: ${terremoto.fecha}`);
});
