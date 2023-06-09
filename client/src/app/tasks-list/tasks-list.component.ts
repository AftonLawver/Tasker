import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  template: `
   <h2 class="text-center m-5">Task List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Name</th>
               <th>Description</th>
               <th>Level</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let task of tasks$ | async">
               <td>{{task.name}}</td>
               <td>{{task.description}}</td>
               <td>{{task.level}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', task._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteTask(task._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Task</button>
 `
})
export class TasksListComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable();

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.fetchTasks()
    });
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }
}