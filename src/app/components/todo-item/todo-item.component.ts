import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todos.type';
import { HighlightCompleteTodoDirective } from '../../directives/highlight-complete-todo.directive';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompleteTodoDirective, UpperCasePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();

  toggleTodo() {
    this.todoToggled.emit(this.todo());
  }
}
