const express = require("express");
const {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./utils/todos");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const todos = await getAllTodos();

    res.send({
      TODOLIST: todos,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const todo = await addTodo(req.body);

    res.send({
      NEW_TODO: todo,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await updateTodo(req.params.id, req.body);

    res.send({
      UPDATED_TODO: updatedTodo,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Todo doesn't exist") {
      res.status(404).send({
        message: err.message,
      });
    }

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await deleteTodo(req.params.id);

    res.send({
      DELETED_TODO: deletedTodo,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Todo doesn't exist") {
      res.status(404).send({
        message: err.message,
      });
    }

    res.status(500).send({
      message: "Unexpected Error",
    });
  }
});

const port = process.argv[2] || 4000;

app.listen(port, () => {
  console.log(`Server listening to http requests on http://localhost:${port}`);
});
