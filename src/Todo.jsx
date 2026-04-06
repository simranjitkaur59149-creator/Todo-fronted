import React from "react";
import "./App.css";

export default function Todo({ value, remove, update }) {
  // const createdDate = (date) => {
  //   return new Date(date).toLocaleDateString("en-IN", {
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  return (
    <>
      <div className="container">
        {/* <h6 style={{textAlign:"left"}}>{createdDate(value.createdAt)}</h6>  */}
        <h3>TASK:</h3>
        <p>{value.title}</p>
        <div className="button">
          <button className="edit-btn" onClick={() => update(value)}>
            Edit
          </button>{" "}
          <button className="remove-btn" onClick={() => remove(value._id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
