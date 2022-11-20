const CONST_WELCOME = "Welcome";
const DATA_TODO_LIST_RESOURCE = "todos";

class TodoServerService {
  constructor(url) {
    console.log("> ServerService -> constructor", url);
    this.url = url;
  }

  async requestTodos() {
    console.log(`> ServerService -> requestTodos`);
    const listOfTodos = await fetch(`${this.url}/${DATA_TODO_LIST_RESOURCE}`, {
      method: "GET",
    })
      .then((response) => {
        console.log(`> ServerService -> requestTodos: response.data =`, response);
        return response.ok ? response.json() : new Error("");
      })
      .catch((e) => {
        console.log(`> ServerService -> requestTodos: error = ${e}`);
        return [];
      });
    console.log(`> ServerService -> requestTodos listOfTodos=`, listOfTodos);
    return listOfTodos;
  }
}

export default TodoServerService;
