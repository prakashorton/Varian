/**
 * Angular Dependecies
 */
import { Component } from '@angular/core';
import { MainService } from './main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

let $: any;

/**
 * Feature Models
 */

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor() { }

  ngOnInit() {
  }

}
