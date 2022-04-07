import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer';


@Component({
  selector: 'app-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.scss']
})
export class OfferListItemComponent  {

  @Input() offer: IOffer | undefined;
  isListItemElement: boolean = true;
  
  constructor() { }


}
