import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, scale: 0 }),
        animate(200, style({ opacity: 1, scale: 1 })),
      ]),
      transition(':leave', [animate(200, style({ opacity: 0, scale: 0 }))]),
    ]),
  ],
})
export class InfoboxComponent implements OnInit {
  @Input() x: any;
  @Input() y: any;
  @Input() country: any;
  error: boolean = false;
  response: any;
  nativeName: string = '';
  languages: string[] = [];
  currencies: Array<{ name: string; symbol: string }> = [];
  isLoading: boolean = false;

  constructor(private fetchS: FetchService) {}

  ngOnInit(): void {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['country'].currentValue === changes['country'].previousValue)
      return;
    this.isLoading = true;
    this.response = null;
    this.response = await this.fetchS.fetchData(
      `https://restcountries.com/v3.1/alpha/${changes['country'].currentValue}`
    );

    if (this.response.name === 'AxiosError') this.error = true;
    else {
      this.error = false;

      this.nativeName = (
        Object.values(this.response.name.nativeName)[0] as {
          official: string;
          common: string;
        }
      ).official;

      this.languages = Object.values(this.response.languages);

      this.currencies = Object.values(this.response.currencies);
    }

    console.log(this.response);
  }

  loaded(status: string) {
    this.isLoading = false;
    switch (status) {
      case 'success':
        this.error = false;
        break;
      case 'error':
        this.error = true;
        break;
      default:
        break;
    }
  }
}
