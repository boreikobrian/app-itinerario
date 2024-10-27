import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { 
  takePicture, 
  requestPermissions as requestCameraPermissions 
} from '@nativescript/camera';
import { 
  ImageSource, 
  knownFolders, 
  path, 
  File,
  ApplicationSettings
} from '@nativescript/core';
import { 
  Mediafilepicker, 
  ImagePickerOptions 
} from '@nativescript/imagepicker';

interface FotoData {
  path: string;
  fecha: Date;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  fotos: { source: ImageSource; data: FotoData }[] = [];
  fotoSeleccionada: { source: ImageSource; data: FotoData } | null = null;
  
  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.cargarFotosGuardadas();
  }

  private async cargarFotosGuardadas() {
    const fotosGuardadas = ApplicationSettings.getString('fotos');
    if (fotosGuardadas) {
      const fotosData: FotoData[] = JSON.parse(fotosGuardadas);
      for (const fotoData of fotosData) {
        try {
          const source = await ImageSource.fromFile(fotoData.path);
          if (source) {
            this.fotos.push({ 
              source, 
              data: { ...fotoData, fecha: new Date(fotoData.fecha) }
            });
          }
        } catch (error) {
          console.error('Error cargando foto:', error);
        }
      }
    }
  }

  private guardarFotos() {
    const fotosData = this.fotos.map(foto => foto.data);
    ApplicationSettings.setString('fotos', JSON.stringify(fotosData));
  }

  async selectFromGallery() {
    try {
      const mediafilepicker = new Mediafilepicker();
      const options: ImagePickerOptions = {
        android: {
          isCaptureMood: false,
          isNeedCamera: false,
          maxNumberFiles: 10,
          isNeedFolderList: true
        },
        ios: {
          isCaptureMood: false,
          maxNumberFiles: 10
        }
      };

      const selection = await mediafilepicker.pickImage(options);
      if (selection && selection.length > 0) {
        for (const imageAsset of selection) {
          const source = await ImageSource.fromAsset(imageAsset);
          const fileName = `gallery_${Date.now()}.jpg`;
          const folderPath = knownFolders.documents().path;
          const filePath = path.join(folderPath, fileName);
          
          if (source.saveToFile(filePath, "jpg")) {
            const fotoData: FotoData = {
              path: filePath,
              fecha: new Date()
            };
            this.fotos.unshift({ source, data: fotoData });
          }
        }
        this.guardarFotos();
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
    }
  }

  async tomarFoto() {
    try {
      await requestCameraPermissions();
      const imageAsset = await takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true
      });
      
      const source = await ImageSource.fromAsset(imageAsset);
      const fileName = `camera_${Date.now()}.jpg`;
      const folderPath = knownFolders.documents().path;
      const filePath = path.join(folderPath, fileName);
      
      if (source.saveToFile(filePath, "jpg")) {
        const fotoData: FotoData = {
          path: filePath,
          fecha: new Date()
        };
        this.fotos.unshift({ source, data: fotoData });
        this.guardarFotos();
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }

  verFoto(foto: { source: ImageSource; data: FotoData }) {
    this.fotoSeleccionada = foto;
  }

  cerrarVistaPrevia() {
    this.fotoSeleccionada = null;
  }

  deletePhoto(index: number) {
    const foto = this.fotos[index];
    try {
      const file = File.fromPath(foto.data.path);
      file.remove();
      this.fotos.splice(index, 1);
      this.guardarFotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  }

  onBackTap() {
    this.routerExtensions.back();
  }
}