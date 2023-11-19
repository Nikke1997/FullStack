import React from "react";

// Component, which is used to show the persons in the phonebook.
const Persons = ({ filteredPersons, del }) => {
  return (
    <div>
      {filteredPersons.map((element) => (
        <li key={element.id}>
          {element.name} {element.number}
          <button onClick={() => del(element.id, element.name)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Persons;
