import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  root: any;
  constructor() {
    this.root = document.querySelector(':root');
  }

  modifyTheme(theme: string) {
    switch (theme) {
      case 'light':
        this.root.style.setProperty(
          '--background-main',
          'rgba(238, 236, 236, 0.9)'
        );
        this.root.style.setProperty('--text-main', 'rgb(7, 2, 53)');
        break;
      case 'dark':
        this.root.style.setProperty('--background-main', 'rgba(0, 0, 0,0.9)');
        this.root.style.setProperty('--text-main', 'rgb(230, 227, 227)');
        break;
      default:
        break;
    }
  }
}
