import React from "react";

export default props => (
  <h4 className="bg-primary text-white text-center p-2">
    {props.name}'s To Do List ({props.tasks.filter(task => !task.done).length}{" "}
    items to do)
  </h4>
);
