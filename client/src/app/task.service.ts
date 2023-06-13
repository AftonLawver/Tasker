import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:5200';
  private tasks$: Subject<Task[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  // Used to fetch the full list of tasks
  private refreshTasks() {
    this.httpClient.get<Task[]>(`${this.url}/tasks`)
        .subscribe(tasks => {
          this.tasks$.next(tasks);
        });
  }

  getTasks(): Subject<Task[]> {
    this.refreshTasks();
    return this.tasks$;
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/tasks/${id}`);
  }

  createTask(task: Task): Observable<string> {
    return this.httpClient.post(`${this.url}/tasks`, task, { responseType: 'text' });
  }

  updateTask(id: string, task: Task): Observable<string> {
    return this.httpClient.put(`${this.url}/tasks/${id}`, task, { responseType: 'text' });
  }

  deleteTask(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/tasks/${id}`, { responseType: 'text' });
  }
}