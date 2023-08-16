import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserDataGeneratorComponent } from './user-data-generator/user-data-generator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    UserDataGeneratorComponent
  ],
  imports: [BrowserModule, FormsModule,HttpClientModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
