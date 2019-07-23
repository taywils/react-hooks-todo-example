import React from "react";

export default props => (
  <tr>
    <td>{props.item.action}</td>
    <td>
      <input
        type="checkbox"
        checked={props.item.done}
        onChange={() => props.onToggle(props.item)}
      />
    </td>
    <td>
      <button
        className="btn btn-sm btn-danger mt-1"
        onClick={() => props.onClick(props.item)}
      >
        Remove
      </button>
    </td>
  </tr>
);
