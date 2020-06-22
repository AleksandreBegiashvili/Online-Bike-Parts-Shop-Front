import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemGet } from 'src/app/models/items/item-get.model';
import { isNullOrUndefined } from 'util';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  p: number = 1;
  pageSize: number = 5;
  totalCount: number;

  items: ItemGet[];
  // item$: Observable<any>;
  searchStr: string;  //= this.route.snapshot.queryParamMap.get('search')

  constructor(private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.itemService.searchItems(params['search'], this.p, this.pageSize).subscribe(
          result => {
            this.items = result.items;
            this.totalCount = result.totalCount;
          }
        );
        this.searchStr = params['search'];
      }
    )
  }

  onSearchClick() {
    if (!isNullOrUndefined(this.searchStr) && this.searchStr !== "") {
      this.router.navigate(['/item'], { queryParams: { search: this.searchStr } });
    }
  }

  onPageChanged() {
    this.itemService.searchItems(this.searchStr, this.p, this.pageSize).subscribe(
      result => {
        this.items = result.items;
        this.totalCount = result.totalCount;
      }
    )
  }



}
