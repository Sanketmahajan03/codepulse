import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit{
  private file? : File;
  fileName: string = '';
  title : string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static : false}) imageUploadForm?: NgForm;

  constructor(private imageServeice: ImageService) {

  }
  ngOnInit(): void {
   this.getImages();
  }

  OnFileUploadChange(event: Event): void{
    const element = event.currentTarget as HTMLInputElement
    this.file = element.files?.[0];
  }

  uploadImage(): void{
    if(this.file && this.fileName !== '' && this.title !== '') {
      //images services to upload image
      this.imageServeice.uploadImage(this.file,this.fileName,this.title)
      .subscribe({
        next : (responce) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }

  selectImage(image: BlogImage): void{
    this.imageServeice.selectImage(image);
  }

  private getImages(){
    this.images$ =  this.imageServeice.getAllImages();
  }
}
