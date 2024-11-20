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
}
