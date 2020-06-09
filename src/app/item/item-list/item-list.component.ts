import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemGet } from 'src/app/models/items/item-get.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: ItemGet[];
  searchStr: string = this.route.snapshot.queryParamMap.get('search');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService) { }


  ngOnInit() {
    this.itemService.searchItems(this.searchStr).subscribe(
      result => this.items = result
    )
  }

  onSearchClick() {
    this.router.navigate(['/item/list'], { queryParams: { search: this.searchStr } });
    this.itemService.searchItems(this.searchStr).subscribe(
      result => this.items = result
    )
  }



}
