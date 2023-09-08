import { Injectable } from '@angular/core';
import axios from 'axios';
import { createClient } from 'pexels';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  client: any;
  constructor() {
    this.client = createClient(
      'DJwWqhUzWuiCvbYVgSpO7n033y2TBUiM4i49fQ8FkUl21UUNYaEzsMos '
    );
  }

  async fetchData(url: string) {
    try {
      const data = await axios.get(url);
      const query = data.data[0].name.common;
      const photos = await this.client.photos.search({ query, per_page: 1 });

      return { ...data.data[0], image: photos.photos[0] };
    } catch (err) {
      return err;
    }
  }
}
