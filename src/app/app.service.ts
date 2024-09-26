import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  // Method to create form group dynamically
  createFormGroup(definition: any[] , defaultData: any): FormGroup {
    const group: any = {};
    definition.forEach(field => {
      const defaultValue = defaultData[field.name] || '';
      let validators = [];
      if (field.validator && field.validator.includes('required')) {
        validators.push(Validators.required);
      }

      group[field.name] = [null, validators];
    });

    return this.fb.group(group);
  }

  // Method to evaluate condition based on form data
  evaluateCondition(rules: any[], formData: any): boolean {
    for (let rule of rules) {
      const field = formData[rule.field];
      if (rule.operator === '>' && field <= rule.value) return false;
      if (rule.operator === '<=' && field > rule.value) return false;
      // Add other operators here
    }
    return true;
  }
}
