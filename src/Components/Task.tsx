import { Fragment, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import useTrelloStore, { COMPLETED, PENDING, TaskItem } from "../store";
import { Menu, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDone, MdPending } from "react-icons/md";

const Task = ({ task, onDeleteTask }: any) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const changeOpenModal = useTrelloStore((state) => state.changeOpenModal);
  const changeOpenTask = useTrelloStore((state) => state.changeOpenTask);
  const editTask = useTrelloStore((state) => state.editTask);
  const handleEdit = () => {
    setEditing(true);
    changeOpenModal(true);
    changeOpenTask(task);
  };

  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onDeleteTask(task.id);
  };

  const handleChangeStatus = (status: string) => {
    task.status = status;
    editTask(task);
  };

  let colorTextStatus = "";
  if (task.status === COMPLETED) {
    colorTextStatus = "text-green-500";
  }
  if (task.status === PENDING) {
    colorTextStatus = "text-red-500";
  }

  return (
    <li className=" mb-1 border-b border-gray-300 space-y-2">
      {
        <div className=" flex items-center justify-between p-4 px-3">
          <div className=" flex items-center space-x-3">
            <span className={`text-gray-500 text-lg`}>{task.title}</span>
          </div>
          <div className=" flex items-center space-x-3">
            <span className={`${colorTextStatus} text-gray-500 text-lg `}>
              {task.status}
            </span>
            <button onClick={handleEdit}>
              <CiEdit
                size={20}
                className=" text-gray-500 hover:text-yellow-500"
              />
            </button>
            <button onClick={handleDelete}>
              <AiOutlineDelete
                size={18}
                className=" text-gray-500 hover:text-red-500"
              />
            </button>
            <Menu as="div" className="flex relative text-left">
              <Menu.Button>
                <HiDotsVertical />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                  <Menu.Item>
                    <span
                      className="flex px-4 sm:px-6 items-center py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                      onClick={() => handleChangeStatus(COMPLETED)}
                    >
                      <span className="block text-neutral-400 mr-2">
                        <MdDone />
                      </span>
                      <span className="truncate block text-neutral-700 dark:text-neutral-200">
                        Mark a task as completed
                      </span>
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <span
                      className="flex px-4 sm:px-6 items-center py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                      onClick={() => handleChangeStatus(PENDING)}
                    >
                      <span className="block text-neutral-400 mr-2">
                        <MdPending />
                      </span>
                      <span className="truncate block text-neutral-700 dark:text-neutral-200">
                        Mark a task as pending
                      </span>
                    </span>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      }
    </li>
  );
};

export default Task;
