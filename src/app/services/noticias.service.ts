import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  pageNumber = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private httpClient: HttpClient ) { }


  private ejecutarQuery<T>( query: string ){
    query = apiUrl + query;
    return this.httpClient.get<T>( query, {headers} );
  }

  getTopHeadLines(){
    this.pageNumber++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.pageNumber}`);
  }

  getTopHeadLinesCategory(category: string){
    if(this.categoriaActual === category){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`);
  }
}
