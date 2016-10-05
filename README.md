# datepicker-for-ng2

Date picker made with AngularJS 2.

## Use
### Example with ngModel
```html
<ba-input-datepicker
          [(value)] = "date" /*ngModel */
          labelText="label before input"
          format="date format in input (moment)"
          topClass="class of the top of calendar (month + arrows)"
          dayBarClass="class of the block with the day names"
          gridClass="class of the calendar grid"
          placeholder="placeholder of the input"
          ngDefaultControl>
</ba-input-datepicker>
```

### Example with formControl
```html
<form [formGroup]="form">
    <ba-input-datepicker
      [formControl]="dateCtrl"
      labeltext="Test"
      ngDefaultControl>
    </ba-input-datepicker>
</form>
```

```javascript
@Component({
    (...)
})
export class ImplementationExample {
    private form: FormGroup;
    private dateCtrl: FormControl;
    
    constructor(private _formBuilder: FormBuilder) {}
    
    ngOnInit(): void {
        this.dateCtrl = this._formBuilder.control(moment(), Validators.required);
        this.form = this._formBuilder.group({
          date: this.dateCtrl
        });
    }
}
```