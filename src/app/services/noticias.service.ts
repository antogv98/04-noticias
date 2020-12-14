import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key' : apiKey
});




@Injectable({
  providedIn: 'root'
})
export class NoticiasService {


  headLinesPage: number = 0;

  categoriaActual: string = '';
  categoriaPage: number = 0;

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string){


    query=apiUrl+query;
    
    return this.http.get<T>(query,{headers});
    
  }

  getTopHeadlines(){

   // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=1c2832e904e04085989b2a550adb585f`);
    
    this.headLinesPage++;
   return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);

  }


  getTopHeadLinesCategoria(categoria:string){

    if (this.categoriaActual===categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1c2832e904e04085989b2a550adb585f`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }



}
