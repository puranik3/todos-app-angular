import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import ITodo from '../../models/ITodo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  public todos!: ITodo[];
  public error: Error | null = null;
  public loading = true;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.loading = true;

    this.todosService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  toggle(event: Event, todo: ITodo) {
    const target = event.target as HTMLInputElement;

    console.log(event);
    console.log(todo);

    const completed = target.checked;

    this.todosService.updateTodo(todo._id, { completed }).subscribe({
      next: (updatedTodo) => {
        this.todos.map((t) => (t._id === todo._id ? updatedTodo : t));
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }
}
