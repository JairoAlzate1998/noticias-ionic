import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  constructor( private actionSheetCtrl:  ActionSheetController, private socialSharing: SocialSharing, private dataLocalService: DataLocalService) { }

  ngOnInit() {
    console.log(this.enFavoritos);
    
  }

  async lanzarMenu(){

    let guardarBorrarBtn;
    if(this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
        
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
