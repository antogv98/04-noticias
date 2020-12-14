import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  noticias: Article[]=[];

  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(){
    this.cargarnoticias();
  }

  loadData(event){
    
    this.cargarnoticias(event);
  }

  cargarnoticias(event?){
    this.noticiasService.getTopHeadlines()
        .subscribe(resp => {
          this.noticias.push(...resp.articles);
          if(resp.articles.length==0){
            event.target.disable=true;
            event.target.complete();
          }
          
        })

       if(event){event.target.complete();}
  }
  

}
