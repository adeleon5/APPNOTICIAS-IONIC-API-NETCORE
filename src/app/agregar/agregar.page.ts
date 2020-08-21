import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../Services/noticias-service/noticias.service';
import {Autor} from '../models/autor.models'
import { Noticia } from '../models/noticia.models';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  autores: Autor[]= new Array<Autor>();
  noticia: Noticia= new Noticia();
  eseditable: boolean = false;

  constructor(
    private noticiasservicio: NoticiasService, 
    public loadingController: LoadingController,
    public toastController: ToastController,
    private state : ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    if(this.state.snapshot.params.noticia != undefined)
    {
      this.eseditable =true;
      this.noticia = new Noticia(JSON.parse(this.state.snapshot.params.noticia));
    }
    
    this.noticiasservicio.listadoAutores().subscribe(listaautores=>{
      console.log(listaautores)
      this.autores = listaautores;
    });
  }

  async guardar(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando Noticia...',
      //duration: 2000
    });
    await loading.present();

    this.noticiasservicio.agregarNoticia(this.noticia).subscribe(()=>{
      this.noticia = new Noticia(null);
      loading.dismiss();
      this.mostrarMensaje("Noticia Guardada!!");
    },error=>{
      console.log(error)
      this.mostrarMensaje("Ocurrió un error al guardar");
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

 async editarNoticia(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Editando Noticia...',
      //duration: 2000
    });
    await loading.present();

    this.noticiasservicio.editarNoticia(this.noticia).subscribe(()=>{
      this.noticia = new Noticia(null);
      loading.dismiss();
      this.mostrarMensaje("Noticia Editada");
      this.router.navigate(["/listado-noticias"]);
    },error=>{
      console.log(error)
      this.mostrarMensaje("Ocurrió un error al editar");
      loading.dismiss();
    });
  }

}
