import {Component, Input, Output, EventEmitter, ElementRef, forwardRef} from "@angular/core";
import moment = require("moment");
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

interface CalendarDate {
  day: number;
  month: number;
  year: number;
  enabled: boolean;
  today: boolean;
  selected: boolean;
}

@Component({
  selector: 'ba-input-datepicker',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  template: require('./baInputDatePicker.html'),
  styles: [require('./baDatePicker.scss')],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaInputDatePickerComponent), multi: true }
  ],
})
export class BaInputDatePickerComponent implements ControlValueAccessor {
/*  @Input() ngModel: any;
  @Output ngModelChange: any = new EventEmitter();*/
  //@Input() value: string;
  @Input() format: string;
  @Input() topClass: string;
  @Input() dayBarClass: string;
  @Input() gridClass: string;
  @Input() placeholder: string;
  @Input() labelText: string;

  private days: CalendarDate[] = [];
  private viewDate: string = null;
  private date:any = moment();
  private opened: boolean = false;
  private isoFormat: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

  constructor(private _elementRef: ElementRef) {}

  /****** ControlValueAccessor implementation *******/
  onChange = (_) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /***************************************************/

  @Input() get value(): any {
    return this.viewDate;
  }
  @Output() valueChange: any = new EventEmitter();
  set value(newValue: any) {
    let date = (newValue instanceof moment)? newValue : moment(newValue, [this.isoFormat, this.format], true);

    this.viewDate = date.isValid()? date.format(this.format) : newValue;

    this.onChange(this.viewDate);
    this.valueChange.emit(date.toISOString());
  }

  ngOnInit(): void {
    // init values
    this.format = this.format || 'YYYY-MM-DD';
    this.placeholder = this.placeholder || '';
    this.value = this.value || moment(moment().toISOString());

    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    let date = moment(this.date);
    let month = date.month();
    let year = date.year();
    let n: number = 1;
    let firstWeekDay: number = date.date(1).day();

    if (firstWeekDay !== 1) {
      n -= (firstWeekDay + 6) % 7;
    }

    let selectedDate = moment(this.value, this.format);
    for (let i = n; i <= date.endOf('month').date(); i += 1) {
      let currentDate = moment(`${i}.${month + 1}.${year}`, 'DD.MM.YYYY');
      let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
      let selected = (selectedDate.isSame(currentDate, 'day')) ? true : false;

      if (i > 0) {
        this.days.push({
          day: i,
          month: month + 1,
          year: year,
          enabled: true,
          today: today,
          selected: selected
        });
      } else {
        this.days.push({
          day: null,
          month: null,
          year: null,
          enabled:false,
          today: false,
          selected: selected
        });
      }
    }
  }

  prevMonth() {
    this.date = this.date.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.generateCalendar();
  }

  selectDate(e: MouseEvent, i: number) {
    e.preventDefault();

    let date: CalendarDate = this.days[i];
    let selectedDate = moment(`${date.day}.${date.month}.${date.year} 06:00:00`, 'DD.MM.YYYY HH:mm:ss');
    this.value = selectedDate;
    this.closeCalendar();
    this.generateCalendar();
  }

  private onInputButtonClick(): void {
    this.opened = !this.opened;
  }

  private closeCalendar(): void {
    this.opened = false;
  }

  private openCalendar(): void {
    this.opened = true;
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this._elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.closeCalendar();
    }
  }
}
