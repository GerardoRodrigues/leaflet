import { Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'
import 'leaflet.markercluster'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  map!: L.Map
  routingControl: L.Routing.Control[] = [];
  markers: L.Marker[] = [];
  markersGroup: L.MarkerClusterGroup = new L.MarkerClusterGroup();
  waypoints: L.LatLng[] = [];
  create = false;
  baseLayers = {
    'default': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution: '© OpenStreetMap contributors' 
    }),
    'other':  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    'ciclo': L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  }

  mapOptions: L.MapOptions = {
    layers: [
      this.markersGroup,
      this.baseLayers['default'],
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
      L.marker([-3.784303840163873, -38.529140054815805], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste2'),
      L.marker([-3.7843252510491285, -38.52900594436506], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste3'),
      L.marker([-3.7843582595234273, -38.52890253067017], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste4'),
      L.marker([-3.7843957285699212, -38.52875769138337], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste5'),
      L.marker([-3.76125887908994, -38.53401780121203], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste6'),
      L.marker([-3.7614622878735946, -38.53333115570422], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste7'),
      L.marker([-3.7616891898661704, -38.532636165618904], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste8'),
      L.marker([-38.532636165618904, -38.53194415569306], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste9'),
      L.marker([-3.7633994271842433, -38.53316605087458], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste10'),
      L.marker([-3.7636295997125093, -38.532484769784794], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/image/powerlinepole.png',
          popupAnchor: [0, -41]
        })
        }).bindPopup('Poste11'),
      L.circle([-3.771249346607826, -38.53076934814454],{
        radius: 330,
        color: 'red',
      }).bindPopup('Lagoa')
    ]

    this.markersGroup.addLayers(markers)
  }

  lat!:number
  lng!:number
  popup!: string
  invalid = false;

  generateMarker(){
    if(this.lat === 0 || this.lng === 0){
      this.invalid = true;
      return;
    }
    const marker = L.marker([this.lat, this.lng]).addTo(this.map).bindPopup(this.popup).openPopup();
    this.markersGroup.addLayer(marker)
    this.markers.push(marker)
    this.create = false;
    this.lat = 0;
    this.lng = 0;
    this.popup = '';
    this.invalid = false;
  }

  openDiv(){
    this.create = true;
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
    L.control.layers(this.baseLayers).addTo(this.map)
    this.setMarkers();

    setTimeout(() => lMap.invalidateSize(true), 0);
  }

  async onClickMap(e: L.LeafletMouseEvent){
    const marker = L.marker(e.latlng).addTo(this.map)
    this.markers.push(marker);
    this.addWaypointToRoute(e.latlng)
  }

  addWaypointToRoute(latlng: L.LatLng) {
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

      this.markers.forEach(marker => {
        this.map.removeLayer(marker)
      })
      this.markers = [];

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
