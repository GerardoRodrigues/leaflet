import { Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster'
import 'leaflet-providers'
import 'leaflet.awesome-markers'
import { Luminaria, SituacaoLuminaria } from '../interfaces';
import { ModalController } from '@ionic/angular';
import { InfoLuminariasComponent } from '../components/info-luminarias/info-luminarias.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  map!: L.Map
  markers: L.Marker[] = [];
  markersGroup: L.MarkerClusterGroup = new L.MarkerClusterGroup();
  markersGroupToLine: L.MarkerClusterGroup = new L.MarkerClusterGroup();
  baseLayers = {
    'default': L.tileLayer('https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=bfXrf5CkTSqenCee9fXS3fAUyj5q9ouKrj483Z1FqyJFciGzBMRJJ3Q89CwUCVai', {
      attribution: "<a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"
    }),
    'otherOption': L.tileLayer('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=bfXrf5CkTSqenCee9fXS3fAUyj5q9ouKrj483Z1FqyJFciGzBMRJJ3Q89CwUCVai', {
      attribution: "<a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors"
    }),
//    'satelit': L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//      subdomains:['mt0','mt1','mt2','mt3']
//    }),
    'osatelit': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
  polylines: L.Polyline[] = [];
  markersToLine: L.LatLng[] = []
  create = false;
  lat!:number
  lng!:number
  popup!: string
  aux = true;
  routeActive = false;
  luminarias: Luminaria[] = [
    {
      id: 1,
      situacao: SituacaoLuminaria.Disponivel,
      posicaoGPS: {lat: -3.76125887908994, lng: -38.53401780121203},
      potenciaAtual: 100,
      alertaIncendio: false,
      dataAtualizacao: new Date()
    },
    {
      id: 2,
      situacao: SituacaoLuminaria.Arquivada,
      posicaoGPS: {lat: -3.7614622878735946, lng: -38.53333115570422},
      potenciaAtual: 150,
      alertaIncendio: false,
      dataAtualizacao: new Date()
    },
    {
      id: 3,
      situacao: SituacaoLuminaria.AguardandoInstalacao,
      posicaoGPS: {lat: -3.7616891898661704, lng: -38.532636165618904},
      potenciaAtual: 200,
      alertaIncendio: false,
      dataAtualizacao: new Date()
    },
    {
      id: 4,
      situacao: SituacaoLuminaria.Instalada,
      posicaoGPS: {lat: -3.7633994271842433, lng: -38.53316605087458},
      potenciaAtual: 130,
      alertaIncendio: true,
      dataAtualizacao: new Date()
    },
    {
      id: 5,
      situacao: SituacaoLuminaria.Manutencao,
      posicaoGPS: {lat: -3.7636295997125093, lng: -38.532484769784794},
      potenciaAtual: 300,
      alertaIncendio: true, 
      dataAtualizacao: new Date()
    },
    {
      id: 6,
      situacao: SituacaoLuminaria.Disponivel,
      posicaoGPS: {lat: -3.784277968704043, lng: -38.52928876876832},
      potenciaAtual: 100,
      alertaIncendio: false,
      dataAtualizacao: new Date()
    },
    {
      id: 7,
      situacao: SituacaoLuminaria.AguardandoInstalacao,
      posicaoGPS: {lat: -3.784303840163873, lng: -38.529140054815805},
      potenciaAtual: 200,
      alertaIncendio: false,
      dataAtualizacao: new Date()
    }
  ];

  setMarkers(){
    this.luminarias.forEach(luminaria => {
      const color = this.situacaoCor(luminaria.situacao);
      const marker = L.marker([luminaria.posicaoGPS.lat, luminaria.posicaoGPS.lng], {
        icon: L.AwesomeMarkers.icon({
          icon: 'fa-lightbulb-o',
          markerColor: color,
          prefix: 'fa'
        })
      })

      const situacaoCores = {
        'Disponível': 'green',
        'Aguardando Instalação': 'orange',
        'Instalada': 'blue',
        'Manutenção': 'red',
        'Arquivada': 'purple'
      }

      const corSituacao = situacaoCores[luminaria.situacao] || '#333';

      const popupContent = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; background-color: #f9f9f9; border-radius: 8px; padding: 15px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); width: 250px;">
        <h4 style="margin: 0; font-size: 16px; font-weight: bold; color: #007bff;">Luminária ID: ${luminaria.id}</h4>
        <p style="margin: 4px 0;"><strong>Situação:</strong> <span style="color: ${corSituacao};">${luminaria.situacao}</span></p>
        <p style="margin: 4px 0;"><strong>Localização:</strong> Lat: ${luminaria.posicaoGPS.lat.toFixed(5)}, Lng: ${luminaria.posicaoGPS.lng.toFixed(5)}</p>
        <p style="margin: 4px 0;"><strong>Potência:</strong> ${luminaria.potenciaAtual}W</p>
        <p style="margin: 4px 0; color: ${luminaria.alertaIncendio ? 'red' : '#333'};">
          <strong>Alerta de Incêndio:</strong> ${luminaria.alertaIncendio ? 'Sim' : 'Não'}
        </p>
        <p style="margin: 4px 0;"><strong>Data de Atualização:</strong> ${new Date(luminaria.dataAtualizacao).toLocaleString()}</p>
        <button id="info-btn-${luminaria.id}" style="margin-top: 10px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Mais informações</button>
      </div>`;
      marker.bindPopup(popupContent).on('popupopen', () => {
        const infoBotao = document.getElementById(`info-btn-${luminaria.id}`);
        infoBotao?.addEventListener('click', () => {
          this.abrirModal(luminaria);
        })
      })

      this.markersGroup.addLayer(marker);
    })
  }

  async abrirModal(luminaria: Luminaria){
    const modal = await this.modalController.create({
      component: InfoLuminariasComponent,
      componentProps: {
        luminaria: luminaria
      }
    })
    return await modal.present();
  }

  situacaoCor(cor: string){
    switch(cor){
      case 'Disponível': return 'green';
      case 'Aguardando Instalação': return 'orange';
      case 'Instalada': return 'blue';
      case 'Manutenção': return 'red';
      case 'Arquivada': return 'purple';
      default: return 'green';
    }
  }

  async onMapReady(lMap: L.Map) {
    this.map = lMap;
    L.control.layers(this.baseLayers).addTo(this.map)
    this.setMarkers();

    setTimeout(() => lMap.invalidateSize(true), 500);
  }

  async onClickMap(e: L.LeafletMouseEvent){
    if(this.routeActive){
      this.aux = true;
      const marker = L.marker(e.latlng).addTo(this.map)
      this.markersToLine.push(marker.getLatLng());
      this.markersGroupToLine.addLayer(marker)
      if(this.aux){
        this.map.addLayer(this.markersGroupToLine);
      }
      this.createPolyline()
    }
  }

  createPolyline(){
    if(this.markersToLine.length > 1){
      const polyline = L.polyline(this.markersToLine.slice(-2), {color: 'blue'}).addTo(this.map)
      this.polylines.push(polyline)
    }
    this.markersGroup.addLayers(this.polylines)
  }
  
  createRoute(){
    this.markersToLine = [];
    this.routeActive = true;
    alert('cria sua rota');
  }

  completeRoute(){
    this.routeActive = false;
    alert('Rota criada');
  }

  openDiv(){
    this.create = true;
  }

  clear(){
    this.aux = false

    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    })
    this.markers = [];

    this.polylines.forEach(polyline => {
      this.map.removeLayer(polyline)
    })
    this.polylines = []

    if(!this.aux){
      this.markersGroupToLine.clearLayers()
      this.map.removeLayer(this.markersGroupToLine);
    }
  }

  generateMarker(){
    const marker = L.marker([this.lat, this.lng], {
      icon: L.AwesomeMarkers.icon({
        icon: 'fa-lightbulb-o',
        markerColor: 'green',
        prefix: 'fa'
      })
    }).addTo(this.map).bindPopup(this.popup).openPopup();
    this.markersGroup.addLayer(marker)
    this.markers.push(marker)
    this.create = false;
    this.lat = 0;
    this.lng = 0;
    this.popup = '';
  }

  constructor(private modalController: ModalController){}
}
