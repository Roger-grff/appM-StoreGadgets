import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';

import {
  GadgetsService,
  Gadget
} from '../../services/supabase.spec';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

@Component({

  selector: 'app-gadget-detalle',
  templateUrl:'./gadget-detalle.page.html',
  styleUrls:['./gadget-detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,

    IonButton
  ]
})
export class GadgetDetallePage implements OnInit {

  gadget?: Gadget;

  videoSeguro?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private gadgetsService: GadgetsService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.gadget =
      await this.gadgetsService.obtenerPorId(id);

    if (this.gadget.video_url) {

      this.videoSeguro =
        this.sanitizer
          .bypassSecurityTrustResourceUrl(
            this.gadget.video_url
          );
    }
  }
}