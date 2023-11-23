import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

export interface TrelloState {
  tasks: TaskItem[];
  darkMode: boolean;
}

interface TrelloMutations {
  setDarkMode: (darkMode: boolean) => void;

  addTask: (title: string, content: string, dueDate: string) => void;
  deleteTask: (taskId: string) => void;
  reorderTask:(taskStartIndex: number, taskEndIndex: number) => void;

  getState: () => TrelloState;
  setState: (state: TrelloState) => void;
}

const useTrelloStore = create<TrelloState & TrelloMutations>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,

        getState: get,
        setState: set,

        setDarkMode: (darkMode: boolean) => set({ darkMode }),

        addTask: (title: string, description: string, dueDate: string) => {
          const id = nanoid();
          set(({tasks} : TrelloState) => {

            return {
              tasks: [
                ...tasks,
                { ...{
                  id: id,
                  title: title,
                  description: description,
                  dueDate: dueDate,
                } }
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
        }
      }),
      { name: "trelloboard-state" }
    )
  )
);

export default useTrelloStore;
