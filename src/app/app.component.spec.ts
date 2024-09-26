import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormBuilderService } from './app.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicFormComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let formBuilderService: FormBuilderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     // declarations: [ AppComponent ],
      imports: [ReactiveFormsModule,AppComponent],
      providers: [FormBuilderService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    formBuilderService = TestBed.inject(FormBuilderService);
    fixture.detectChanges();
  });

  it('should create the form with the correct fields', () => {
    expect(component.formGroup.contains('Order No')).toBeTruthy();
    expect(component.formGroup.contains('OrderedDate')).toBeTruthy();
    expect(component.formGroup.contains('Price')).toBeTruthy();
  });

  it('should mark required fields as invalid if empty', () => {
    const orderNoControl = component.formGroup.get('Order No');
    orderNoControl?.setValue('');
    expect(orderNoControl?.valid).toBeFalsy();
  });

  it('should evaluate visibility based on condition', () => {
    const condition = component.isFieldVisible({ condition: "or", rules: [{ field: "Price", operator: "<=", value: "100" }]});
    expect(condition).toBeTrue();
  });
});
