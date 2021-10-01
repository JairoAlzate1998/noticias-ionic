import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor( private noticiasCtrl: NoticiasService ) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ){
    this.noticiasCtrl.getTopHeadLines().subscribe(
      (res) => {
        if(res.articles.length === 0){
          event.target.disabled=true;
          event.target.complete();
          return;
        }
        this.noticias.push( ... res.articles );
        if(event){
          event.target.complete();
        }
      }
    );
  }
}
