import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  createItemForm: FormGroup;

  constructor(private itemService: ItemService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.createItemForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      conditionId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required])
    });
    
  }

}
