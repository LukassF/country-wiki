import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';
import { TooltipService } from '../services/tooltip/tooltip.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentTheme: string = 'light';
  constructor(private themeS: ThemeService, public tooltipS: TooltipService) {}

  ngOnInit(): void {}

  toggleTheme() {
    this.themeS.modifyTheme(this.currentTheme);
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }

  toggleShowTooltip() {
    this.tooltipS.showTooltipFunc();
  }
}
