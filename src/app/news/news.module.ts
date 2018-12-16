/**
 * Angular Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Components
 */
import { NewsComponent } from './news.component';

 /**
  * News Infomration Module
  */
@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    NewsComponent
  ],
  providers: []
})
export class NewsModule { }