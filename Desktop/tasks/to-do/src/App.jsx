import { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";

function App() {
  let [task, setTask] = useState([]);
  return (
    <>
      <AddTask task={task} setTask={setTask} />
    </>
  );
}

export default App;
