import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemUpdate } from 'src/app/models/items/item-update.model';
import { Category } from 'src/app/models/items/category.model';
import { Condition } from 'src/app/models/items/condition.model';
import { ConditionService } from 'src/app/services/condition.service';
import { LocationService } from 'src/app/services/location.service';
import { CategoryService } from 'src/app/services/category.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {

  editItemForm: FormGroup;
  categories: Category[];
  locations: Location[];
  conditions: Condition[];
  item: ItemUpdate;
  itemId: number;

  constructor(private itemService: ItemService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private conditionService: ConditionService,
    private locationService: LocationService,
    private categoryService: CategoryService) { }

  ngOnInit() {

    this.itemId = Number (this.route.snapshot.paramMap.get('id'));

    this.itemService.getById(this.itemId).subscribe(
      result => {
        this.item = result;
        this.editItemForm = this.fb.group({
          name: new FormControl(result.name, [Validators.required]),
          price: new FormControl(result.price, [Validators.required]),
          description: new FormControl(result.description, [Validators.required]),
          categoryId: new FormControl(result.categoryId, [Validators.required]),
          conditionId: new FormControl(result.conditionId, [Validators.required]),
          locationId: new FormControl(result.locationId, [Validators.required])
        });
      }
    )

    this.conditionService.getConditions().subscribe(
      result => this.conditions = result
    );

    this.locationService.getLocations().subscribe(
      result => this.locations = result
    );

    this.categoryService.getCategories().subscribe(
      result => this.categories = result
    );
  }

  onSubmit() {
    this.item = Object.assign(this.item, this.editItemForm.value);

    if(!isNullOrUndefined(this.item)) {
      this.itemService.updateItem(this.item).subscribe(
        success => this.router.navigate(['/dashboard']),
        error => console.log(error)
      )
    }
  }

}
