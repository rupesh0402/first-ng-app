import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todos.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodoPipe } from '../pipes/filter-todo.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodoPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal<string>('');

  ngOnInit() {
    this.todoService.getTodosFromApi().pipe(
      catchError((err)=> {
        console.log(err);
        throw err;
      })
    ).subscribe((todos) => {
      this.todoItems.set(todos);
    }
  );
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteItem(todo: Todo) {
    this.todoItems.set(this.todoItems().filter((t) => t.id !== todo.id));
  }

  updateTodoToggled(todo: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          return {...todo,
            completed: !todo.completed
          };
        }
        return t;
      });
    });
  }

}