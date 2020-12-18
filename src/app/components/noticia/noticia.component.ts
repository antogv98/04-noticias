import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() indice:number;
  @Input() enFavoritos;



  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform:Platform) { }

  ngOnInit() {

    console.log('Favoritos', this.enFavoritos);
    
  }

  abrirNoticia(){
    console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarBtn;

    if(this.enFavoritos){
      //borrar de favoritos

      guardarBorrarBtn={
        
        text: 'Borrar favorito',
        icon: 'trash-outline',
        cssClass: 'iconoFavorito',
        handler: () => {
          console.log('Borrar favorite clicked');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
    }
    }else{
      //agregar a favoritos
      guardarBorrarBtn={
        
          text: 'Favorito',
          icon: 'heart',
          cssClass: 'iconoFavorito',
          handler: () => {
            console.log('Favorite clicked');
            this.dataLocalService.guardarNoticia(this.noticia);
          }
      }

    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'action',
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');

          this.compartirNoticia();

          
        }
      },
      guardarBorrarBtn, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia(){

    if(this.platform.is('cordova')){

      this.socialSharing.share(
                this.noticia.title,
                this.noticia.source.name,
                '',
                this.noticia.url
            );

    }else{

      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('Navegador no soporta compartir');
        
      }

    }
      
  }

}
