import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  // title = 'angular-test';
  // cTitle: string = '';
  // cVolume: number = 0;

  // @ViewChild(CounterComponent) childComp: any;

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // this.cTitle = this.childComp.counterTitle;
    // this.cdref.detectChanges();
  }

  // receiveCounterVolume($event: number): void {
  //   this.cVolume = $event;
  // }
}
