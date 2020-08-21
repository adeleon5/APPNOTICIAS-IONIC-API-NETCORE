import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../Services/noticias-service/noticias.service';
import { Noticia } from '../models/noticia.models';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  noticias:Noticia[];

  constructor(
    private noticiasservicio: NoticiasService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.verNoticias();
  }

  verNoticias(){
    this.noticiasservicio.verNoticias().subscribe(noticias=>{
      this.noticias = noticias;
      //console.log(noticias);
    },(error)=>{
      console.log(error)
    });
  }

  irDetalle(noticia: Noticia){
    this.router.navigate(["noticia-detalle",{noticia:JSON.stringify(noticia)}])
  }

  async eliminarNoticia(noticiaID: number, indice: number){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Eliminando...',
      //duration: 2000
    });
    await loading.present();

    this.noticiasservicio.eliminarNoticia(noticiaID).subscribe(()=>{
      loading.dismiss(); 
      this.noticias.splice(indice,1); 
      this.mostrarMensaje("Noticia Eliminada");
    },(error)=>{
      console.log(error)
      this.mostrarMensaje("Ocurrió un error al eliminar la noticia");
      loading.dismiss();
    });
  }

  async mostrarMensaje(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  editar(noticia: Noticia){
    this.router.navigate(['/agregar', {noticia: JSON.stringify(noticia)}])
  }

}
