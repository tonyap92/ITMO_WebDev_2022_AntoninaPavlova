import { ref, computed } from "vue";

import type { ITodoVO } from "@/model/vos/TodoVO";
import { defineStore } from "pinia";

const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_TEXT = "text";

interface State {
  todos: ITodoVO[];
  selected?: ITodoVO | null;
  isLoading: boolean;
}

export const useTodosStore = defineStore("todos", {
  state: (): State => ({
    todos: JSON.parse(localStorage.getItem(LOCAL_KEY_TODOS) as string) || [],
    selected: null,
    isLoading: false,
  }),
  getters: {
    isTodoNotSelected(): boolean {
      return !this.isSelectedActive;
    },
    isSelectedActive(state): boolean {
      return !!state.selected;
    },
  },
  actions: {
    checkTodoSelected(todo: ITodoVO): boolean {
      const result = this.selected === todo;
      console.log("> store -> todos: checkTodoSelected =", { result });
      return result;
    },

    selectTodo(todo: ITodoVO) {
      console.log("> store -> todos: selectTodo =", { todo });
      this.selected = todo;
    },

    deselectTodo(todo: ITodoVO) {
      console.log("> store -> todos: deselectTodo =", { todo });
      this.selected = null;
    },
  },
});
