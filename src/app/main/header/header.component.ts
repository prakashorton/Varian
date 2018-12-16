import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchText: string = "";

  constructor(private mainService: MainService,
    private router: Router) { }

  ngOnInit() {
  }

  SearchItem() {
    this.mainService.searchTitleSubject.next(this.searchText);
  }

  CloseSearch(){
    this.searchText = '';
    this.mainService.searchTitleSubject.next(this.searchText);
  }
}
