import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import _ from "lodash";

export const COMPLETED = "completed"
export const PENDING = "pending"

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string; 
};

export interface TrelloState {
  tasks: TaskItem[];
  darkMode: boolean;
  openModal: boolean
  openTask: TaskItem
}

export const emptyTask = {
  id: '',
  title: '',
  description: '',
  dueDate: '',
  status: ''
}
interface TrelloMutations {
  setDarkMode: (darkMode: boolean) => void;

  addTask: (title: string, content: string, dueDate: string) => void;
  editTask: (task: TaskItem) => void;
  deleteTask: (taskId: string) => void;
  reorderTask:(taskStartIndex: number, taskEndIndex: number) => void;

  getState: () => TrelloState;
  setState: (state: TrelloState) => void;
  changeOpenModal: (open: boolean) => void;
  changeOpenTask:(task: TaskItem) => void;
}

const useTrelloStore = create<TrelloState & TrelloMutations>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        openModal: false,
        openTask: emptyTask,
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,

        getState: get,
        setState: set,

        setDarkMode: (darkMode: boolean) => set({ darkMode }),

        addTask: (title: string, description: string, dueDate: string) => {
          const id = nanoid();
          set(({tasks} : TrelloState) => {

            return {
              tasks: [
                { ...{
                  id: id,
                  title: title,
                  description: description,
                  dueDate: dueDate,
                  status: ''
                } },
                ...tasks,
              ],
            };
          });
        },
        
        editTask: (task: TaskItem) => {

          set(({tasks} : TrelloState) => {
            const index = _.findIndex(tasks, { id: task.id });
            if (index !== -1) {
              tasks = _.assign([], tasks, { [index]: task });
            } else {
              console.log('Item not found in the list.');
            }

            return {
              tasks: [
                ...tasks
              ],
            };
          });
        },

        deleteTask: (id: string) => {
          set(({tasks} : TrelloState) => {
            return {
              tasks: tasks.filter((task: { id: any }) => task.id !== id)
            };
          });
        },

        reorderTask: (taskStartIndex: number, taskEndIndex: number) => {
          set(({tasks} : TrelloState) => {
            const element = tasks.splice(taskStartIndex, 1)[0];
            tasks.splice(taskEndIndex, 0, element);

            return {
              tasks: [...tasks]
            };
          });
        },

        changeOpenModal: (openModal: boolean) => {
          set({ openModal })
        },

        changeOpenTask: (openTask: TaskItem) => {
          set({ openTask })
        },
      }),
      { name: "trelloboard-state" }
    )
  )
);

export default useTrelloStore;
