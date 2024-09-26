import { Component ,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormBuilderService } from  './app.service'
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from './form.defination.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FormService]
})

export class AppComponent implements OnInit {
  formDefinition: any[] = [];  // Replace with actual definition
  formGroup! : FormGroup;
  formData : any; 
  
  constructor(private formBuilderService: FormBuilderService , private formService: FormService ) {}

  ngOnInit() {

    /*this.formService.getFormDefinition().subscribe((data) => {
      this.formDefinition = data;
    });*/
    this.formDefinition = this.loadFormDefinition();
    this.formData = this.loadFormData();
    this.formGroup = this.formBuilderService.createFormGroup(this.formDefinition , this.formData);
    this.formGroup.patchValue(this.formData);
 
  }
  loadFormDefinition() {
    return [
      { "fieldtype": "text", "name": "Order No", "group": "General Information", "validator": ["required"] },
      { "fieldtype": "date", "name": "OrderedDate", "group": "General Information", "validator": ["required"] },
      { "fieldtype": "integer", "name": "Price", "group": "Product Information", "validator": ["required"] },
      { "fieldtype": "boolean", "name": "Refurbished", "group": "Product Information", "selectList": ["Yes", "No"] },
      { "fieldtype": "text", "name": "Address", "group": "Product Information", "condition": "or", "rules": [
        { "field": "Order No", "operator": ">=", "value": "100" },
        { "field": "Price", "operator": "<=", "value": "100" }
      ]}
    ];
  }

  
  loadFormData() {
    return {
        "Order No": "Snitch 123",
        "OrderedDate": "2024-06-23",
        "Price": "200",
        "Refurbished": "No",
        "Address": "Indranagar Bangalore"
    }

  }
  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      this.checkFormErrors();
    }
  }

  

  isFieldVisible(field: any): boolean {
    if (field.condition) {
      return this.formBuilderService.evaluateCondition(field.rules, this.formGroup.value);
    }
    return true;
  }

  checkFormErrors() {
    const errorMessages: string[] = [];

    // Loop through each control in the form group
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      
      if (control && control.invalid) {
        alert(`${field} has an error.`);
      }
    });
  }
}