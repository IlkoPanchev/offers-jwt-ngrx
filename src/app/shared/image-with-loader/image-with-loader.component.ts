import { Component, Input } from '@angular/core';
import {AppConstants} from '../../core/app-constants'

@Component({
  selector: 'app-image-with-loader',
  templateUrl: './image-with-loader.component.html',
  styleUrls: ['./image-with-loader.component.scss']
})
export class ImageWithLoaderComponent {

  @Input() loader:string = AppConstants.IMG_LOADER_LINK;

  @Input() link:string | undefined;

  @Input() isDetailsPage: boolean = false;

  @Input() isListItemElement: boolean = false;

  isLoading:boolean;
  
  constructor() { 
    this.isLoading = true;
  }

  hideLoader(){
    this.isLoading = false;
  }

}
