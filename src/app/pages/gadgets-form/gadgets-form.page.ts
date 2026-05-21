import { Component, OnInit }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import {

  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonItem,
  IonLabel,
  IonInput,
  IonButton,

  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,

  IonTextarea

} from '@ionic/angular/standalone';

import { FormsModule }
from '@angular/forms';

import {

  ActivatedRoute,
  Router

} from '@angular/router';

import {

  DomSanitizer,
  SafeResourceUrl

} from '@angular/platform-browser';

import {

  GadgetsService,
  Gadget

} from '../../services/supabase.spec';

import {

  createClient

} from '@supabase/supabase-js';

import {environment} from 'src/environments/environment';

@Component({

  selector: 'app-gadgets-form',

  templateUrl:
    './gadgets-form.page.html',

  styleUrls:
    ['./gadgets-form.page.scss'],

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonItem,
    IonLabel,
    IonInput,
    IonButton,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,

    IonTextarea
  ]
})

export class GadgetsFormPage
implements OnInit {

  id?: number;

  videoSeguro?:
    SafeResourceUrl;

  // AUDIO

  audioGuardar =
    new Audio();

  // SUPABASE

  supabase = createClient(

    environment.supabaseUrl,

    environment.supabaseKey

  );

  gadget: Gadget = {

    nombre: '',

    marca: '',

    modelo: '',

    precio: 0,

    stock: 0,

    categoria: '',

    descripcion: '',

    imagen_url: '',

    video_url: '',

    audio_url: ''
  };

  constructor(

    private route:
    ActivatedRoute,

    private router:
    Router,

    private gadgetsService:
    GadgetsService,

    private sanitizer:
    DomSanitizer

  ) {}

  async ngOnInit() {

    // AUDIO GUARDAR

    this.audioGuardar.src =
    'https://twadoryajboooyqaukag.supabase.co/storage/v1/object/public/gadgets-audios/guardar.mp3';

    this.audioGuardar.load();

    // ID

    const idParam =

      this.route
        .snapshot
        .paramMap
        .get('id');

    if (idParam) {

      this.id =
        Number(idParam);

      this.gadget =

        await this.gadgetsService
          .obtenerPorId(
            this.id
          );

      this.actualizarVideoSeguro();
    }
  }

  // VIDEO SEGURO

  actualizarVideoSeguro() {

    if (
      this.gadget.video_url
    ) {

      this.videoSeguro =

        this.sanitizer
          .bypassSecurityTrustResourceUrl(

            this.gadget.video_url

          );
    }
  }

  // SONIDO GUARDAR

  sonidoGuardar() {

    this.audioGuardar.currentTime = 0;

    this.audioGuardar.play();
  }

  // SUBIR IMAGEN

  async subirImagen(event: any) {

    const file =
      event.target.files[0];

    if (!file) return;

    const nombreArchivo =

      `${Date.now()}-${file.name}`;

    const { error } =

      await this.supabase.storage

        .from(
          'gadgets-imagenes'
        )

        .upload(
          nombreArchivo,
          file
        );

    if (error) {

      console.log(error);

      return;
    }

    const { data } =

      this.supabase.storage

        .from(
          'gadgets-imagenes'
        )

        .getPublicUrl(
          nombreArchivo
        );

    this.gadget.imagen_url =

      data.publicUrl;
  }

  // GUARDAR

  async guardar() {

    if (this.id) {

      await this.gadgetsService
        .actualizar(

          this.id,
          this.gadget

        );

    } else {

      await this.gadgetsService
        .crear(
          this.gadget
        );
    }

    // SONIDO

    this.sonidoGuardar();

    // REDIRECCION

    this.router.navigate([
      '/gadgets'
    ]);
  }
}