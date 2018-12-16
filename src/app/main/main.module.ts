/**
 * Angular Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**
 * Feature module - External module
 */
import { NewsModule } from '../news/news.module';

/**
 * Components
 */
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**
 * Services
 */
import { MainService } from './main.service';
import { MainRoutingModule } from './main.routing.module';

 /**
  * Main Module
  */
@NgModule({
  declarations: [ 
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    NewsModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  exports : [
    MainComponent
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
