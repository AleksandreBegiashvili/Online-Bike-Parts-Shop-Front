import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { UserGet } from '../models/account/user-get.model';
import { ItemGet } from '../models/items/item-get.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  p: number = 1;
  pageSize: number = 5;
  totalCount: number;

  items: ItemGet[];
  userDetails: UserGet;
  
  constructor(private dashService: DashboardService) { }

  ngOnInit() {
    this.dashService.getCurrentUserDetails().subscribe(
      result => this.userDetails = result
    );

    this.dashService.getItemsBySeller(this.p, this.pageSize).subscribe(
      result => this.items = result
    )
  }

  onPageChanged() {
    this.dashService.getItemsBySeller(this.p, this.pageSize).subscribe(
      result => {
        this.items = result.items;
        this.totalCount = result.totalCount;
      }
    )
  }

}
