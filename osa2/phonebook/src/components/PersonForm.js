import React from "react";

//Component, which is used to add a new person to the phonebook.
const PersonForm = ({ add, handleInputChange, data }) => {
  return (
    <div>
      <form onSubmit={add}>
        <div>
          name:{" "}
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          number:{" "}
          <input
            type="text"
            name="number"
            value={data.number}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
