import './polyfills';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './app/table/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {TableComponent} from './app/table/table.component';
import { InlineEditComponent } from './app/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { StepperComponent } from './app/stepper/stepper.component';
import { CardFancyExample } from './app/card-fancy/card-fancy-example';
import {  MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SatPopoverModule,
    MatToolbarModule
  ],
  entryComponents: [
    StepperComponent,
  ],
  declarations: [
    InlineEditComponent,
    StepperComponent,
    TableComponent,
    CardFancyExample,
  ],
  bootstrap: [
    StepperComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

