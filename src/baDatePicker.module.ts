import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaInputDatePickerComponent} from "./baInputDatePicker.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
    ReactiveFormsModule
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
