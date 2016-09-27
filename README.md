# datepicker-for-ng2

Date picker made with AngularJS 2.

## Use
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