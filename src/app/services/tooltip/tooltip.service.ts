import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  showTooltip: boolean = true;

  constructor() {}

  showTooltipFunc() {
    this.showTooltip = !this.showTooltip;
  }
}
