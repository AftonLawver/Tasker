import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task.component.ts',
  template: `
   <h2 class="text-center m-5">Edit a Task</h2>
   <app-task-form [initialState]="task" (formSubmitted)="editTask($event)"></app-task-form>
 `
})

export class EditTaskComponent implements OnInit {
    task: BehaviorSubject<Task> = new BehaviorSubject({});

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            alert('No id provided');
        }

        this.taskService.getTask(id !).subscribe((task) => {
            this.task.next(task);
        });
    }

    editTask(task: Task) {
        this.taskService.updateTask(this.task.value._id || '', task)
            .subscribe({
                next: () => {
                    this.router.navigate(['/tasks']);
                },
                error: (error) => {
                    alert('Failed to update task');
                    console.error(error);
                }
            })
    }
}
