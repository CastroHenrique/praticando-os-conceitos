import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { TasksAmounts } from "./components/TasksAmounts"
import { v4 as uuid } from "uuid"

const LOCAL_STORAGE_KEY = "todo:savedTasks"

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {

  const [tasks, setTasks] = useState<ITask[]>([])

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }
  useEffect(() => {
    loadSavedTasks()
  }, [])

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTasks(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: uuid(),
        title: taskTitle,
        isCompleted: false

      }
    ])
  }
  function deleteTask(taskId: string) {
    const deleteTeskId = tasks.filter((task) => task.id !== taskId)
    setTasksAndSave(deleteTeskId)
  }
  function completeTask(taskId: string) {
    const completeTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    })
    setTasksAndSave(completeTask)
  }


  return (
    <>
      <Header onAddTask={addTasks} />
      <TasksAmounts
        tasks={tasks}
        onDelete={deleteTask}
        onComplete={completeTask} />
    </>
  )
}

export default App
