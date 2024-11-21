import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodosService } from '../todos.service';
import ITodo from '../../models/ITodo';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  public todos!: ITodo[];
  public filteredTodos!: ITodo[];
  public error: Error | null = null;
  public loading = true;
  public filterKey = 'all';

  public newTodoName: string = '';

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.loading = true;

    this.todosService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.setFilteredTodos();
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

    this.todosService.updateTodo(todo._id, { completed: completed }).subscribe({
      next: (updatedTodo) => {
        this.todos = this.todos.map((t) =>
          t._id === todo._id ? updatedTodo : t
        );
        this.setFilteredTodos();
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  addTodo() {
    this.todosService.addTodo({ name: this.newTodoName }).subscribe({
      next: (addedTodo) => {
        this.todos.push(addedTodo);
        this.setFilteredTodos();
      },
      error: (error) => {
        alert(`Could not add todo - "${this.newTodoName}"`);
      },
    });
  }

  deleteTodo(_id: string) {
    this.todosService.deleteTodo(_id).subscribe({
      next: () => {
        this.todos = this.todos.filter((t) => t._id !== _id);
        this.setFilteredTodos();
      },
      error: (error) => {
        alert(`Could not delete todo`);
      },
    });
  }

  setFilterKey(filterKey: 'all' | 'completed' | 'not completed') {
    this.filterKey = filterKey;
    this.setFilteredTodos();
  }

  setFilteredTodos() {
    this.filteredTodos = this.todos.filter((t) => {
      if (this.filterKey === 'completed') {
        return t.completed;
      }

      if (this.filterKey === 'not completed') {
        return !t.completed;
      }

      return true;
    });
  }

  getNotCompletedCount() {
    return this.todos.filter((t) => !t.completed).length;
  }
}
