import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  template: `
   <form class="task-form" autocomplete="off" [formGroup]="taskForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="description" placeholder="Description" required>
       <label for="description">Description</label>
     </div>
 
     <div *ngIf="description.invalid && (description.dirty || description.touched)" class="alert alert-danger">
 
       <div *ngIf="description.errors?.['required']">
         Description is required.
       </div>
       <div *ngIf="description.errors?.['minlength']">
         Description must be at least 5 characters long.
       </div>
     </div>
 
     <div class="mb-3">
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="easy" required>
         <label class="form-check-label" for="level-junior">Easy</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="moderate">
         <label class="form-check-label" for="level-mid">Moderate</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
           value="difficult">
         <label class="form-check-label" for="level-senior">Difficult</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="taskForm.invalid">Add</button>
   </form>
 `,
  styles: [
    `.task-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
  ]
})
export class TaskFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Task> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  taskForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.taskForm.get('name')!; }
  get description() { return this.taskForm.get('description')!; }
  get level() { return this.taskForm.get('level')!; }

  ngOnInit() {
    this.initialState.subscribe(task => {
      this.taskForm = this.fb.group({
        name: [ task.name, [Validators.required] ],
        description: [ task.description, [ Validators.required, Validators.minLength(5) ] ],
        level: [ task.level, [Validators.required] ]
      });
    });

    this.taskForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value);
  }
}