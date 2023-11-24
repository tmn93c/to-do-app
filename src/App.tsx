import { useState } from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";
import "./App.css";
import AddTaskForm from "./Components/AddTaskForm";
import EditTaskForm from "./Components/EditTaskForm";
import TaskList from "./Components/TaskList";
import useTrelloStore from "./store";

function App() {
  let tasks = useTrelloStore((state) => state.tasks);
  const deleteTaskStore = useTrelloStore((state) => state.deleteTask);

  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const deleteTask = (id: any) => {
    deleteTaskStore(id);
  };

  const [status, setStatus] = useState("all");

  return (
    <div className="App">
      <div
        className={`hero ${
          darkTheme ? "bg-gray-900" : "bg-gray-100"
        } h-screen md:min-h-[700px]  w-full m-auto flex flex-col items-center mt-14 transition-all duration-500`}
      >
        <div
          className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          <div className=" w-full flex items-center justify-between">
            <h1 className=" uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
              My Tasks
            </h1>

            {darkTheme ? (
              <MdSunny
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            ) : (
              <MdDarkMode
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            )}
          </div>
          <div className="shadow-md">
            <AddTaskForm darkTheme={darkTheme} />
          </div>

          <div
            className={`scroll ${
              darkTheme ? "bg-gray-800" : "bg-white"
            } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
          >
            <div
              className={`w-full overflow-hidden mb- sticky top-0 z-10 ${
                darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-500"
              } flex items-center justify-between border-b`}
            >
              <p className=" text-gray-500 px-2 py-3">
                {tasks.length} tasks left{" "}
              </p>
              <ul className="flex text-sm font-medium sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li>
                  <div className="flex items-center ps-3">
                    <input
                      id="react-checkbox-list"
                      type="checkbox"
                      defaultValue=""
                      onChange={() => setStatus("all")}
                      checked={status === "all"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="py-3 ms-2 text-sm font-medium dark:text-white"
                    >
                      All
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ps-3">
                    <input
                      id="angular-checkbox-list"
                      type="checkbox"
                      defaultValue=""
                      checked={status === "completed"}
                      onChange={() => setStatus("completed")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="angular-checkbox-list"
                      className="py-3 ms-2 text-sm font-medium dark:text-gray-300"
                    >
                      Completed
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ps-3">
                    <input
                      id="laravel-checkbox-list"
                      type="checkbox"
                      defaultValue=""
                      checked={status === "pending"}
                      onChange={() => setStatus("pending")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="laravel-checkbox-list"
                      className="py-3 ms-2 text-sm font-medium dark:text-gray-300"
                    >
                      Pending
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            {tasks.length ? (
              <TaskList
                tasks={tasks}
                onDeleteTask={deleteTask}
                status={status}
              />
            ) : (
              <div className=" w-full h-[80%] flex items-center justify-center overflow-hidden">
                <p className=" text-gray-500 text-center z-10">Empty task</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditTaskForm />
    </div>
  );
}

export default App;
