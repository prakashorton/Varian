/**
 * Angular Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';


/**
 * Feature Module - Main Module / Layout Module
 */
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
