import { Component } from '@angular/core';
import country from 'world-map-country-shapes';
import { TooltipService } from '../services/tooltip/tooltip.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  mapCountries: any = country;
  zoom: number = 1;
  x: number = 0;
  y: number = 0;
  initialX: number = 0;
  initialY: number = 0;
  tooltipCoords: { x: number; y: number } = { x: 0, y: 0 };
  selectedCountry: { id: string; shape: string } = { id: '', shape: '' };
  infoCoords: { x: number; y: number } = { x: 0, y: 0 };
  showInfo: boolean = false;
  tooltip: string = '';
  isMouseDown: boolean = false;
  rect: any = {};
  viewBox: string = `${this.x} ${this.y} ${2000 / this.zoom} ${
    1000 / this.zoom
  }`;
  wheelEventListener: boolean = false;

  constructor(public tooltipS: TooltipService) {}

  updateViewBox() {
    this.viewBox = `${
      this.x < 0
        ? 0
        : this.x > 2000 - Math.round(2000 / this.zoom)
        ? 2000 - Math.round(2000 / this.zoom)
        : this.x
    } ${
      this.y < 0
        ? 0
        : this.y > 1000 - Math.round(1000 / this.zoom)
        ? 1000 - Math.round(1000 / this.zoom)
        : this.y
    } ${2000 / this.zoom} ${1000 / this.zoom}`;
  }

  mouseDown(map: any, e: MouseEvent) {
    this.initialX = e.clientX + this.x;
    this.initialY = e.clientY + this.y;

    this.isMouseDown = true;
  }

  mouseMove(e: MouseEvent) {
    if (this.isMouseDown && this.zoom > 1) {
      const xBoundries = 2000 - Math.round(2000 / this.zoom);
      const yBoundries = 1000 - Math.round(1000 / this.zoom);

      if (this.x <= xBoundries && this.x >= 0)
        this.x = this.initialX - e.clientX;
      else if (this.x > xBoundries) {
        this.x = xBoundries;
      } else if (this.x < 0) {
        this.x = 0;
      }

      if (this.y <= yBoundries && this.y >= 0)
        this.y = this.initialY - e.clientY;
      else if (this.y > yBoundries) {
        this.y = yBoundries;
      } else if (this.y < 0) {
        this.y = 0;
      }
    }

    this.tooltipCoords.x = e.clientX;
    this.tooltipCoords.y = e.clientY - 100;

    this.updateViewBox();
    if (this.selectedCountry.id) this.setInfoPosition();
  }

  mouseUp() {
    this.isMouseDown = false;
  }

  mouseLeave(e: Event) {
    this.isMouseDown = false;
  }

  mouseEnter(e: Event, map: HTMLElement) {
    const rectInit = map.getBoundingClientRect();
    this.rect = Object.assign(rectInit);

    if (!this.wheelEventListener)
      e.currentTarget?.addEventListener('wheel', (wheel) =>
        this.zoomInOut(wheel)
      );

    this.wheelEventListener = true;
  }

  zoomInOut(wheel: any) {
    if (
      wheel.deltaY < 0 &&
      Math.round((this.zoom + Number.EPSILON) * 100) / 100 < 3
    ) {
      this.zoom += 0.05;
    }

    if (
      wheel.deltaY > 0 &&
      Math.round((this.zoom + Number.EPSILON) * 100) / 100 > 1
    ) {
      this.zoom -= 0.05;

      if (this.zoom === 1) {
        this.x = 0;
        this.y = 0;
      }
    }

    this.updateViewBox();
    if (this.selectedCountry.id) this.setInfoPosition();
  }
  setTooltip(countryId: string) {
    this.tooltip = countryId;
  }

  setCountry(country: { id: string; shape: string }, event: any) {
    if (
      event.target.tagName === 'path' &&
      event.currentTarget.tagName === 'path'
    ) {
      this.selectedCountry = country;
      this.setInfoPosition();
      this.showInfo = true;
    } else if (
      event.currentTarget.tagName === 'svg' &&
      event.target.tagName === 'svg'
    ) {
      this.showInfo = false;
      this.selectedCountry = country;
    }
  }

  setInfoPosition() {
    let shapeY = parseFloat(
      this.selectedCountry.shape.split(' ')[1].split('l')[0]
    );
    let shapeX = parseFloat(this.selectedCountry.shape.split(' ')[0].slice(1));
    console.log(shapeY + 400);

    if (shapeX + 300 > 1800) shapeX = 1400;
    if (shapeX < 0) shapeX = 100;
    if (shapeY + 400 > 800) shapeY = 400;
    if (shapeY < 0) shapeY = 100;

    let fixedX =
      this.x < 0
        ? 0
        : this.x > 2000 - 2000 / this.zoom
        ? 2000 - 2000 / this.zoom
        : this.x;
    let fixedY =
      this.y < 0
        ? 0
        : this.y > 1000 - 1000 / this.zoom
        ? 1000 - 1000 / this.zoom
        : this.y;

    this.infoCoords.x = ((shapeX - fixedX) / 20) * this.zoom;
    this.infoCoords.y = ((shapeY - fixedY) / 10) * this.zoom;
  }
}
