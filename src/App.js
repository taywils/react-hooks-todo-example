import React, { useState } from "react";

const TitleBar = props => (
  <h4 className="bg-primary text-white text-center p-2">
    {props.title}'s To Do List ({props.subTitle})
  </h4>
);

const App = () => {
  const [userName] = useState("Adam");
  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: false },
    { action: "Call Joe", done: false }
  ]);
  const [newItemText, setNewItemText] = useState("");

  const updateNewTextValue = event => setNewItemText(event.target.value);

  const createNewTodo = () => {
    if (!todoItems.find(item => item.action === newItemText)) {
      setTodoItems([...todoItems, { action: newItemText, done: false }]);
      setNewItemText("");
    }
  };

  const remainingItems = () => todoItems.filter(item => !item.done).length;

  const toggleTodo = todo =>
    setTodoItems(
      todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );

  const todoTableRows = () =>
    todoItems.map(item => (
      <tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => toggleTodo(item)}
          />
        </td>
      </tr>
    ));

  return (
    <React.Fragment>
      <TitleBar title={userName} subTitle={`${remainingItems()} items to do`} />
      <div className="container-fluid">
        <div className="my-1">
          <input
            className="form-control"
            value={newItemText}
            onChange={updateNewTextValue}
          />
          <button className="btn btn-primary mt-1" onClick={createNewTodo}>
            Add
          </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{todoTableRows()}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default App;
