import React, { useState, useEffect } from "react";
import TodoBanner from "./TodoBanner";
import TodoRow from "./TodoRow";
import TodoCreator from "./TodoCreator";
import VisibilityControl from "./VisibilityControl";

const App = () => {
  const [userName] = useState("Adam");
  const [showCompleted, setShowCompleted] = useState(true);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const localTodoItems = localStorage.getItem("todos");
    if (localTodoItems !== null) {
      setTodoItems(JSON.parse(localTodoItems));
    }
  }, []);

  useEffect(() => {
    const localShowCompleted = localStorage.getItem("showCompleted");
    if (localShowCompleted !== null) {
      setShowCompleted(JSON.parse(localShowCompleted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
  }, [showCompleted]);

  const createNewTodo = task => {
    if (task !== undefined && task !== null && task.trim().length > 0) {
      setTodoItems([
        ...todoItems,
        { tableId: btoa(`${task}|${Date.now()}`), action: task, done: false }
      ]);
    }
  };

  const deleteTodo = todo =>
    setTodoItems(todoItems.filter(item => item.tableId !== todo.tableId));

  const toggleTodo = todo =>
    setTodoItems(
      todoItems.map(item =>
        item.tableId === todo.tableId ? { ...item, done: !item.done } : item
      )
    );

  const todoTableRows = doneValue =>
    todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow
          key={item.action}
          item={item}
          onToggle={toggleTodo}
          onClick={deleteTodo}
        />
      ));

  const finishedTodoRows = () => todoTableRows(true);
  const incompleteTodoRows = () => todoTableRows(false);

  return (
    <React.Fragment>
      <TodoBanner name={userName} tasks={todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Remove?</th>
            </tr>
          </thead>
          <tbody>{incompleteTodoRows()}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={checked => setShowCompleted(checked)}
          />
        </div>

        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Remove?</th>
              </tr>
            </thead>
            <tbody>{finishedTodoRows()}</tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
