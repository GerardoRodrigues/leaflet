import { Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  map!: L.Map
  layers: L.LayerGroup = new L.LayerGroup();
  routingControl: L.Routing.Control[] = [];
  markers: L.Marker[] = [];
  waypoints: L.LatLng[] = [];

  mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors' 
      }),
      this.layers
    ],
    zoom: 13,
    maxZoom: 18,
    zoomControl: false,
    preferCanvas: true,
    attributionControl: true,
    center: L.latLng(-3.71839, -38.5434)
  };

  setMarkers(){
    const markers = [
      L.marker([-3.77611, -38.5325], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          popupAnchor: [0, -41],
          iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
        })
        }).bindPopup('Aeroporto'),
      L.marker([-3.781954884441023, -38.52604866027832], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          popupAnchor: [0, -41],
          iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png'
        })
        }).bindPopup('Base Aérea'),
      L.marker([-3.784277968704043, -38.52928876876832], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste1'),
      L.circle([-3.771249346607826, -38.53076934814454],{
        radius: 330,
        color: 'red',
      }).bindPopup('Lagoa')
    ]

    markers.forEach(marker => {
      this.layers.addLayer(marker);
    })
  }

  getRoute(){
    const rota = L.Routing.control({
      waypoints: [
        L.latLng(-3.8059776295081944, -38.53640735149384),
        L.latLng(-3.803119343273129, -38.52821588516236)
      ],
      routeWhileDragging: true,
      show: true,
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      showAlternatives: true,
    }).addTo(this.map)

    this.routingControl.push(rota);
  }

  async onMapReady(lMap: L.Map) {
    this.map = lMap;
    this.setMarkers();

    setTimeout(() => lMap.invalidateSize(true), 0);
  }

  async onClickMap(e: L.LeafletMouseEvent){
    const marker = L.marker(e.latlng).addTo(this.map)
    this.markers.push(marker);
    this.addWaypoint(e.latlng)
  }

  addWaypoint(latlng: L.LatLng) {
    this.waypoints.push(latlng);

    if(this.waypoints.length === 2){
      const newRoute = L.Routing.control({
        waypoints:[
          L.latLng(this.waypoints[0]),
          L.latLng(this.waypoints[1])
        ],
        routeWhileDragging: true,
        show: true,
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 10
        },
        showAlternatives: true
      }).addTo(this.map);

      this.routingControl.push(newRoute);

      newRoute.on('routesfound', (e) => {
        const routes = e.routes;
        if (routes.length > 0) {
          const latlngs = routes[0].coordinates; 
          const carIcon = L.icon({
            iconUrl: 'assets/image/car.png',
            iconSize: [25, 41],
            iconAnchor: [ 13, 41 ],
            popupAnchor: [0, -41]
          });
          const marker = L.marker(latlngs[0], {icon: carIcon}).addTo(this.map); 
          this.markers.push(marker)
  
          this.animateMarkerAlongRoute(marker, latlngs, 5000); 
        }
      });

      this.waypoints = [];
    }
  }

  animateMarkerAlongRoute(marker: L.Marker, latlngs: L.LatLng[], duration: number) {
    const steps = latlngs.length; 
    const interval = duration / steps; 
    let currentStep = 0;
  
    const animate = () => {
      if (currentStep < steps) {
        marker.setLatLng(latlngs[currentStep]); 
        currentStep++;
        setTimeout(animate, interval); 
      }
    };
  
    animate();
  }

  clearRoutes(){
    this.routingControl.forEach(route => {
      this.map.removeControl(route);
    })
    this.routingControl = [];

    this.markers.forEach(marker => {
      this.map.removeLayer(marker)
    })
    this.markers = [];
  }
}
