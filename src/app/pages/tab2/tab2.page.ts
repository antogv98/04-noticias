import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{


  @ViewChild(IonSegment,{ static: true }) segment: IonSegment;

  categorias: string [] =['business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'];


  noticias:Article[]=[];


  constructor(private noticiasService:NoticiasService) {}


  ngOnInit(){

   this.cargarNoticias(this.categorias[0]);

  }

  cambioCategoria(event){

    this.noticias=[];

    this.cargarNoticias(event.detail.value);

  }

  loadData(event){
    
    this.cargarNoticias(this.segment.value,event);
  }


  cargarNoticias(categoria:string, event?){
  
    this.noticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp => {
        this.noticias.push(...resp.articles);
        if(resp.articles.length==0){
          event.target.disable=true;
          event.target.complete();
        }
        if(event){event.target.complete();}
    });
  }

}
