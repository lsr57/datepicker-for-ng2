import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaInputDatePickerComponent} from "./baInputDatePicker.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BaInputDatePickerComponent
  ],
  providers: [],
  exports: [
    BaInputDatePickerComponent
  ]
})
export class BaDatePickerModule {}
