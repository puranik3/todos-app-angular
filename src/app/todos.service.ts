import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ITodo from '../models/ITodo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<ITodo[]>(`http://localhost:3000/api/todos`);
  }

  addTodo(todo: Pick<ITodo, 'name'>) {
    return this.http.post<ITodo>(`http://localhost:3000/api/todos`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateTodo(_id: string, todo: Pick<ITodo, 'completed'>) {
    return this.http.patch<ITodo>(
      `http://localhost:3000/api/todos/${_id}`,
      todo,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  deleteTodo(_id: string) {
    return this.http.delete<''>(`http://localhost:3000/api/todos/${_id}`);
  }
}
