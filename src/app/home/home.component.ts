import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { ItemGet } from '../models/items/item-get.model';
import { Router } from '@angular/router';
import { Category } from '../models/items/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchString: string;
  items: ItemGet[];
  categories: Category[];

  constructor(private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      result => this.categories = result
    )
  }

  onSearchClick() {
    this.router.navigate(['/item/list'], {queryParams: {search: this.searchString}});
  }
}
