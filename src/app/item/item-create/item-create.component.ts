import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/items/category.model';
import { Condition } from 'src/app/models/items/condition.model';
import { ItemCreate } from 'src/app/models/items/item-create.model';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { ConditionService } from 'src/app/services/condition.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  categories: Category[];
  locations: Location[];
  conditions: Condition[];
  item: ItemCreate = new ItemCreate();

  username$: Observable<string>;
  
  createItemForm: FormGroup;

  constructor(private itemService: ItemService,
    private categoryService: CategoryService,
    private conditionService: ConditionService,
    private LocationService: LocationService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.username$ = this.authService.currentUserName;

    this.createItemForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      conditionId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required])
    });

    this.conditionService.getConditions().subscribe(
      result => this.conditions = result
    );

    this.LocationService.getLocations().subscribe(
      result => this.locations = result
    );

    this.categoryService.getCategories().subscribe(
      result => this.categories = result
    );
    
  }

  onSubmit() {
    this.item = Object.assign(this.item, this.createItemForm.value);
    debugger;
    if(!isNullOrUndefined(this.item)) {
      this.itemService.createItem(this.item).subscribe(
        success => this.router.navigate(['/dashboard']),
        error => console.log(error)
      )
    }
  }

}
