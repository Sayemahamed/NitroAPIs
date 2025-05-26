import { db } from ".";
import { tasks } from "./models/tasks";

db.insert(tasks)
  .values([
    {
      title: "Task 1",
      description: "Description for task 1",
    },
    {
      title: "Task 2",
      description: "Description for task 2",
    },
    {
      title: "Task 3",
      description: "Description for task 3",
    },
  ])
  .execute();
