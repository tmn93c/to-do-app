import _ from "lodash";
import { Key } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useTrelloStore, { COMPLETED, PENDING } from "../store";
import Task from "./Task";

const TaskList = ({ tasks, onDeleteTask, status }: any) => {
  let reversedTasks = tasks;
  if (status === COMPLETED || status === PENDING) {
    reversedTasks = reversedTasks.filter(
      (item: { status: any }) => item.status === status
    );
  }

  const grid = tasks.length;

  const getListStyle = (isDraggingOver: boolean) => ({
    margin: `0 0 ${grid}px 0`,
    background: isDraggingOver ? "#2be2dd70" : "white",
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      background: isDragging ? "lightgreen" : "white",
      ...draggableStyle,
    };
  };

  const reorderItem = useTrelloStore((state) => state.reorderTask);
  const onDragEnd = (result: { source: any; destination: any }) => {
    if (!result.destination || !result.source) {
      return;
    }

    reorderItem(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <ul className=" ">
              {reversedTasks.map(
                (task: { id: Key | null | undefined }, index: number) => (
                  <Draggable
                    key={task.id}
                    draggableId={task?.id?.toString() ?? "Default Value"}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Task
                          key={task.id}
                          task={task}
                          onDeleteTask={onDeleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              )}
            </ul>
            {_.get(provided, "placeholder")}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
