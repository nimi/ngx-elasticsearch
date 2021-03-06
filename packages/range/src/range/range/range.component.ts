import {
  Component, ElementRef,
  AfterViewInit, OnDestroy, Input,
  Output, EventEmitter,
  forwardRef,Renderer2
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxRangeComponent),
  multi: true
};

@Component({
  selector: 'ngx-es-range',
  template: `
    <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ngx-es-range':true,'ngx-es-state-disabled':disabled,
        'ngx-es-range-horizontal':orientation == 'horizontal','ngx-es-range-vertical':orientation == 'vertical','ngx-es-range-animate':animate}"
        (click)="onBarClick($event)">
        <span *ngIf="range" class="ngx-es-range-range" [ngStyle]="{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}"></span>
        <span *ngIf="orientation=='vertical'" class="ngx-es-range-range ngx-es-range-range-min" [ngStyle]="{'height': handleValue + '%'}"></span>
        <span *ngIf="!range" class="ngx-es-range-handle" (mousedown)="onMouseDown($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="dragging=false"
            [style.transition]="dragging ? 'none': null" [ngStyle]="{'left': orientation == 'horizontal' ? handleValue + '%' : null,'bottom': orientation == 'vertical' ? handleValue + '%' : null}"></span>
        <span *ngIf="range" (mousedown)="onMouseDown($event,0)" (touchstart)="onTouchStart($event,0)" (touchmove)="onTouchMove($event,0)" (touchend)="dragging=false" [style.transition]="dragging ? 'none': null" class="ngx-es-range-handle" 
            [ngStyle]="{'left':handleValues[0] + '%'}" [ngClass]="{'ngx-es-range-handle-active':handleIndex==0}"></span>
        <span *ngIf="range" (mousedown)="onMouseDown($event,1)" (touchstart)="onTouchStart($event,1)" (touchmove)="onTouchMove($event,1)" (touchend)="dragging=false" [style.transition]="dragging ? 'none': null" class="ngx-es-range-handle" 
            [ngStyle]="{'left':handleValues[1] + '%'}" [ngClass]="{'ngx-es-range-handle-active':handleIndex==1}"></span>
    </div>
    <div class="ngx-es-range-min-max" *ngIf="showMinMax">
        <span>{{ min }}</span>
        <span>{{ max }}</span>
    </div>
  `,
  styles: [],
  providers: [SLIDER_VALUE_ACCESSOR]
})
export class NgxRangeComponent implements OnDestroy, AfterViewInit, ControlValueAccessor {

  @Input() animate: boolean;

  @Input() disabled: boolean;

  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() orientation: string = 'horizontal';

  @Input() step: number;

  @Input() range: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() showMinMax: boolean = true;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();

  public value: number;

  public values: number | number[];

  public handleValue: number;

  public handleValues: number[] | number = [];

  public onModelChange: Function = () => {};

  public onModelTouched: Function = () => {};

  public dragging: boolean;

  public dragListener: any;

  public mouseupListener: any;

  public initX: number;

  public initY: number;

  public barWidth: number;

  public barHeight: number;

  public sliderHandleClick: boolean;

  public handleIndex: number;

  public startHandleValue: any;

  public startx: number;

  public starty: number;

  public scaleRange: number[] = [0, 100];

  public scalingFn: Function =
    ({ domain, range }) =>
      (v) => range[0] + (range[1] - range[0]) * ((v - domain[0]) / (domain[1] - domain[0]));

