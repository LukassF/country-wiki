import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentTheme: string = 'light';
  constructor(private themeS: ThemeService) {}

  ngOnInit(): void {}

  toggleTheme() {
    this.themeS.modifyTheme(this.currentTheme);
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }
}
