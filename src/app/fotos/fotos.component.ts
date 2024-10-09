import { Component } from '@angular/core';
import { takePicture, requestPermissions } from '@nativescript/camera';
import { RouterExtensions } from '@nativescript/angular';
import { ImageSource } from '@nativescript/core';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent {
  fotos: ImageSource[] = [];

  constructor(private routerExtensions: RouterExtensions) {}

  async tomarFoto() {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        console.log('No se otorgaron permisos de cámara');
        return;
      }
      const imageAsset = await takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true
      });
      const imageSource = await ImageSource.fromAsset(imageAsset);
      this.fotos.unshift(imageSource);
    } catch (error) {
      console.log("Error al tomar la foto: ", error);
    }
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}