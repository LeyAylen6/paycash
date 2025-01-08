import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Form from './components/Form';
import { getAllPeople, deletePeople } from "./apiService";
import styles from './App.module.css';

const defaultForm = {
  name: '',
  lastname: '',
  gender: '',
  birthdate: '',
  email: '',
  phone: '',
  maritalStatus: ''
}

const App = () => {
  const [people, setPeople] = useState([]);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    getAllPeople()
      .then((data) => setPeople(data))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      updatePerson();
    } else {
      addPerson();
    }

    setForm(defaultForm);
  };

  const updatePerson = () => {
    setPeople(people.map((person) =>
      person.id === form.id ? { ...form } : person
    ));
  };

  const addPerson = () => {
    const newPerson = { ...form, id: Date.now() };
    setPeople([newPerson, ...people]);
  };

  const handleEdit = (id) => {
    const person = people.find((person) => person.id === id);
    setForm(person);
  };

  const handleDelete = (id) => {
    const person = people.find((person) => person.id === id);
    const peopleFiltered = people.filter((people) => people.id !== id);

    setPeople(peopleFiltered);
    deletePeople(person.id)
  };

  return (
    <div className={styles.container}>
      <h1>- People Catalog -</h1>

      <div className={styles.tableFormContainer}>
        <Table people={people} handleEdit={handleEdit} handleDelete={handleDelete} />
        <Form form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;