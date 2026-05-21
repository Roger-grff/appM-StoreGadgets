import { Component, OnInit } from '@angular/core';

import {

  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonButton,
  IonFab,
  IonFabButton,

  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,

  IonSearchbar,

  IonGrid,
  IonRow,
  IonCol,

  IonChip

} from '@ionic/angular/standalone';

import { RouterLink }
from '@angular/router';

import { CommonModule }
from '@angular/common';

import {

  GadgetsService,
  Gadget

} from '../../services/supabase.spec';

@Component({

  selector: 'app-gadgets',

  templateUrl: './gadgets.page.html',

  styleUrls: ['./gadgets.page.scss'],

  standalone: true,

  imports: [

    CommonModule,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonButton,
    IonFab,
    IonFabButton,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,

    IonSearchbar,

    IonGrid,
    IonRow,
    IonCol,

    IonChip
  ]
})

export class GadgetsPage
implements OnInit {

  gadgets: Gadget[] = [];

  gadgetsFiltrados: Gadget[] = [];

  // AUDIOS

  audioAbrir = new Audio();

  audioBorrar = new Audio();

  constructor(

    private gadgetsService:
    GadgetsService

  ) {}

  ngOnInit() {

    // AUDIO ABRIR

    this.audioAbrir.src =
    'https://twadoryajboooyqaukag.supabase.co/storage/v1/object/public/gadgets-audios/abrir.mp3';

    // AUDIO BORRAR

    this.audioBorrar.src =
    'https://twadoryajboooyqaukag.supabase.co/storage/v1/object/public/gadgets-audios/borrar.mp3';

    this.audioAbrir.load();

    this.audioBorrar.load();

    this.cargar();
  }

  ionViewWillEnter() {

    this.cargar();
  }

  // CARGAR DATOS

  async cargar() {

    this.gadgets =
      await this.gadgetsService
        .listar();

    this.gadgetsFiltrados =
      this.gadgets;
  }

  // BUSCADOR

  buscar(event: any) {

    const texto =
      event.target.value
        .toLowerCase();

    this.gadgetsFiltrados =
      this.gadgets.filter(gadget =>

        gadget.nombre
          .toLowerCase()
          .includes(texto)

        ||

        gadget.marca
          .toLowerCase()
          .includes(texto)

        ||

        gadget.categoria
          ?.toLowerCase()
          .includes(texto)

      );
  }

  // SONIDO ABRIR

  sonidoAbrir() {

    this.audioAbrir.currentTime = 0;

    this.audioAbrir.play();
  }

  // SONIDO BORRAR

  sonidoBorrar() {

    this.audioBorrar.currentTime = 0;

    this.audioBorrar.play();
  }

  // ELIMINAR

  async eliminar(id: number) {

    const confirmar = confirm(

      '¿Deseas eliminar este gadget?'

    );

    if (!confirmar) return;

    await this.gadgetsService
      .eliminar(id);

    await this.cargar();
  }
}