const fs = require("fs/promises");

const dbPath = "./db/todolist.json";

const updateAllTodos = async (todos) => {
  const data = JSON.stringify(todos, null, 4);

  await fs.writeFile(dbPath, data, { encoding: "utf-8" });
};

const getFreshId = (todos) => {
  let id = -1;
  todos.forEach((e, i) => {
    if (e.id > id) {
      id = e.id;
    }
  });

  return id;
};

const exist = (id, todos) => {
  let idx = -1;
  let i = 0;

  todos.forEach((todo) => {
    if (todo.id == id) {
      idx = i;
      return false;
    }
    i++;
  });

  return idx;
};

const getAllTodos = async () => {
  const data = await fs.readFile(dbPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const addTodo = async (todo) => {
  const todos = await getAllTodos();

  const freshId = getFreshId(todos);

  const newTodo = {
    ...todo,
    id: freshId + 1,
  };

  todos.push(newTodo);

  await updateAllTodos(todos);

  return newTodo;
};

const updateTodo = async (id, todo) => {
  const todos = await getAllTodos();

  const idx = exist(id, todos);

  if (idx !== 1) {
    let updatedTodo = todos[idx];

    updatedTodo = {
      ...updatedTodo,
      ...todo,
      id: updatedTodo.id,
    };

    todos[idx] = updatedTodo;

    await updateAllTodos(todos);

    return updatedTodo;
  } else {
    throw new Error("Todo doesn't exist");
  }
};

const deleteTodo = async (id) => {
  const todos = await getAllTodos();

  const idx = exist(id, todos);

  if (idx !== -1) {
    const deletedTodo = todos.splice(idx, 1);

    await updateAllTodos(todos);

    return deletedTodo[0];
  } else {
    throw new Error("Todo doesn't exist");
  }
};

module.exports = {
  getAllTodos,
  updateAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
