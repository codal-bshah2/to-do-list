import { useEffect, useState } from "react";
import moment from "moment";

const AddTask = ({ task, setTask }) => {
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [currentTask, setCurrentTask] = useState("");
  const [status, setStatus] = useState("pending");
  const [filterStatus, setFilterStatus] = useState("all");

  const generateId = function (length) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  useEffect(() => {
    const updateTaskStatus = (taskId) => {
      const updatedTaskList = task.map((t) =>
        t.id === taskId ? { ...t, status: "overdue" } : t
      );
      setTask(updatedTaskList);
    };

    task.forEach((t) => {
      const timeDifference = new Date(t.time).getTime() - Date.now();
      if (t.status === "pending") {
        setTimeout(() => updateTaskStatus(t.id), timeDifference);
      }
    });
  }, [task, setTask]);

  const addTask = () => {
    const newTask = {
      id: generateId(5),
      task: currentTask,
      time: time,
      status: status,
    };
    setTask([...task, newTask]);
    setCurrentTask("");
    setStatus("pending");
    setTime(new Date().toISOString().slice(0, 16));
  };

  const displayTask = () => {
    let filteredTasks = task;
    if (filterStatus !== "all") {
      filteredTasks = task.filter((t) => t.status == filterStatus);
    }

    return filteredTasks
      .sort((t1, t2) => {
        return new Date(t1.time) - new Date(t2.time);
      })
      .map((t, i) => (
        <li
          key={i}
          className={
            t.status === "pending"
              ? "p-2 border-b border-slate-500 bg-cyan-100 text-cyan-700"
              : t.status === "overdue"
              ? "p-2 border-b border-slate-500 bg-rose-100 text-rose-700"
              : "p-2 border-b border-slate-500 bg-green-100 text-green-700 line-through"
          }
        >
          <input
            type="checkbox"
            name="task-status"
            id="task-status"
            checked={t.status === "finished"}
            onChange={(e) => {
              const updatedStatus = e.target.checked ? "finished" : "pending";
              setTask(
                task.map((item) =>
                  item.id === t.id ? { ...item, status: updatedStatus } : item
                )
              );
            }}
          />
          <p>
            {t.task}
            <br />
            <span>{moment(t.time).format("MM-DD-YYYY hh:mm A")}</span>
          </p>
        </li>
      ));
  };

  return (
    <>
      <div className="border-2 flex justify-center">
        <input
          type="text"
          placeholder="Task"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          className="m-5 rounded-md p-2 border border-black"
        />
        <input
          type="datetime-local"
          name="deadline"
          id="task-deadline"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="m-5 rounded-md p-2 border border-black"
        />
        <input
          type="button"
          value="Add task"
          onClick={addTask}
          className="border border-slate-500 h-10 m-5 w-20 rounded-3xl hover:bg-slate-500 hover:text-white"
        />
        <div />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setFilterStatus("all")}
          className="border border-slate-500 h-10 m-5 w-20 rounded-3xl hover:bg-slate-500 hover:text-white"
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className="border border-slate-500 h-10 m-5 w-20 rounded-3xl hover:bg-slate-500 hover:text-white"
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("finished")}
          className="border border-slate-500 h-10 m-5 w-20 rounded-3xl hover:bg-slate-500 hover:text-white"
        >
          Finished
        </button>
        <button
          onClick={() => setFilterStatus("overdue")}
          className="border border-slate-500 h-10 m-5 w-20 rounded-3xl hover:bg-slate-500 hover:text-white"
        >
          Overdue
        </button>
      </div>
      <div className=" flex justify-center m-5">
        <div className="flex justify-center w-2/5 border border-slate-500 rounded-lg shadow-md">
          <ul className="w-full">{displayTask()}</ul>
        </div>
      </div>
    </>
  );
};

export default AddTask;
