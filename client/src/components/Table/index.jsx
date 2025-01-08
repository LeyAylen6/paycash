import React from "react";
import styles from "./table.module.css";

const Table = ({ people, handleEdit, handleDelete }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Marital Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person) => (
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.lastname}</td>
                            <td>{person.gender}</td>
                            <td>{person.birthdate}</td>
                            <td>{person.email}</td>
                            <td>{person.phone}</td>
                            <td>{person.maritalStatus}</td>
                            <td className={styles.actions}>
                                <button
                                    className={`${styles.button} ${styles.edit}`}
                                    onClick={() => handleEdit(person.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.button} ${styles.delete}`}
                                    onClick={() => handleDelete(person.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;