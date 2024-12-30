import express from "express";
import cors from 'cors';
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// middleware
app.use(cors())
app.use(express.json());

const todo = [];

// here we are posting data into backend
app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title)
    return res.status(404).json({
      message: "title is empty",
    });

  const obj = {
    title,
    id: Date.now(),
  };
  todo.push(obj);

  res.status(201).json({
    message: "todo added succesfully",
    todo,
  });
});

// here we are geting data from backend
app.get("/todos", (req, res) => {
  res.status(201).json({
    message: "All todos",
    todo,
  });
});

// delete from backend
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const index = todo.map((item) => item.id).indexOf(+id);

  if (index === -1)
    return res.status(404).json({
      message: "not found in todo",
    });

  todo.splice(index, 1);

  res.status(201).json({
    message: "todo deleted",
  });
});

// edit in todo backend
app.put("/todos/:id", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  if (!title)
    return res.status(404).json({
      message: "updated title is required",
    });

  const index = todo.map((item) => item.id).indexOf(+id);

  if (index === -1)
    return res.status(404).json({
      message: "not found in todo",
    });

  todo[index].title = title;

  res.status(201).json({
    message: "todo updated successfully",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
