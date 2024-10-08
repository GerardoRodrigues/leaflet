import { Component, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Luminaria } from 'src/app/interfaces';

@Component({
  selector: 'app-info-luminarias',
  templateUrl: './info-luminarias.component.html',
  styleUrls: ['./info-luminarias.component.scss'],
})
export class InfoLuminariasComponent{

  @Input() luminaria!: Luminaria;

  constructor(private modalController: ModalController) {}

  getCorSituacao(situacao: string){
    switch(situacao){
      case 'Disponível':
        return 'green';
      case 'Aguardando Instalação':
        return 'orange';
      case 'Instalada':
        return 'blue';
      case 'Manutenção':
        return 'red';
      case 'Arquivada':
        return 'purple';
      default:
        return 'green';
    }
  }

  fecharModal(){
    this.modalController.dismiss();
  }
}
