import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  countryId: string = '';
  response: any;
  error: boolean = false;
  imageRatio: string = '';
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private fetchS: FetchService) {}
  nativeName: string = '';
  async ngOnInit() {
    this.route.paramMap.subscribe((value) => {
      const id = value.get('id');
      this.countryId = id!;
    });

    this.response = await this.fetchS.fetchData(
      `https://restcountries.com/v3.1/alpha/${this.countryId}`
    );

    if (this.response.name === 'AxiosError') this.error = true;
    else {
      this.error = false;
    }

    console.log(this.response);
    this.nativeName = (
      Object.values(this.response.name.nativeName)[0] as {
        official: string;
        common: string;
      }
    ).official;

    this.imageRatio =
      this.response.image.width >= this.response.image.height
        ? 'horizontal'
        : 'vertical';
  }

  loaded(status: string) {
    this.isLoading = false;
    console.log(status);
  }
}
