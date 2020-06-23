import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemGet } from 'src/app/models/items/item-get.model';
import { ItemService } from 'src/app/services/item.service';
import { isNullOrUndefined } from 'util';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-item-list-by-category',
  templateUrl: './item-list-by-category.component.html',
  styleUrls: ['./item-list-by-category.component.css']
})
export class ItemListByCategoryComponent implements OnInit {

  categoryId: number;
  items: ItemGet[];
  searchStr: string;

  pageSize: number = 5;
  pageNumber: number = 1;
  totalCount: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.categoryIdSubscriber$.subscribe(
      data => {
        console.log(data);
        this.categoryId = Number(data);
      }
    )
  }
  
  onSearchClick() {
    if (!isNullOrUndefined(this.searchStr) && this.searchStr !== "") {
      debugger;
      
      this.itemService.searchItemsByCategoryId(this.categoryId, this.searchStr, this.pageNumber, this.pageSize).subscribe(
        result => {
          this.items = result.items;
          this.totalCount = result.totalCount;
        }
      )
    }
  }

  onPageChanged() {
    this.itemService.searchItemsByCategoryId(this.categoryId, this.searchStr, this.pageNumber, this.pageSize).subscribe(
      result => {
        this.items = result.items;
        this.totalCount = result.totalCount;
      }
    )
  }

}
