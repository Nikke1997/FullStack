import React from "react";

// Notification component, which is used to show notifications to the user based on their actions.
const Notification = ({ message, message1 }) => {
  if (message === null && message1 === null) {
    return null;
  } else if (message && message1 === null) {
    return <div className="error">{message}</div>;
  } else if (message1 && message === null) {
    return <div className="green">{message1}</div>;
  }
};

export default Notification;
