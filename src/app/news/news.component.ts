/**
 * Angular Dependencies
 */
import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { HackerNews } from './news.model';
import { Subscription } from 'rxjs';

/**
 * Models
 */

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  /**
   * Raw News information without manipulating the data
   */
  rawNewsInfo: any[] = [];

  /**
   * For Filter
   * Gets Unique Author Inofrmtion
   */
  filterAuthors: any[] = [];

  /**
   * Currents items checkedss
   */
  currentFilterItemsForAuthor: Array<string> = new Array<string>();

  /**
   * For Filter
   * Gets Unique Date infor for filter
   */
  filterDate: Array<Date> = new Array<Date>();

  SearchTextForTitleSubscription: Subscription;

  /**
   * News info
   * For the UI
   */
  newsInfo: Array<HackerNews> = new Array<HackerNews>();

  constructor(private mainService: MainService) {
    this.RegisterObservables();
  }

  ngOnInit(): void {
    // Loads hacker info
    this.LoadHackerInfo();
  }

  RegisterObservables() {
    this.SearchTextForTitleSubscription = this.mainService.searchTitleSubject.subscribe(searchKey => {
      this.FilterBasedOnTitle(searchKey);
    });
  }

  /**
   * Filter based on title
   * @param searchKey current search key
   */
  FilterBasedOnTitle(searchKey: string) {
    if (searchKey) {
      if (this.newsInfo.length == 0 || this.newsInfo.length != this.rawNewsInfo.length) {
        this.GenerateHackersNewsInfo(this.rawNewsInfo);
      }
      this.newsInfo = this.newsInfo.filter(nInfo => nInfo.Title.toLowerCase().includes(searchKey.toLowerCase()));
    }
    else if(this.currentFilterItemsForAuthor.length > 0)
      this.FilterNewsInfo();
    else
      this.GenerateHackersNewsInfo(this.rawNewsInfo);
  }

  /**
   * LoadHackerInfo
   */
  LoadHackerInfo() {
    this.mainService.GetHackerNews().subscribe((allNew: any[]) => {
      // Remove unwanted 1st obj from tha array
      allNew = allNew.slice(1, allNew.length);
      // allNew = allNew.slice(1, 5);
      
      // Store data in localmemory
      localStorage.setItem('hackersNews' , JSON.stringify(allNew));

      // Store raw data
      this.rawNewsInfo = allNew;

      // Generate Hackers info for UI
      this.GenerateHackersNewsInfo(allNew);

      this.GenerateFilterData();
    });
  }

  /**
   * Generates hackers news information for UI
   * @param newsInfo raw news info array
   */
  GenerateHackersNewsInfo(newsInfo: any[]) {
    // Fills news info to current newsinfo array
    this.newsInfo = newsInfo.map(neww => {
      var currentNews: HackerNews = new HackerNews();
      currentNews.Id = neww.id;
      currentNews.Title = neww.title;
      currentNews.URL = neww.url;
      currentNews.Author = neww.author;
      currentNews.CreatedDate = neww.created_at;
      currentNews.NumberComments = neww.num_comments;
      currentNews.NumberPoints = neww.num_points;
      return currentNews;
    });
  }

  /**
   * Generate Filter Information For UI
   */
  GenerateFilterData() {
    this.filterAuthors = this.GenerateUniqueAuthorInfo();
    this.GenerateUniqueDate = this.GenerateUniqueDate();
  }

  /**
   * Generate Unique Author Info For UI
   */
  GenerateUniqueAuthorInfo() {
    var allFilterItems: any[] = [];
    return this.newsInfo.map(item => item.Author).filter((value, index, self) => self.indexOf(value) === index);
  }

  /**
   * Generate Data filter for UI
   */
  GenerateUniqueDate() {
    // return this.newsInfo.map(item => item.CreatedDate).filter((value, index, self) => self.indexOf(value) === index);
    return null;
  }

  /**
   * On filter added
   * @param hackerNews current hacker news info 
   */
  FilterOnItemAddedAuther(evt: any, selectedItem: string) {
    if (evt.target.checked)
      this.currentFilterItemsForAuthor.push(selectedItem);
    else {
      var index = this.currentFilterItemsForAuthor.indexOf(selectedItem);
      if (index !== -1) this.currentFilterItemsForAuthor.splice(index, 1);
    }
    if (this.currentFilterItemsForAuthor.length > 0)
      this.FilterNewsInfo();
    else
      this.GenerateHackersNewsInfo(this.rawNewsInfo);
  }

  FilterNewsInfo() {
    this.GenerateHackersNewsInfo(this.rawNewsInfo);
    this.newsInfo = this.newsInfo.filter(info => {
      var index = this.currentFilterItemsForAuthor.indexOf(info.Author);
      if (index !== -1)
        return info;
    });
  }

  FilterItemsDateChange(evt: any) {
    if (evt.target.value == "-1") { 
      this.GenerateHackersNewsInfo(this.rawNewsInfo);
      return true;
    }
    this.sortByStartDate(evt.target.value);
  }

  FilterItemsPointsChange(evt: any){
    if (evt.target.value == "-1") { 
      this.GenerateHackersNewsInfo(this.rawNewsInfo);
      return true;
    }
    else if(evt.target.value == 'asc')
      this.newsInfo.sort((a, b) => a.NumberPoints - b.NumberPoints); // For ascending sort
    else if(evt.target.value == 'des')
      this.newsInfo.sort((a, b) => b.NumberPoints - a.NumberPoints); // For descending sort
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public sortByStartDate(sortItem: string): any[] {
    debugger
    if (sortItem == 'asc')
      return this.newsInfo.sort((a: HackerNews, b: HackerNews) => {
        return this.getTime(a.CreatedDate) - this.getTime(b.CreatedDate);
      });
    else
      return this.newsInfo.sort((a: HackerNews, b: HackerNews) => {
        return this.getTime(b.CreatedDate) - this.getTime(a.CreatedDate);
      });
  }
}
