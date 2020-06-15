import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { ItemGet } from '../models/items/item-get.model';
import { Router } from '@angular/router';
import { Category } from '../models/items/category.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // searchString: string;
  items: ItemGet[];
  categories: Category[];

  searchForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private itemService: ItemService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      searchString: new FormControl('')
    });

    this.categoryService.getCategories().subscribe(
      result => this.categories = result
    )
  }

  onSubmit() {
    this.router.navigate(['/item/list'], { queryParams: { search: this.searchForm.get('searchString').value } });
  }
}
