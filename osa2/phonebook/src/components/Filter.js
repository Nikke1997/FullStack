import React from "react";

// Filter component, which is used to filter the persons shown in the phonebook.
const Filter = ({ filt }) => {
  return (
    <div>
      filter shown with:
      <input type="text" onChange={filt} />
    </div>
  );
};

export default Filter;
