import { Component, HostListener } from '@angular/core';
import { ViewportScroller} from '@angular/common';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {

  arrowUp: any = faAngleUp;

  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event: any){
    this.pageYoffset = window.pageYOffset;
  }

  constructor( private scroll: ViewportScroller) { }

  
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
}
