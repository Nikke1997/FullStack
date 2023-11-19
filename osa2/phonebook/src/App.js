import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/axios";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  // Configurate states
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [data, setData] = useState({
    name: "",
    number: "",
  });
  const [message, setMessage] = useState(null);
  const [message1, setMessage1] = useState(null);

  // Get data from server when page is loaded
  useEffect(() => {
    personService.getAll().then((personsObject) => {
      console.log(personsObject);
      setPersons(personsObject);
      setFilteredPersons(personsObject);
    });
  }, []);

  // Event handler, which adds a new person to the phonebook.
  const add = (event) => {
    event.preventDefault();
    const phoneNumber = data.number;
    // Check if the person is already in the phonebook
    const prev = persons.find(
      (n) => n.name.toLowerCase() === data.name.toLowerCase()
    );
    const changedPrev = { ...prev, number: phoneNumber };

    if (
      prev &&
      window.confirm(
        `${data.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      // Update the person's number
      personService
        .update(prev.id, changedPrev)
        .then((newPerson) => {
          // Update states according to the updated person
          setPersons(
            persons.map((person) =>
              person.id === newPerson.id ? newPerson : person
            )
          );
          setFilteredPersons(
            filteredPersons.map((person) =>
              person.id === newPerson.id ? newPerson : person
            )
          );
          setMessage1(`${newPerson.name} updated succesfully`);
          setTimeout(() => {
            setMessage1(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(`${data.name} has already been removed from server`);
          console.log("Error updating person:", error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      // Create a new person
      personService
        .create(data)
        .then((personsObject) => {
          // Update states according to the new person
          setPersons([...persons, personsObject]);
          setFilteredPersons([...filteredPersons, personsObject]);
          setMessage1(`${personsObject.name} added succesfully`);
          setTimeout(() => {
            setMessage1(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error creating person:", error);
        });

      // Reset the input fields
      setData({ name: "", number: "" });
    }
  };

  // Delete a person from the phonebook
  const del = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      personService
        .extract(id)
        .then((delPerson) => {
          // Update states according to the deleted person
          const updatedPersons = persons.filter((p) => p.id !== id);
          setPersons(updatedPersons);
          const updatedFilteredPersons = filteredPersons.filter(
            (p) => p.id !== id
          );
          setFilteredPersons(updatedFilteredPersons);
          setMessage(`${name} deleted succesfully`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person", error);
          setMessage(`${name} is already deleted from server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  // Event handler, which filters the persons according to the user's input on filrer field.
  const filt = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filtered = persons.filter((p) =>
      p.name.toLowerCase().includes(filterValue)
    );
    setFilteredPersons(filtered);
  };

  // Event handler, which updates the states according to the user's input on name and number field.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Return JSX code
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} message1={message1} />
      <Filter filt={filt} />
      <br />
      <h2>add a new</h2>
      <PersonForm add={add} handleInputChange={handleInputChange} data={data} />
      <h2>Numbers</h2>
      <ul>
        <Persons filteredPersons={filteredPersons} del={del} />
      </ul>
    </div>
  );
};

export default App;