  public scale: Function = x => x;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    this.setInputValues(this.min, this.max);
  }

  ngOnChanges(changes) {
    if (changes.min && changes.max) {
      if (
        (changes.min.currentValue !== changes.min.previousValue) ||
        (changes.max.currentValue !== changes.max.previousValue)
      ) {
        this.setInputValues(changes.min.currentValue, changes.max.currentValue);
      }
      return;
    }
    if (changes.min && (changes.min.currentValue !== changes.min.previousValue)) {
      this.setInputValues(changes.min.currentValue, this.max);
    }
    if (changes.max && (changes.max.currentValue !== changes.max.previousValue)) {
      this.setInputValues(this.min, changes.max.currentValue);
    }
  }

  ngAfterViewInit() {
      if(this.disabled) {
          return;
      }

      this.dragListener = this.renderer.listen('document', 'mousemove', (event) => {
          if(this.dragging) {
              this.handleChange(event);
          }
      });

      this.mouseupListener = this.renderer.listen('document', 'mouseup', (event) => {
          if(this.dragging) {
              this.dragging = false;
              if(this.range) {
                  this.onSlideEnd.emit({originalEvent: event, values: this.values});
              } else {
                  this.onSlideEnd.emit({originalEvent: event, value: this.value});
              }
          }
      });
  }

  ngOnDestroy() {
      if(this.dragListener) {
          this.dragListener();
      }

      if(this.mouseupListener) {
          this.mouseupListener();
      }
  }

  onMouseDown(event:Event,index?:number) {
      if(this.disabled) {
          return;
      }

      this.dragging = true;
      this.updateDomData();
      this.sliderHandleClick = true;
      this.handleIndex = index;
  }

  onTouchStart(event: any, index?:number) {
      var touchobj = event.changedTouches[0];
      this.startHandleValue = (this.range) ? this.handleValues[index] : this.handleValue;
      this.dragging = true;
      this.handleIndex = index;

      if (this.orientation === 'horizontal') {
          this.startx = parseInt(touchobj.clientX, 10);
          this.barWidth = this.el.nativeElement.children[0].offsetWidth;
      }
      else {
          this.starty = parseInt(touchobj.clientY, 10);
          this.barHeight = this.el.nativeElement.children[0].offsetHeight;
      }

      event.preventDefault();
  }

  onTouchMove(event, index?:number) {
      var touchobj = event.changedTouches[0],
      handleValue = 0;

      if (this.orientation === 'horizontal') {
          handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / (this.barWidth)) + this.startHandleValue;
      }
      else {
          handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / (this.barHeight))  + this.startHandleValue;
      }

      this.setValueFromHandle(event, handleValue);

      event.preventDefault();
  }

  onBarClick(event) {
      if(this.disabled) {
          return;
      }

      if(!this.sliderHandleClick) {
          this.updateDomData();
          this.handleChange(event);
      }

      this.sliderHandleClick = false;
  }

  handleChange(event: Event) {
      let handleValue = this.calculateHandleValue(event);
      this.setValueFromHandle(event, handleValue);
  }

  setValueFromHandle(event: Event, handleValue: any) {
      let newValue = this.getValueFromHandle(handleValue);

      if(this.range) {
          if(this.step) {
              this.handleStepChange(newValue, this.values[this.handleIndex]);
          }
          else {
              this.handleValues[this.handleIndex] = handleValue;
              this.updateValue(newValue, event);
          }
      }
      else {
          if(this.step) {
              this.handleStepChange(newValue, this.value);
          }
          else {
              this.handleValue = handleValue;
              this.updateValue(newValue, event);
          }
      }
  }

  handleStepChange(newValue: number, oldValue: number) {
      let diff = (newValue - oldValue);

      if(diff < 0 && (-1 * diff) >= this.step / 2) {
          newValue = oldValue - this.step;
          this.updateValue(newValue);
          this.updateHandleValue();
      }
      else if(diff > 0 && diff >= this.step / 2) {
          newValue = oldValue + this.step;
          this.updateValue(newValue);
          this.updateHandleValue();
      }
  }

  writeValue(value: any) : void {
      if(this.range)
          this.values = value || [0,0];
      else
          this.value = value || 0;

      this.updateHandleValue();
  }

  registerOnChange(fn: Function): void {
      this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
      this.disabled = val;
  }

  updateDomData(): void {
      let rect = this.el.nativeElement.children[0].getBoundingClientRect();
      this.initX = rect.left + this.getWindowScrollLeft();
      this.initY = rect.top + this.getWindowScrollTop();
      this.barWidth = this.el.nativeElement.children[0].offsetWidth;
      this.barHeight = this.el.nativeElement.children[0].offsetHeight;
  }

  calculateHandleValue(event): number {
      if(this.orientation === 'horizontal')
          return Math.floor(((event.pageX - this.initX) * 100) / (this.barWidth));
      else
          return Math.floor((((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight));
  }

  updateHandleValue(): void {
      if(this.range) {
          this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
          this.handleValues[1] = (this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100 / (this.max - this.min);
      }
      else {
          if(this.value < this.min)
              this.handleValue = 0;
          else if(this.value > this.max)
              this.handleValue = 100;
          else
              this.handleValue = (this.value - this.min) * 100 / (this.max - this.min);
      }
  }

  updateValue(val: number, event?: Event): void {
      if(this.range) {
          let value = Math.floor(val);

          if (this.handleIndex == 0) {
              if(value < this.min) {
                  value = this.min;
                  this.handleValues[0] = 0;
              }
              else if (value > this.values[1]) {
                  value = this.values[1];
                  this.handleValues[0] = this.handleValues[1];
              }
          }
          else {
              if (value > this.max) {
                  value = this.max;
                  this.handleValues[1] = 100;
              }
              else if (value < this.values[0]) {
                  value = this.values[0];
                  this.handleValues[1] = this.handleValues[0];
              }
          }

          this.values[this.handleIndex] = Math.floor(value);
          this.onModelChange(this.values);
          this.onChange.emit({event: event, values: this.values});
      }
      else {
          if(val < this.min) {
              val = this.min;
              this.handleValue = 0;
          }
          else if (val > this.max) {
              val = this.max;
              this.handleValue = 100;
          }

          this.value = Math.floor(val);
          this.onModelChange(this.value);
          this.onChange.emit({event: event, value: this.value});
      }
  }

  getValueFromHandle(handleValue: number): number {
      return (this.max - this.min) * (handleValue / 100) + this.min;
  }

  private setInputValues(min = 0, max = 100) {
    this.scale = this.scalingFn({ domain: [min, max], range: this.scaleRange })
    this.values = this.range ? [min, max] : min;
    this.handleValues = this.range ? [this.scale(min), this.scale(max)] : [];
  }

  private getWindowScrollTop(): number {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

  private getWindowScrollLeft(): number {
      let doc = document.documentElement;
      return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

}
