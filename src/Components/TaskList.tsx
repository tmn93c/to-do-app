import Task from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { Key } from "react";
import _ from "lodash";
import useTrelloStore from "../store";

const TaskList = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleCompleted,
}: any) => {
  const reversedTasks = tasks.slice();
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
                          onEditTask={onEditTask}
                          onDeleteTask={onDeleteTask}
                          onToggleCompleted={onToggleCompleted}
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
