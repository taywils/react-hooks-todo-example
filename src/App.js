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
    const data = localStorage.getItem("todos");
    if (data !== null) {
      setTodoItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  const createNewTodo = task => {
    if (!todoItems.find(item => item.action === task)) {
      setTodoItems([...todoItems, { action: task, done: false }]);
    }
  };

  const toggleTodo = todo =>
    setTodoItems(
      todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );

  const todoTableRows = doneValue =>
    todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} callback={toggleTodo} />
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
