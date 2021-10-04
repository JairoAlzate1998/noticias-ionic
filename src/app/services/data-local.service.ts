import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService implements OnInit {
  noticias: Article[] = [];

  private _storage: Storage | null = null;

  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }

  async ngOnInit() {}

  async guardarNoticia(noticia: Article) {    
    const existe = this.noticias.find((noti) => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);      
      this._storage.set('favoritos', this.noticias);
      await this.cargarFavoritos();
    }
    this.presentToast( 'Agregado a Favoritos' );
  }

  async cargarFavoritos() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia:Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this._storage.set('favoritos', this.noticias);
    this.presentToast( 'Borrado de Favoritos' );
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: "primary"
    });
    toast.present();
  }

}
